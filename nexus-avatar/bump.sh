#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel)"
CURRENT_BRANCH="$(git -C "$REPO_ROOT" branch --show-current)"

if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Error: you are on branch '$CURRENT_BRANCH', not 'main'. Merge to main first." >&2
  exit 1
fi

BUMP_TYPE="${1:-patch}"
PREID="${2:-alpha}"
ELECTRON_DIR="$REPO_ROOT/Electron-app"

cd "$ELECTRON_DIR"
if [[ "$BUMP_TYPE" == "prerelease" ]]; then
  npm version prerelease --preid="$PREID" --no-git-tag-version
else
  npm version "$BUMP_TYPE" --no-git-tag-version
fi

VERSION="$(node -p "require('./package.json').version")"
cd "$REPO_ROOT"

node - "$REPO_ROOT" "$VERSION" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const [repoRoot, version] = process.argv.slice(2);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function writeJson(relativePath, value) {
  fs.writeFileSync(
    path.join(repoRoot, relativePath),
    `${JSON.stringify(value, null, 2)}\n`,
  );
}

const packageJson = readJson("nexus-avatar/package.json");
packageJson.version = version;
writeJson("nexus-avatar/package.json", packageJson);

const packageLock = readJson("nexus-avatar/package-lock.json");
packageLock.version = version;
packageLock.packages[""].version = version;
writeJson("nexus-avatar/package-lock.json", packageLock);

const tauriConfig = readJson("nexus-avatar/src-tauri/tauri.conf.json");
tauriConfig.version = version;
writeJson("nexus-avatar/src-tauri/tauri.conf.json", tauriConfig);

const cargoTomlPath = path.join(repoRoot, "nexus-avatar/src-tauri/Cargo.toml");
const cargoToml = fs.readFileSync(cargoTomlPath, "utf8");
const packageName = cargoToml.match(/^name\s*=\s*"([^"]+)"/m)?.[1];
if (!packageName) {
  throw new Error("Could not read the Tauri Cargo package name.");
}

const packageVersion = /^(\[package\][\s\S]*?^version\s*=\s*")[^"]+(")/m;
if (!packageVersion.test(cargoToml)) {
  throw new Error("Could not update the Tauri Cargo package version.");
}
fs.writeFileSync(
  cargoTomlPath,
  cargoToml.replace(packageVersion, (_, prefix, suffix) => `${prefix}${version}${suffix}`),
);

const cargoLockPath = path.join(repoRoot, "nexus-avatar/src-tauri/Cargo.lock");
const cargoLock = fs.readFileSync(cargoLockPath, "utf8");
const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lockPackageVersion = new RegExp(
  `(^\\[\\[package\\]\\]\\r?\\nname = "${escapedName}"\\r?\\nversion = ")[^"]+(")`,
  "m",
);
if (!lockPackageVersion.test(cargoLock)) {
  throw new Error(`Could not find ${packageName} in Cargo.lock.`);
}
fs.writeFileSync(
  cargoLockPath,
  cargoLock.replace(
    lockPackageVersion,
    (_, prefix, suffix) => `${prefix}${version}${suffix}`,
  ),
);
NODE

if git -C "$REPO_ROOT" show-ref --verify --quiet "refs/tags/v$VERSION"; then
  echo "Error: tag v$VERSION already exists." >&2
  exit 1
fi

git -C "$REPO_ROOT" add -- \
  Electron-app/package.json \
  Electron-app/package-lock.json \
  nexus-avatar/package.json \
  nexus-avatar/package-lock.json \
  nexus-avatar/src-tauri/Cargo.toml \
  nexus-avatar/src-tauri/Cargo.lock \
  nexus-avatar/src-tauri/tauri.conf.json
git -C "$REPO_ROOT" commit -m "chore: bump version to $VERSION" -- \
  Electron-app/package.json \
  Electron-app/package-lock.json \
  nexus-avatar/package.json \
  nexus-avatar/package-lock.json \
  nexus-avatar/src-tauri/Cargo.toml \
  nexus-avatar/src-tauri/Cargo.lock \
  nexus-avatar/src-tauri/tauri.conf.json
git -C "$REPO_ROOT" tag -a "v$VERSION" -m "Release v$VERSION"
git -C "$REPO_ROOT" push --follow-tags

echo "Pushed: v$VERSION"
