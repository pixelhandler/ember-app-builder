#!/bin/bash

CLIENT_DIR="$(dirname `pwd`)/client"
VENDOR_DIR=$CLIENT_DIR"/vendor"
BOWER_DIR=$CLIENT_DIR"/bower_components"

function copy_vendor_file() {
  # $1 - filename, $2 - src directory, $3 - vendor directory
  SRC_FILE=$2"/"$1
  DEST_FILE=$3"/"$1
  echo "Try to remove... "$DEST_FILE
  if [ -e $DEST_FILE ]; then
    rm $DEST_FILE
    echo "Removed... "$DEST_FILE
  fi
  echo "Try to copy... "$SRC_FILE
  cp $SRC_FILE $DEST_FILE
  echo "Copied to..."
  find $3 -name "*"$1 -type f | xargs echo
}

JQUERY_FILE="jquery.js"
JQUERY_DIR=$BOWER_DIR"/jquery"

copy_vendor_file $JQUERY_FILE $JQUERY_DIR $VENDOR_DIR

HANDLEBARS_FILE="handlebars.js"
HANDLEBARS_DIR=$BOWER_DIR"/handlebars"

copy_vendor_file $HANDLEBARS_FILE $HANDLEBARS_DIR $VENDOR_DIR

EMBER_FILE="ember.js"
EMBER_DIR=$BOWER_DIR"/ember"

copy_vendor_file $EMBER_FILE $EMBER_DIR $VENDOR_DIR

EMBER_DATA_FILE="ember-data.js"
EMBER_DATA_DIR=$BOWER_DIR"/ember-data"

copy_vendor_file $EMBER_DATA_FILE $EMBER_DATA_DIR $VENDOR_DIR

SHOWDOWN_FILE="showdown.js"
SHOWDOWN_DIR=$BOWER_DIR"/compressed"

copy_vendor_file $SHOWDOWN_FILE $SHOWDOWN_DIR $VENDOR_DIR

MOMENT_FILE="moment.js"
MOMENT_DIR=$BOWER_DIR"momentjs/min"

copy_vendor_file $MOMENT_FILE $MOMENT_DIR $VENDOR_DIR


unset copy_vendor_file
