#!/bin/bash
set -e

# Target Host defined in ~/.ssh/config
TARGET_HOST="my-app-target"

echo "🚀 Deploying Nginx configuration to $TARGET_HOST..."

# 1. Copy nginx.conf to server
echo "📦 Copying nginx.conf..."
scp nginx/nginx.conf "$TARGET_HOST:~/app/nginx.conf"

# 2. Move config and reload Nginx
echo "🔄 Reloading Nginx..."
ssh "$TARGET_HOST" << 'EOF'
  set -e
  
  # Ensure target directory exists
  mkdir -p ~/app

  # Move config to sites-available
  sudo mv ~/app/nginx.conf /etc/nginx/sites-available/my-app
  
  # Link if not exists
  if [ ! -L /etc/nginx/sites-enabled/my-app ]; then
    echo "Linking site..."
    sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/
  fi
  
  # Test and reload
  echo "Testing configuration..."
  sudo nginx -t
  echo "Reloading service..."
  sudo systemctl reload nginx
EOF

echo "✅ Nginx updated successfully!"
