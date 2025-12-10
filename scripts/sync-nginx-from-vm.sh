#!/bin/bash
set -e

# Target Host defined in ~/.ssh/config
TARGET_HOST="my-app-target"

echo "📥 Syncing Nginx configuration from VM..."

# Download current config from VM
scp "$TARGET_HOST:/etc/nginx/sites-available/my-app" nginx/nginx.conf

echo "✅ Configuration synced successfully!"
