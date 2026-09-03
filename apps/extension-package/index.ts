import { incrementManifestVersion, zipFolder } from "./helpers";

const extensionFolder = `${import.meta.dir}/../../extension`;
const manifestFile = `${extensionFolder}/manifest.json`;

const shouldBumpVersion = !Bun.argv.includes("--no-bump");
const version = shouldBumpVersion
  ? await incrementManifestVersion(manifestFile)
  : String((await Bun.file(manifestFile).json()).version);

console.log(
  shouldBumpVersion
    ? `Bumped ${manifestFile} to version ${version}`
    : `Using version ${version} from ${manifestFile}`,
);

const extensionZipFile = `${import.meta.dir}/chief-os-${version}.zip`;
const zippedFileCount = await zipFolder(extensionFolder, extensionZipFile);

console.log(`Zipped ${zippedFileCount} files from ${extensionFolder} to ${extensionZipFile}`);
