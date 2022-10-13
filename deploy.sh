#!/bin/bash

# Clear folder

rm -rf ~/.tagocore/Plugins/tcore-coap-gateway-plugin

# Copy plugin

cp -r ./dist ~/.tagocore/Plugins/tcore-coap-gateway-plugin/
