#!/bin/sh

export OXYGEN_DEPLOYMENT_TOKEN="$INPUT_OXYGEN_DEPLOYMENT_TOKEN"
export COMMIT_SHA="$INPUT_SHA"

oxygenctl --version
oxygenctl deploy \
  --assets-dir "$INPUT_OXYGEN_ASSETS_DIR" \
  --worker-file "$INPUT_OXYGEN_WORKER_FILE" \
  --dms-address "$INPUT_OXYGEN_DMS_ADDRESS"

echo $STORE_HOSTNAME

# Hardcoded URL for now
echo "::set-output name=url::https://"${COMMIT_SHA:0:12}"-"$INPUT_HOSTNAME".myshopify.dev"
