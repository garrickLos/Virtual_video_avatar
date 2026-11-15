# Nexus Avatar release workflow

GitHub Actions builds the Tauri app for Windows, macOS, and Linux whenever a
tag matching `v*` is pushed. A normal push to `main` does not start a release
build. The legacy `Electron-app/` app is not built by this workflow.

## Publish a release

Merge the changes to `main`, then run the bump script from the repository root:

```bash
cd nexus-avatar
bash bump.sh patch
```

The script uses the Electron app's version as the starting point, increments it,
and synchronizes the resulting version in both apps' package manifests and in
the Tauri/Cargo manifests. It then commits those version changes, creates an
annotated `v*` tag, and pushes the commit and tag. The tag push triggers the
Tauri build and publishes the installers to its GitHub Release.

Windows prereleases use the NSIS installer only: MSI requires a numeric-only
prerelease version, while the shared Electron/Tauri version includes labels
such as `alpha` or `beta`. Stable releases continue to build the configured
Windows installers.

Supported bump commands:

| Command | Use |
|---|---|
| `bash bump.sh patch` | Bug fix / patch release |
| `bash bump.sh minor` | Backwards-compatible feature |
| `bash bump.sh major` | Breaking change |
| `bash bump.sh prerelease` | Increment an `alpha` prerelease |
| `bash bump.sh prerelease beta` | Increment a `beta` prerelease |

`bash bump.sh` defaults to `patch`. It only runs from the `main` branch. The
script creates annotated tags because `git push --follow-tags` pushes annotated
tags (not lightweight tags).

On Windows, run the script from Git Bash. GitHub Actions needs permission to
write repository contents/releases; the workflow requests `contents: write`.
