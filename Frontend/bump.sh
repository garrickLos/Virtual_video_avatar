#!/bin/bash
set -e
npm version patch --no-git-tag-version
VERSION=$(node -p "require('./package.json').version")
git add package.json package-lock.json
git commit -m "chore: bump version to $VERSION"
git tag "v$VERSION"
git push --follow-tags
echo "Gepusht: v$VERSION"