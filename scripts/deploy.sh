#!/bin/bash

# Build script for SecureLogRedactor

# Create dist directory
mkdir -p dist

# Copy necessary files
cp src/index.html dist/
cp -r scripts dist/
cp -r styles dist/
cp -r public dist/

# Create or update CNAME file if you have a custom domain
# echo "your-domain.com" > dist/CNAME

echo "Build completed. Files are ready in the dist directory."
