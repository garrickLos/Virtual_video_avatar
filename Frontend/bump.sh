#!/bin/bash
set -e

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Error: you are on branch '$CURRENT_BRANCH', not 'main'. Merge to main first."
  exit 1
fi

BUMP_TYPE=${1:-patch}   # patch (default), minor, major, or prerelease

if [ "$BUMP_TYPE" == "prerelease" ]; then
  PREID=${2:-alpha}     # alpha (default), or beta, rc, etc.
  npm version prerelease --preid="$PREID" --no-git-tag-version
else
  npm version "$BUMP_TYPE" --no-git-tag-version
fi

VERSION=$(node -p "require('./package.json').version")
git add package.json package-lock.json
git commit -m "chore: bump version to $VERSION"
git tag -a "v$VERSION" -m "Release v$VERSION"
git push --follow-tags
echo "Pushed: v$VERSION"