const htmlFile = "briefing.html";
const templateFile = new URL(`../assets/${htmlFile}`, import.meta.url);
const html = await Bun.file(templateFile).text();

const args = Bun.argv.slice(2);
const dataFlagIndex = args.indexOf("--data");

const dataArg = dataFlagIndex === -1 ? undefined : args[dataFlagIndex + 1];

async function readJsonContent(value: string | undefined): Promise<string | undefined> {
  if (!value) {
    return undefined;
  }

  if (value === "-") {
    return await Bun.stdin.text();
  }

  const trimmedValue = value.trimStart();

  if (trimmedValue.startsWith("{") || trimmedValue.startsWith("[")) {
    return value;
  }

  return await Bun.file(value).text();
}

const jsonContent = await readJsonContent(dataArg);

function getEmbeddableJsonContent(value: string | undefined): string {
  if (!value) {
    return "";
  }

  JSON.parse(value);

  return value.replaceAll("<", "\\u003c");
}

function writeJsonContentToTemplate(template: string, value: string | undefined): string {
  const scriptPattern =
    /(<script\b(?=[^>]*\bid=["']daily-briefing-data["'])(?=[^>]*\btype=["']application\/json["'])[^>]*>)([\s\S]*?)(<\/script>)/i;

  if (!scriptPattern.test(template)) {
    throw new Error("Missing daily-briefing-data script element.");
  }

  const embeddableJsonContent = getEmbeddableJsonContent(value);

  return template.replace(
    scriptPattern,
    (_match: string, openingTag: string, _currentContent: string, closingTag: string) => {
      return `${openingTag}\n${embeddableJsonContent}\n${closingTag}`;
    },
  );
}

const output = writeJsonContentToTemplate(html, jsonContent);
await Bun.write(htmlFile, output);
