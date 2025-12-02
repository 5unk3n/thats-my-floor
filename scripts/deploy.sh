#!/bin/bash

# Stop script on error
set -e

# Load environment variables if .env exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check if required variables are set
if [ -z "$GITHUB_ACTOR" ] || [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_ACTOR and GITHUB_TOKEN must be set."
  exit 1
fi

echo "Logging in to GHCR..."
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_ACTOR --password-stdin

echo "Pulling latest image..."
docker pull ghcr.io/5unk3n/my-app:latest

echo "Stopping existing container..."
docker stop my-app || true
docker rm my-app || true

echo "Starting new container..."
docker run -d \
  --name my-app \
  --restart always \
  -p 3000:3000 \
  --env-file .env \
  ghcr.io/5unk3n/my-app:latest

echo "Deployment successful!"
