import { Glob } from "bun";
import JSZip from "jszip";

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
  let fileCount = 0;

  for await (const relativePath of glob.scan({ cwd: sourceFolder, dot: true, onlyFiles: true })) {
    const fileBytes = await Bun.file(`${sourceFolder}/${relativePath}`).bytes();
    zip.file(relativePath.replaceAll("\\", "/"), fileBytes);
    fileCount += 1;
  }

  const zipBytes = await zip.generateAsync({ type: "uint8array" });
  await Bun.write(destinationZipFile, zipBytes);

  return fileCount;
}
