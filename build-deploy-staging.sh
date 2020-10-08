#!/bin/bash -e

time (\
  cd ~/src/postcardmailerfe && \
  REACT_APP_API_HOST='https://postcardmailerapi.herokuapp.com' npm run build && \
  aws s3 sync --acl public-read --cache-control 'max-age=604800' --exclude index.html build/ s3://staging.postcardmailer.us/ && \
  aws s3 sync --acl public-read --cache-control 'no-cache' build/ s3://staging.postcardmailer.us/
)
