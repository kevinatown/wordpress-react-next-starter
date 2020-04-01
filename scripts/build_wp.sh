#!/bin/sh

# zip theme
cd ./src/setup/
zip -ru ./mod_twentytwenty.zip ./mod_twentytwenty
cd ../../

eval $(aws ecr get-login --no-include-email --region us-east-1)

docker build --no-cache -t wordpress ./src/
docker tag wordpress:latest 946347618863.dkr.ecr.us-east-1.amazonaws.com/wordpress:latest
docker push 946347618863.dkr.ecr.us-east-1.amazonaws.com/wordpress:latest