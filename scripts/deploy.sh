#!/bin/bash
set -e

# Configuration
APP_NAME="app"
IMAGE_NAME="ghcr.io/5unk3n/app:latest"
NGINX_CONF_DIR="/etc/nginx/conf.d"
DOCKER_CMD="docker"

# 1. Check current status
# If port 3000 is active (Blue), we deploy to Green (3001).
# If port 3001 is active (Green), we deploy to Blue (3000).
# We check the currently linked nginx config to decide.

CURRENT_CONF=$(readlink -f "$NGINX_CONF_DIR/service-url.inc" || echo "")

if [[ "$CURRENT_CONF" == *blue.inc* ]]; then
  CURRENT_COLOR="blue"
  NEW_COLOR="green"
  NEW_PORT=3001
  OLD_PORT=3000
elif [[ "$CURRENT_CONF" == *green.inc* ]]; then
  CURRENT_COLOR="green"
  NEW_COLOR="blue"
  NEW_PORT=3000
  OLD_PORT=3001
else
  # Default fallback if no config exists or initial setup: deploy to Blue
  echo "⚠️  No current configuration found. Defaulting to Blue deployment."
  CURRENT_COLOR="green" # Pretend green is old so we deploy blue
  NEW_COLOR="blue"
  NEW_PORT=3000
  OLD_PORT=3001
fi

echo "🚀 Starting Blue/Green Deployment: $CURRENT_COLOR -> $NEW_COLOR"
echo "🎯 Target Port: $NEW_PORT"

# 2. Pull latest image
echo "📥 Pulling latest image..."
$DOCKER_CMD pull $IMAGE_NAME

# 3. Clean up target container if exists
if [ "$($DOCKER_CMD ps -aq -f name=$APP_NAME-$NEW_COLOR)" ]; then
    echo "🧹 Removing existing target container ($APP_NAME-$NEW_COLOR)..."
    $DOCKER_CMD rm -f $APP_NAME-$NEW_COLOR
fi

# 4. Run new container
echo "▶️  Starting new container ($APP_NAME-$NEW_COLOR)..."
# Using --network host for simplicity if nginx is on host, but here we use port mapping
# Assuming Nginx is running on host or same network. 
# Since Nginx config uses 127.0.0.1, we map ports to host.
$DOCKER_CMD run -d \
  --name $APP_NAME-$NEW_COLOR \
  -p $NEW_PORT:3000 \
  --restart unless-stopped \
  --env-file .env \
  $IMAGE_NAME

# 5. Health Check
echo "🏥 Performing Health Check..."
RETRIES=0
MAX_RETRIES=10

until curl -s -f http://127.0.0.1:$NEW_PORT/api/health > /dev/null; do
  RETRIES=$((RETRIES+1))
  if [ $RETRIES -ge $MAX_RETRIES ]; then
    echo "❌ Health Check Failed after $MAX_RETRIES attempts."
    echo "⚠️  Stopping and removing failed container..."
    $DOCKER_CMD stop $APP_NAME-$NEW_COLOR
    $DOCKER_CMD rm $APP_NAME-$NEW_COLOR
    exit 1
  fi
  echo "⏳ Waiting for service to be ready... ($RETRIES/$MAX_RETRIES)"
  sleep 5
done

echo "✅ Health Check Passed!"

# 6. Switch Traffic (Nginx Reload)
echo "VR Traffic Switch..."
# Symlink the new config
sudo ln -sf $NGINX_CONF_DIR/$NEW_COLOR.inc $NGINX_CONF_DIR/service-url.inc

# Reload Nginx
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "✅ Switched traffic to $NEW_COLOR (Port $NEW_PORT)."
else
    echo "❌ Nginx configuration test failed! Aborting switch."
    # Rollback logic could go here but since we haven't switched yet, we just cleanup
    $DOCKER_CMD stop $APP_NAME-$NEW_COLOR
    $DOCKER_CMD rm $APP_NAME-$NEW_COLOR
    exit 1
fi

# 7. Cleanup Old Container
echo "🧹 Cleaning up old container ($APP_NAME-$CURRENT_COLOR)..."
if [ "$($DOCKER_CMD ps -q -f name=$APP_NAME-$CURRENT_COLOR)" ]; then
    $DOCKER_CMD stop $APP_NAME-$CURRENT_COLOR
    $DOCKER_CMD rm $APP_NAME-$CURRENT_COLOR
fi

echo "🎉 Deployment Successfully Completed! Current Active: $NEW_COLOR"
