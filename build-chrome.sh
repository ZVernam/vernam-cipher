#!/usr/bin/env bash

npm run build -- --chrome

rm -rf zvernam.zip
zip -jv zvernam.zip build/plugin/chrome/*
