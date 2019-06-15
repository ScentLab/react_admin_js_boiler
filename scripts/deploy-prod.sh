#!/bin/bash
IMAGE_NAME=$1
AWS_PROFILE=$2
REGISTRY_URL=578353358260.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:latest
HOST=ubuntu@admin-dev.campusplanet.link
PEM_FILE=~/.ssh/campus.pem
APP_PATH=/home/ubuntu/${IMAGE_NAME}

set -e

function printUsage() {
    echo "Usage: deploy.sh {imageName} {profileName}"
    echo ""
}

function errorCheck() {
    if [[ $? -ne 0 ]]; then
    exit 1
fi
}

cd  client
npm run build-production
errorCheck
cd ..

if [[ -z ${IMAGE_NAME} ]]; then
  printUsage
  exit 1
elif [[ -z ${AWS_PROFILE} ]]; then
  printUsage
  exit 1
fi

docker build -t ${IMAGE_NAME} .
errorCheck

docker tag ${IMAGE_NAME}:latest ${REGISTRY_URL}
errorCheck

ECR_LOGIN=$(aws ecr get-login --no-include-email --region ap-northeast-2 --profile ${AWS_PROFILE})
eval ${ECR_LOGIN}

docker push ${REGISTRY_URL}
errorCheck

ssh ${HOST} -i ${PEM_FILE} "sudo "${ECR_LOGIN}" && sudo docker pull "${REGISTRY_URL}""
errorCheck

ssh ${HOST} -i ${PEM_FILE} "sudo mkdir -p ${APP_PATH}"
errorCheck

scp -i ${PEM_FILE} -d ./docker-compose-production.yml ${HOST}:${APP_PATH}
errorCheck

ssh ${HOST} -i ${PEM_FILE} "sudo docker-compose -f "${APP_PATH}"/docker-compose-production.yml -p ${IMAGE_NAME} up -d --remove-orphans"
errorCheck

ssh ${HOST} -i ${PEM_FILE} "sudo docker image prune -f"
docker image prune -f

echo "Deploy Success!"

