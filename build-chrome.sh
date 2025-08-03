#!/usr/bin/env bash

npm run build -- --chrome

rm -rf build/plugin/chrome.zip
zip -jv build/plugin/chrome.zip build/plugin/chrome/*
