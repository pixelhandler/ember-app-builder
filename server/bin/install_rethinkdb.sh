#!/bin/bash

echo "Install rethinkdb..."

if hash brew 2>/dev/null; then
  echo "brew installed, install rethinkdb"
  brew update && brew install rethinkdb
else
  echo "brew required, but not installed, aborting."
fi
