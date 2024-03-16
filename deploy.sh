#!/bin/bash

npm run build

cp manifest.json dist/

rsync -aWv --delete dist/ server:/var/www/nboughton.uk/public/apps/obr-dragonbane-initiative/
