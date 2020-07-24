#!/bin/bash -e

time (\
	cd ~/src/postcardmailerfe && \
	npm run build && \
	aws s3 sync --cache-control 'max-age=604800' --exclude index.html build/ s3://postcardmailerfe/ && \
  aws s3 sync --cache-control 'no-cache' build/ s3://postcardmailerfe/
)
