#!/bin/sh

export OXYGEN_DEPLOYMENT_TOKEN="$INPUT_OXYGEN_DEPLOYMENT_TOKEN"
export COMMIT_SHA="$INPUT_SHA"

# Read hostname from Hydrogen configuration file
export STORE_HOSTNAME=$(sed -n "s/.*storeDomain.*'\(.*\)'.*/\1/p" shopify.config.js)

oxygenctl --version
oxygenctl deploy \
  --assets-dir "$INPUT_OXYGEN_ASSETS_DIR" \
  --worker-file "$INPUT_OXYGEN_WORKER_FILE" \
  --dms-address "$INPUT_OXYGEN_DMS_ADDRESS"

# Hardcoded URL for now
echo "::set-output name=url::https://"${GITHUB_SHA:0:12}"-oxygen-sws.myshopify.dev"
