import { Glob } from "bun";
import JSZip from "jszip";

export const REQUIRED_PACKAGE_FILES = [
  "manifest.json",
  "skills/chief-os-brief/SKILL.md",
  "skills/chief-os-brief/assets/briefing.html",
  "skills/chief-os-brief/scripts/inject-data.ts",
  "skills/chief-os-image-prompt/SKILL.md",
  "skills/chief-os-schedule/SKILL.md",
  "skills/chief-os-todo-complete/SKILL.md",
] as const;

export async function incrementManifestVersion(path: string): Promise<string> {
  const manifest = await Bun.file(path).json();

  const versionParts = String(manifest.version).split(".").map(Number);
  const lastIndex = versionParts.length - 1;
  const lastPart = versionParts[lastIndex];

  if (lastPart === undefined) {
    throw new Error(`Invalid version format: ${manifest.version}`);
  }

  versionParts[lastIndex] = lastPart + 1;
  manifest.version = versionParts.join(".");

  await Bun.write(path, `${JSON.stringify(manifest, null, 2)}\n`);

  return manifest.version;
}

export async function zipFolder(sourceFolder: string, destinationZipFile: string): Promise<number> {
  const zip = new JSZip();
  const glob = new Glob("**/*");
  const sourceFiles: string[] = [];
  let fileCount = 0;

  for await (const relativePath of glob.scan({ cwd: sourceFolder, dot: true, onlyFiles: true })) {
    const fileBytes = await Bun.file(`${sourceFolder}/${relativePath}`).bytes();
    const archivePath = relativePath.replaceAll("\\", "/");
    zip.file(archivePath, fileBytes);
    sourceFiles.push(archivePath);
    fileCount += 1;
  }

  const zipBytes = await zip.generateAsync({ type: "uint8array" });
  const generatedZip = await JSZip.loadAsync(zipBytes);
  const archiveFiles = Object.values(generatedZip.files)
    .filter((entry) => !entry.dir)
    .map((entry) => entry.name);
  const missingFiles = sourceFiles.filter((path) => !archiveFiles.includes(path));
  const unexpectedFiles = archiveFiles.filter((path) => !sourceFiles.includes(path));

  if (missingFiles.length > 0 || unexpectedFiles.length > 0) {
    throw new Error(
      `ZIP contents do not match ${sourceFolder}. Missing: ${missingFiles.join(", ") || "none"}. Unexpected: ${unexpectedFiles.join(", ") || "none"}.`,
    );
  }

  await Bun.write(destinationZipFile, zipBytes);

  return fileCount;
}

export async function assertZipContainsFiles(
  zipFile: string,
  requiredFiles: readonly string[],
): Promise<void> {
  const zip = await JSZip.loadAsync(await Bun.file(zipFile).bytes());
  const missingFiles = requiredFiles.filter((path) => !zip.file(path));

  if (missingFiles.length > 0) {
    throw new Error(`Extension package is missing required files: ${missingFiles.join(", ")}.`);
  }
}
