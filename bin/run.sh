#!/bin/bash

export PATH=/usr/local/bin:/bin:/usr/bin
export NODE_PATH=/usr/local/lib/node_modules

pm2 flush
pm2 start app.js -i max -n tServer
pm2 logs tServer
