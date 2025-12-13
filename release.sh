#!/usr/bin/env sh
set -eu

DRY_RUN=0
VERSION=""

while getopts "n" opt; do
  case $opt in
    n) DRY_RUN=1 ;;
  esac
done

shift $((OPTIND-1))
VERSION="${1:-}"

if [ -z "$VERSION" ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 0.6.5"
  exit 1
fi

# Basic semver-ish validation: X.Y.Z with optional -prerelease / +build
echo "$VERSION" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+([.-][0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$' || {
  echo "Error: version must look like semver (e.g. 1.2.3, 1.2.3-rc.1)"
  exit 1
}

# Require clean working tree
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: working tree not clean. Commit/stash your changes first."
  exit 1
fi

# Ensure required files exist
[ -f package.json ] || { echo "Error: package.json not found"; exit 1; }
[ -f Dockerfile ] || { echo "Error: Dockerfile not found"; exit 1; }

TAG="v$VERSION"

# Prevent retagging
if git rev-parse -q --verify "refs/tags/$TAG" >/dev/null 2>&1; then
  echo "Error: tag $TAG already exists"
  exit 1
fi

echo "Bumping version to $VERSION"

# 1) package.json version (no git tag/commit from npm; we manage git ourselves)
if [ $DRY_RUN -eq 1 ]; then
  echo "[DRY RUN] Would update package.json version to $VERSION"
else
  npm version "$VERSION" --no-git-tag-version
fi

# 2) Dockerfile ARG VERSION="..."
# Replace first matching ARG VERSION="..." with ARG VERSION=<version>.
# (Works on GNU sed and BSD sed via backup file, then remove it.)
if [ $DRY_RUN -eq 1 ]; then
  echo "[DRY RUN] Would update Dockerfile version to $VERSION"
else
  sed -i.bak 's/^ARG VERSION=.*/ARG VERSION=$VERSION/' Dockerfile
fi

# 3) commit + tag + push
if [ $DRY_RUN -eq 1 ]; then
  echo "[DRY RUN] Would commit changes and create tag $TAG"
  echo "[DRY RUN] Would push to origin"
else
  git add package.json package-lock.json Dockerfile
  git commit -m "chore(release): $VERSION"
  git tag -a "$TAG" -m "Release $VERSION"

  # Push current branch and tags to origin
  CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  git push origin "$CURRENT_BRANCH"
  git push origin "$TAG"
  echo "Done: pushed $CURRENT_BRANCH and tag $TAG"
fi
