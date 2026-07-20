# Release Workflow Guide

This document explains how releases and automatic `.exe` builds work for this Electron project, and the exact steps to follow every time you want to publish a new version.

## How it works (overview)

1. GitHub Actions builds the Electron app automatically whenever a **git tag** matching `v*` is pushed (e.g. `v1.2.3`).
2. `electron-builder` packages the app and uploads the resulting installers (`.exe`, `.dmg`, `.AppImage`) directly to the GitHub Release that matches the tag.
3. Pushing commits or merging branches **does not** trigger a build by itself — only pushing a tag does. This means you can commit and merge freely without accidentally spamming releases.

---

## One-time setup (already done, kept here for reference)

### `package.json` requirements

```json
"scripts": {
  "build": "electron-builder --publish always"
},
"build": {
  "appId": "com.yourname.yourapp",
  "productName": "Your App Name",
  "files": ["**/*", "!**/node_modules/*/{CHANGELOG.md,README.md,readme.md,readme}", "!**/*.map"],
  "publish": {
    "provider": "github",
    "owner": "your-github-username",
    "repo": "your-repo-name"
  },
  "win": { "target": "nsis" },
  "mac": { "target": "dmg" },
  "linux": { "target": "AppImage" }
}
```

### `.github/workflows/build.yml`

```yaml
name: Build & Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        working-directory: Frontend
        run: npm install

      - name: Build Electron app
        working-directory: Frontend
        run: npx electron-builder --publish always
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### GitHub repository settings

- Go to **Settings → Actions → General → Workflow permissions**
- Enable **"Read and write permissions"** — without this, the workflow cannot upload release assets.

### npm git path (Windows / Git Bash specific fix)

npm's automatic git-tagging can silently fail on Windows with Git Bash, printing `Not tagging: not in a git repo or no git cmd`. Fix by explicitly setting npm's git path using **forward slashes** (not backslashes):

```bash
npm config set git "D:/Git/cmd/git.exe"
```

Find your correct path with:
```bash
where.exe git
```

Because this fix is unreliable across machines, we avoid depending on `npm version`'s automatic tagging entirely — see the `bump.sh` script below.

---

## The `bump.sh` script

This script bumps the version number, commits, tags, and pushes — all in one step, without relying on npm's buggy git integration.

`Frontend/bump.sh`:

```bash
#!/bin/bash
set -e

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Error: you are on branch '$CURRENT_BRANCH', not 'main'. Merge to main first."
  exit 1
fi

BUMP_TYPE=${1:-patch}   # defaults to patch if no argument is given

npm version "$BUMP_TYPE" --no-git-tag-version
VERSION=$(node -p "require('./package.json').version")
git add package.json package-lock.json
git commit -m "chore: bump version to $VERSION"
git tag -a "v$VERSION" -m "Release v$VERSION"
git push --follow-tags
echo "Pushed: v$VERSION"
```

**Important:** the tag must be created with `git tag -a` (annotated tag), not `git tag` (lightweight tag). `git push --follow-tags` silently ignores lightweight tags, which was the root cause of releases not appearing.

---

## Day-to-day workflow

### 1. Work on a feature branch (optional but recommended)

Working on a branch means you can commit and push freely without triggering any build — only tag pushes trigger builds.

```bash
git checkout -b feature/my-new-feature
git add .
git commit -m "describe your change"
git push origin feature/my-new-feature
```

Repeat as needed while developing.

### 2. Merge into `main` when the feature is ready

```bash
git checkout main
git pull
git merge feature/my-new-feature
git push
```

### 3. Publish a new release

Decide what kind of change this is:

| Command | Example | When to use |
|---|---|---|
| `bash bump.sh` or `bash bump.sh patch` | `1.0.0` → `1.0.1` | Bug fix, small change |
| `bash bump.sh minor` | `1.0.0` → `1.1.0` | New feature, backwards compatible |
| `bash bump.sh major` | `1.0.0` → `2.0.0` | Breaking change |

Run it from the `Frontend` folder:

```bash
cd Frontend
bash bump.sh minor
```

This automatically:
- Bumps the version in `package.json` / `package-lock.json`
- Commits the change
- Creates an annotated git tag (e.g. `v1.1.0`)
- Pushes the commit and tag to GitHub

### 4. Verify the release

- Go to your repo's **Actions** tab on GitHub and confirm the workflow run succeeds (it builds on Windows, macOS, and Linux — this takes a few minutes).
- Go to **Releases** and confirm the new version has the `.exe`, `.dmg`, and `.AppImage` files attached.

---

## Common pitfalls & fixes

| Problem | Cause | Fix |
|---|---|---|
| Release has no `.exe`, only source code | You only made a GitHub Release manually, no build ran | Use tag-based releases via `bump.sh`, not manual "Draft a release" |
| `npm version patch` gives "Invalid version" | `package.json` has an invalid semver string (e.g. `0.0.01` with a leading zero) | Use valid semver, e.g. `0.0.1` |
| `npm version patch` says "Not tagging: not in a git repo or no git cmd" | npm can't find `git.exe` on Windows | Use `bump.sh`, which bypasses npm's git tagging entirely |
| Tag exists locally but not on GitHub | Tag was a lightweight tag; `--follow-tags` doesn't push those | Always create tags with `git tag -a`, or push explicitly: `git push origin <tag>` |
| `git add .` shows `LF will be replaced by CRLF` warning | Windows/Unix line-ending difference | Harmless — can be fixed permanently with a `.gitattributes` file (`* text=auto eol=lf`) |
| Workflow builds every small commit | Workflow was triggered on every push instead of tags | Confirm `on: push: tags: ['v*']` in `build.yml`, not `on: push: branches: [main]` |

---

## Removing a tracked file (e.g. local settings files)

If a file like `character_settings.json` shouldn't be tracked anymore:

```bash
git rm character_settings.json
echo "character_settings.json" >> .gitignore
git add .gitignore
git commit -m "remove character_settings.json and ignore it going forward"
git push
```

This only removes it from future commits — it will still exist in old commit history. If the file contained sensitive data (passwords, API keys), a full history rewrite (`git filter-repo` or BFG Repo-Cleaner) is required instead — a separate, more involved procedure.
