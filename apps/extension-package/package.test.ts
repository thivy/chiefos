import { expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

import { assertZipContainsFiles, REQUIRED_PACKAGE_FILES, zipFolder } from "./helpers";

const injectorFile = fileURLToPath(
  new URL("../../extension/skills/chief-os-brief/scripts/inject-data.ts", import.meta.url),
);
const extensionFolder = fileURLToPath(new URL("../../extension", import.meta.url));

interface TodoFixture {
  status: "Active" | "Completed";
  source: "email" | "chat" | "calendar" | "meeting" | "manual";
  title: string;
  summary: string;
  recommendedAction: string;
  sourceContext: string | null;
  owner: string | null;
  deadline: string | null;
  url: string;
}

interface BriefingFixture {
  date: string;
  greeting: string;
  person_name: string;
  summary: string;
  emails: unknown[];
  calendar: unknown[];
  chats: unknown[];
  recaps: unknown[];
  todo: { items: TodoFixture[] };
}

function createBriefing(): BriefingFixture {
  return {
    date: "Aug 20, Thu",
    greeting: "Good morning",
    person_name: "Test User",
    summary: "A focused test briefing.",
    emails: [],
    calendar: [],
    chats: [],
    recaps: [],
    todo: { items: [] },
  };
}

async function runInjector(workingDirectory: string, data?: unknown) {
  const command = [process.execPath, injectorFile];

  if (data !== undefined) {
    command.push("--data", JSON.stringify(data));
  }

  const child = Bun.spawn(command, {
    cwd: workingDirectory,
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);

  return { exitCode, stdout, stderr };
}

async function createTemporaryDirectory() {
  return await mkdtemp(`${tmpdir()}/chiefos-package-test-`);
}

function readEmbeddedData(html: string): unknown {
  const match = html.match(
    /<script\b(?=[^>]*\bid=["']daily-briefing-data["'])(?=[^>]*\btype=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/i,
  );

  if (!match?.[1]) {
    throw new Error("Generated HTML is missing the daily-briefing-data block.");
  }

  return JSON.parse(match[1]);
}

test("injector round-trips a valid briefing", async () => {
  const workingDirectory = await createTemporaryDirectory();

  try {
    const briefing = createBriefing();
    const result = await runInjector(workingDirectory, briefing);
    const outputFile = `${workingDirectory}/briefing.html`;

    expect(result.exitCode).toBe(0);
    expect(await Bun.file(outputFile).exists()).toBe(true);
    expect(readEmbeddedData(await Bun.file(outputFile).text())).toEqual(briefing);
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});

test("injector rejects missing and incomplete data without writing output", async () => {
  for (const data of [undefined, {}]) {
    const workingDirectory = await createTemporaryDirectory();

    try {
      const result = await runInjector(workingDirectory, data);

      expect(result.exitCode).not.toBe(0);
      expect(await Bun.file(`${workingDirectory}/briefing.html`).exists()).toBe(false);
    } finally {
      await rm(workingDirectory, { recursive: true, force: true });
    }
  }
});

test("injector rejects a relative todo URL", async () => {
  const workingDirectory = await createTemporaryDirectory();

  try {
    const briefing = createBriefing();
    briefing.todo.items.push({
      status: "Active",
      source: "email",
      title: "Review the proposal",
      summary: "The proposal is ready for review.",
      recommendedAction: "Review and reply today.",
      sourceContext: "Important",
      owner: null,
      deadline: null,
      url: "/mail/item/123",
    });
    const result = await runInjector(workingDirectory, briefing);

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain("must be an absolute URL");
    expect(await Bun.file(`${workingDirectory}/briefing.html`).exists()).toBe(false);
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});

test("injector escapes closing script content", async () => {
  const workingDirectory = await createTemporaryDirectory();

  try {
    const briefing = createBriefing();
    briefing.summary = "Review </script><script>alert('test')</script> safely.";
    const result = await runInjector(workingDirectory, briefing);
    const html = await Bun.file(`${workingDirectory}/briefing.html`).text();
    const dataBlock = html.match(
      /<script\b(?=[^>]*\bid=["']daily-briefing-data["'])[^>]*>([\s\S]*?)<\/script>/i,
    )?.[1];

    expect(result.exitCode).toBe(0);
    expect(dataBlock).toContain("\\u003c/script>");
    expect(dataBlock).not.toContain("</script><script>");
    expect(readEmbeddedData(html)).toEqual(briefing);
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});

test("extension archive contains every source file and required runtime file", async () => {
  const workingDirectory = await createTemporaryDirectory();

  try {
    const zipFile = `${workingDirectory}/chief-os-test.zip`;
    const fileCount = await zipFolder(extensionFolder, zipFile);

    expect(fileCount).toBeGreaterThan(REQUIRED_PACKAGE_FILES.length);
    await expect(assertZipContainsFiles(zipFile, REQUIRED_PACKAGE_FILES)).resolves.toBeUndefined();
  } finally {
    await rm(workingDirectory, { recursive: true, force: true });
  }
});