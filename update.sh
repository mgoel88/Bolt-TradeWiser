#!/bin/bash

# TradeWiser Update Script
# Use this script to deploy updates to the application

set -e

APP_DIR="/var/www/tradewiser"

echo "=== TradeWiser Update Script ==="
echo "Updating application..."

cd $APP_DIR

# Pull latest changes
echo "Pulling latest code from repository..."
git pull

# Install/update dependencies
echo "Installing dependencies..."
npm install

# Run database migrations
echo "Running database migrations..."
npm run db:push

# Build application
echo "Building application..."
npm run build

# Restart application with PM2
echo "Restarting application..."
pm2 restart tradewiser

# Save PM2 configuration
pm2 save

echo ""
echo "=== Update Complete ==="
echo "Application has been updated and restarted."
echo ""
echo "Check status with: pm2 status"
echo "View logs with: pm2 logs tradewiser"
echo ""
