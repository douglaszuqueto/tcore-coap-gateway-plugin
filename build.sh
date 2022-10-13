#!/bin/bash

# Clear dist folder

rm -rf dist/*

# Build files

yarn esbuild --bundle --platform=node ./src/index.js --outfile=./dist/build/index.js

# Copy Files

mkdir dist/build/bin

cp README.md dist/
cp package.json dist/
cp ./tmp/coap dist/build/bin/
cp -r assets dist/
