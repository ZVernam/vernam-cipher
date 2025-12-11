#!/usr/bin/env bash

npm run build:chrome

rm -rf build/chrome.zip
mkdir build
zip -jv build/chrome.zip chrome/dist/*
