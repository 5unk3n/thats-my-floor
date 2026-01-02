#!/bin/bash
set -e

# Configuration
# Service names in docker-compose.yml
BLUE_SERVICE="app-blue"
GREEN_SERVICE="app-green"
NGINX_CONF_DIR="/etc/nginx/conf.d"

# 0. Check Nginx Configuration Constraints
# Fail Fast if configuration files are missing
if [ ! -f "$NGINX_CONF_DIR/blue.inc" ] || [ ! -f "$NGINX_CONF_DIR/green.inc" ]; then
  echo "❌ Error: Nginx configuration files (blue.inc/green.inc) not found in $NGINX_CONF_DIR"
  exit 1
fi

# 1. Check current status
# If port 3000 is active (Blue), we deploy to Green.
# If port 3001 is active (Green), we deploy to Blue.

CURRENT_CONF=$(readlink -f "$NGINX_CONF_DIR/service-url.inc" || echo "")

if [[ "$CURRENT_CONF" == *blue.inc* ]]; then
  CURRENT_COLOR="blue"
  NEW_COLOR="green"
  NEW_SERVICE=$GREEN_SERVICE
  CURRENT_SERVICE=$BLUE_SERVICE
  NEW_PORT=3001
elif [[ "$CURRENT_CONF" == *green.inc* ]]; then
  CURRENT_COLOR="green"
  NEW_COLOR="blue"
  NEW_SERVICE=$BLUE_SERVICE
  CURRENT_SERVICE=$GREEN_SERVICE
  NEW_PORT=3000
else
  # Default/Fallback
  echo "⚠️  No current configuration found. Defaulting to Blue deployment."
  CURRENT_COLOR="green"
  NEW_COLOR="blue"
  NEW_SERVICE=$BLUE_SERVICE
  CURRENT_SERVICE=$GREEN_SERVICE
  NEW_PORT=3000
fi

echo "🚀 Starting Blue/Green Deployment: $CURRENT_COLOR -> $NEW_COLOR"

# 2. Pull latest images
echo "📥 Pulling latest images..."
docker compose pull

# 3. Start New Container
echo "▶️  Starting new container ($NEW_SERVICE)..."
docker compose up -d "$NEW_SERVICE"

# 5. Health Check
echo "🏥 Performing Health Check..."
RETRIES=0
MAX_RETRIES=12 # 60 seconds

until curl -s -f http://127.0.0.1:$NEW_PORT/api/health > /dev/null; do
  RETRIES=$((RETRIES+1))
  if [ $RETRIES -ge $MAX_RETRIES ]; then
    echo "❌ Health Check Failed after $MAX_RETRIES attempts."
    echo "⚠️  Stopping failed container..."
    docker compose stop "$NEW_SERVICE"
    docker compose rm -f "$NEW_SERVICE"
    exit 1
  fi
  echo "⏳ Waiting for service to be ready... ($RETRIES/$MAX_RETRIES)"
  sleep 5
done

echo "✅ Health Check Passed!"

# 6. Switch Traffic (Nginx Reload)
echo "🔀 Traffic Switch..."
sudo ln -sf $NGINX_CONF_DIR/$NEW_COLOR.inc $NGINX_CONF_DIR/service-url.inc

if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "✅ Switched traffic to $NEW_COLOR (Port $NEW_PORT)."
else
    echo "❌ Nginx configuration test failed! Aborting switch."
    docker compose stop "$NEW_SERVICE"
    docker compose rm -f "$NEW_SERVICE"
    exit 1
fi

# 7. Cleanup Old Container
echo "🧹 Cleaning up old container ($CURRENT_SERVICE)..."
docker compose stop "$CURRENT_SERVICE"
docker compose rm -f "$CURRENT_SERVICE"

echo "🎉 Deployment Successfully Completed! Current Active: $NEW_COLOR"
