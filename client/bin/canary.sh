#!/bin/bash

CLIENT_DIR="$(dirname `pwd`)/client"

function update_file_via_curl() {
  # $1 - filename, $2 - url, $3 - directory

  echo "Try to remove "$1
  if [ -e $1 ]; then
    rm $1
    echo "Removed "$1
  fi
  echo "Download "$2" to "$1
  curl -o $1 $2

  echo "Downloaded... "
  find $3 -name '*canary*' -type f | xargs echo
}

EMBER_DIR=$CLIENT_DIR"/vendor"
EMBER_CANARY=$EMBER_DIR"/ember-canary.js"
EMBER_CANARY_URL="http://builds.emberjs.com/canary/ember.js"

update_file_via_curl $EMBER_CANARY $EMBER_CANARY_URL $EMBER_DIR

EMBER_DATA_DIR=$CLIENT_DIR"/vendor"
EMBER_DATA_CANARY=$EMBER_DATA_DIR"/ember-data-canary.js"
EMBER_DATA_CANARY_URL="http://builds.emberjs.com/canary/ember-data.js"

update_file_via_curl $EMBER_DATA_CANARY $EMBER_DATA_CANARY_URL $EMBER_DATA_DIR

echo "Removing ember.js and ember-data.js from vendor dir"
rm $EMBER_DATA_DIR/ember-data.js $EMBER_DIR/ember.js

unset update_file_via_curl
