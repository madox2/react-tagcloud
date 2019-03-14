#!/bin/bash
set -e

git checkout master

cd examples
npm run build
cd -

git checkout gh-pages

rm -rf static
cp -r examples/build/static .
cp examples/build/index.html .

echo DONE
