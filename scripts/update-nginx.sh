#!/bin/bash
set -e

# Load .env if exists
if [ -f .env ]; then
  source .env
fi

# Check required variables
if [ -z "$EC2_HOST" ] || [ -z "$EC2_USERNAME" ] || [ -z "$EC2_SSH_KEY_PATH" ]; then
  echo "Error: Please set EC2_HOST, EC2_USERNAME, and EC2_SSH_KEY_PATH in .env or environment."
  exit 1
fi

echo "🚀 Deploying Nginx configuration to $EC2_HOST..."

# 1. Copy nginx.conf to server
echo "📦 Copying nginx.conf..."
scp -i "$EC2_SSH_KEY_PATH" nginx/nginx.conf "$EC2_USERNAME@$EC2_HOST:/home/$EC2_USERNAME/app/nginx.conf"

# 2. Move config and reload Nginx
echo "🔄 Reloading Nginx..."
ssh -i "$EC2_SSH_KEY_PATH" "$EC2_USERNAME@$EC2_HOST" << 'EOF'
  set -e
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
