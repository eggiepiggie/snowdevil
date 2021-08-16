#!/bin/sh

export OXYGEN_DEPLOYMENT_TOKEN="$INPUT_OXYGEN_DEPLOYMENT_TOKEN"

# Read hostname from Hydrogen configuration file
export OXYGEN_STORE_DOMAIN=$(sed -n "s/.*storeDomain.*'\(.*\)'.*/\1/p" shopify.config.js)
if [ -z $OXYGEN_STORE_DOMAIN ]
then
  echo "OXYGEN_STORE_DOMAIN cannot be empty"
  exit 1
fi

oxygenctl --version
oxygenctl deploy \
  --assets-dir "$INPUT_OXYGEN_ASSETS_DIR" \
  --worker-file "$INPUT_OXYGEN_WORKER_FILE" \
  --dms-address "$INPUT_OXYGEN_DMS_ADDRESS" \
  --store-domain "test-preview.myshopify.com"

# Hardcoded URL for now
echo "::set-output name=url::https://"${GITHUB_SHA:0:12}"-test-preview.myshopify.dev"
