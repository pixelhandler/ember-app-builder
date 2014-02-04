#!/bin/bash

CLIENT_DIR="$(dirname `pwd`)/client"
BOWER_DIR=$CLIENT_DIR"/bower_components"
VENDOR_DIR=$CLIENT_DIR"/vendor"
DEV_DIR=$VENDOR_DIR"/development"
PROD_DIR=$VENDOR_DIR"/production"

rm -fr $DEV_DIR/*canary*

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

src=$BOWER_DIR"/jquery"
copy_vendor_file jquery.js $src $DEV_DIR
copy_vendor_file jquery.min.js $src $PROD_DIR

src=$BOWER_DIR"/handlebars"
copy_vendor_file handlebars.js $src $DEV_DIR
copy_vendor_file handlebars.min.js $src $PROD_DIR

src=$BOWER_DIR"/ember"
copy_vendor_file ember.js $src $DEV_DIR
copy_vendor_file ember.prod.js $src $PROD_DIR

src=$BOWER_DIR"/ember-data"
copy_vendor_file ember-data.js $src $DEV_DIR
copy_vendor_file ember-data.prod.js $src $PROD_DIR

src=$BOWER_DIR"/showdown"
copy_vendor_file showdown.js $src"/src" $DEV_DIR
copy_vendor_file showdown.js $src"/compressed" $PROD_DIR

src=$BOWER_DIR"/momentjs"
copy_vendor_file moment.js $src $DEV_DIR
copy_vendor_file moment.min.js $src"/min" $PROD_DIR

unset CLIENT_DIR
unset VENDOR_DIR
unset BOWER_DIR
unset DEV_DIR
unset PROD_DIR
unset src
unset copy_vendor_file
