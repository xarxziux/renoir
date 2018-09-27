#!/bin/bash

# Stop on error
set -e

# Bump the minor version number
npm version minor

# Read the new version number back from package.json
tag_name=r"$(grep \"version\": package.json | \
        grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"

# Tag and publish
npm publish
git push github "${tag_name}"
