#!/bin/bash

# Script to remove build artifacts from src directories in packages

find packages -type f \( -name '*.js' -o -name '*.js.map' -o -name '*.d.ts' -o -name '*.d.ts.map' \) -path '*/src/*' -delete

echo "Build artifacts removed from src directories."