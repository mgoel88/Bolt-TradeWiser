#!/bin/bash

# SSL Certificate Setup Script for TradeWiser
# Run this AFTER your domain is pointing to the server

set -e

echo "=== SSL Certificate Setup ==="
echo ""
echo "IMPORTANT: Before running this script, ensure:"
echo "1. Your domain tradewiser.in is pointing to this server's IP"
echo "2. DNS has propagated (check with: dig tradewiser.in)"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Prompt for email
read -p "Enter your email address for SSL certificate notifications: " EMAIL

if [ -z "$EMAIL" ]; then
    echo "Error: Email address is required"
    exit 1
fi

# Obtain SSL certificate
echo "Obtaining SSL certificate from Let's Encrypt..."
sudo certbot --nginx -d tradewiser.in -d www.tradewiser.in --non-interactive --agree-tos --email $EMAIL --redirect

# Set up auto-renewal
echo "Setting up automatic certificate renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal
echo "Testing certificate renewal..."
sudo certbot renew --dry-run

echo ""
echo "=== SSL Setup Complete ==="
echo ""
echo "Your website is now accessible at:"
echo "https://tradewiser.in"
echo "https://www.tradewiser.in"
echo ""
echo "Certificate will auto-renew before expiration."
echo ""
