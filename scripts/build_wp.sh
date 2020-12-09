#!/bin/sh

# zip theme
cd ./src/setup/
zip -r ./mod_twentytwenty.zip ./mod_twentytwenty
cd ../../

eval $(aws ecr get-login --no-include-email --region <region>)

docker build --no-cache -t <WPServiceRepository> ./src/
# change the <account-id> to your account id
docker tag <WPServiceRepository> <WPServiceRepositoryUrl>
docker push <WPServiceRepositoryUrl>