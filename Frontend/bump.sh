#!/bin/bash
set -e

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Fout: je staat op branch '$CURRENT_BRANCH', niet op 'main'. Merge eerst naar main."
  exit 1
fi

npm version patch --no-git-tag-version
VERSION=$(node -p "require('./package.json').version")
git add package.json package-lock.json
git commit -m "chore: bump version to $VERSION"
git tag -a "v$VERSION" -m "Release v$VERSION"
git push --follow-tags
echo "Gepusht: v$VERSION"