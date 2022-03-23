#! /bin/bash

CONTAINER_VERSION_FILE="reverse_proxy_version"
DOCKER_FILE_FOLDER="."

IMAGE_NAME="reverse-proxy-nginx"
CONTAINER_NAME="reverse-proxy-nginx"

version=$(cat ${CONTAINER_VERSION_FILE})
CONTAINER_VERSION="0.${version}"
version=$((version+1))
echo ${version} > ${CONTAINER_VERSION_FILE}

# Install the https certificate
mkdir certs || true
cp /etc/letsencrypt/live/valentin.molina.pro/fullchain.pem certs/fullchain.pem
cp /etc/letsencrypt/live/valentin.molina.pro/privkey.pem certs/privkey.pem

# Build container
docker build -t ${IMAGE_NAME}:${CONTAINER_VERSION} ${DOCKER_FILE_FOLDER}

# Run container
docker stop ${CONTAINER_NAME}
docker container rm ${CONTAINER_NAME}
docker run -d -p 80:80 -p 443:443 -v /home/jenkins/Nappuccino-logs:/etc/nginx/logs -t --name ${CONTAINER_NAME} ${IMAGE_NAME}:${CONTAINER_VERSION}
