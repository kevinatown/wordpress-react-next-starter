#!/bin/sh

# zip theme
cd ./src/setup/
zip -r ./mod_twentytwenty.zip ./mod_twentytwenty
cd ../../

eval $(aws ecr get-login --no-include-email --region us-east-1)

docker build --no-cache -t headless-wordpress ./src/
# change the <account-id> to your account id
docker tag headless-wordpress:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/headless-wordpress
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/headless-wordpress:latest