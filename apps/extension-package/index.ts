import {
    assertZipContainsFiles,
    incrementManifestVersion,
    REQUIRED_PACKAGE_FILES,
    zipFolder,
} from "./helpers";

const briefingFile = "briefing.html";
const artifactsAppFolder = `${import.meta.dir}/../artifacts`;
const sourceBriefingFile = `${artifactsAppFolder}/dist/${briefingFile}`;
const extensionFolder = `${import.meta.dir}/../../extension`;
const destinationBriefingFile = `${extensionFolder}/skills/chief-os-brief/assets/${briefingFile}`;
const manifestFile = `${extensionFolder}/manifest.json`;

console.log("Building single-file briefing artifact...");

const build = Bun.spawn(["bun", "build:singlefile"], {
  cwd: artifactsAppFolder,
  stdout: "inherit",
  stderr: "inherit",
});

const buildExitCode = await build.exited;

if (buildExitCode !== 0) {
  throw new Error(`bun build:singlefile failed with exit code ${buildExitCode}`);
}

await Bun.write(destinationBriefingFile, Bun.file(sourceBriefingFile));

console.log(`Copied ${sourceBriefingFile} to ${destinationBriefingFile}`);

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
await assertZipContainsFiles(extensionZipFile, REQUIRED_PACKAGE_FILES);

console.log(`Zipped ${zippedFileCount} files from ${extensionFolder} to ${extensionZipFile}`);
console.log(`Verified ${REQUIRED_PACKAGE_FILES.length} required package files`);
