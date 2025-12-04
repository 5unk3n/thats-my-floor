#!/bin/bash
set -e

# Load .env if exists
if [ -f .env ]; then
  source .env
fi

# Check required variables
if [ -z "$VM_HOST" ] || [ -z "$VM_USERNAME" ] || [ -z "$VM_SSH_KEY_PATH" ]; then
  echo "Error: Please set VM_HOST, VM_USERNAME, and VM_SSH_KEY_PATH in .env or environment."
  exit 1
fi

echo "🚀 Deploying Nginx configuration to $VM_HOST..."

# 1. Copy nginx.conf to server
echo "📦 Copying nginx.conf..."
scp -i "$VM_SSH_KEY_PATH" nginx/nginx.conf "$VM_USERNAME@$VM_HOST:/home/$VM_USERNAME/app/nginx.conf"

# 2. Move config and reload Nginx
echo "🔄 Reloading Nginx..."
ssh -i "$VM_SSH_KEY_PATH" "$VM_USERNAME@$VM_HOST" << 'EOF'
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
