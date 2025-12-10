#!/bin/bash
set -e

# Target Host defined in ~/.ssh/config
TARGET_HOST="my-app-target"

echo "🚀 Deploying Nginx configuration to $TARGET_HOST..."

# 1. Create app directory on remote server first
echo "📁 Preparing remote directory..."
ssh "$TARGET_HOST" "mkdir -p ~/app"

# 2. Copy nginx.conf and Blue/Green configs to server
echo "📦 Copying Nginx configuration files..."
scp nginx/nginx.conf "$TARGET_HOST:~/app/nginx.conf"
scp nginx/conf.d/blue.inc "$TARGET_HOST:~/app/blue.inc"
scp nginx/conf.d/green.inc "$TARGET_HOST:~/app/green.inc"

# 3. Move config, initialize symbolic link, and reload Nginx
echo "🔄 Configuring Nginx..."
ssh "$TARGET_HOST" <<'EOF'
  set -e

  # Move config to sites-available
  sudo mv ~/app/nginx.conf /etc/nginx/sites-available/my-app
  
  # Move Blue/Green configs to conf.d
  sudo mv ~/app/blue.inc /etc/nginx/conf.d/
  sudo mv ~/app/green.inc /etc/nginx/conf.d/
  
  # Link site if not exists
  if [ ! -L /etc/nginx/sites-enabled/my-app ]; then
    echo "📌 Linking site..."
    sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/
  fi
  
  # Initialize service-url.inc symbolic link if not exists
  if [ ! -e /etc/nginx/conf.d/service-url.inc ]; then
    echo "🔗 Creating initial symbolic link (defaulting to Blue)..."
    sudo ln -s /etc/nginx/conf.d/blue.inc /etc/nginx/conf.d/service-url.inc
    echo "✅ Symbolic link created: service-url.inc -> blue.inc"
  else
    CURRENT_LINK=$(readlink -f /etc/nginx/conf.d/service-url.inc 2>/dev/null || echo "")
    if [ -z "$CURRENT_LINK" ]; then
      echo "⚠️  Symbolic link is broken. Recreating..."
      sudo rm -f /etc/nginx/conf.d/service-url.inc
      sudo ln -s /etc/nginx/conf.d/blue.inc /etc/nginx/conf.d/service-url.inc
      echo "✅ Symbolic link recreated: service-url.inc -> blue.inc"
    else
      echo "✅ Symbolic link already exists: service-url.inc -> $(basename $CURRENT_LINK)"
    fi
  fi
  
  # Test and reload
  echo "🧪 Testing configuration..."
  sudo nginx -t
  echo "♻️  Reloading service..."
  sudo systemctl reload nginx
EOF

echo "✅ Nginx updated successfully!"
