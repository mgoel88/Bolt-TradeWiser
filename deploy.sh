#!/bin/bash

# TradeWiser Deployment Script for DigitalOcean
# This script sets up the application on a fresh Ubuntu server

set -e

echo "=== TradeWiser Deployment Script ==="
echo "Starting deployment process..."

# Update system
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install required packages
echo "Installing required packages..."
sudo apt-get install -y curl git nginx certbot python3-certbot-nginx postgresql postgresql-contrib

# Install Node.js 22
echo "Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
echo "Installing PM2 process manager..."
sudo npm install -g pm2

# Configure PostgreSQL
echo "Configuring PostgreSQL..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Prompt for database password
read -sp "Enter database password (or press Enter for default): " DB_PASSWORD
echo
if [ -z "$DB_PASSWORD" ]; then
    DB_PASSWORD="tradewiser_secure_$(openssl rand -hex 16)"
    echo "Generated secure password: $DB_PASSWORD"
fi

# Create database and user
echo "Creating database and user..."
sudo -u postgres psql << EOF
CREATE DATABASE tradewiser;
CREATE USER tradewiser_user WITH PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE tradewiser TO tradewiser_user;
\c tradewiser
GRANT ALL ON SCHEMA public TO tradewiser_user;
EOF

# Clone or update repository
APP_DIR="/var/www/tradewiser"
if [ -d "$APP_DIR" ]; then
    echo "Updating existing repository..."
    cd $APP_DIR
    git pull
else
    echo "Cloning repository..."
    sudo mkdir -p /var/www
    sudo git clone https://github.com/mgoel88/Bolt-TradeWiser.git $APP_DIR
    sudo chown -R $USER:$USER $APP_DIR
    cd $APP_DIR
fi

# Create environment file
echo "Creating environment configuration..."
cat > .env << EOF
DATABASE_URL=postgresql://tradewiser_user:$DB_PASSWORD@localhost:5432/tradewiser
NODE_ENV=production
EOF

# Install dependencies
echo "Installing application dependencies..."
npm install

# Run database migrations
echo "Running database migrations..."
npm run db:push

# Build application
echo "Building application..."
npm run build

# Configure PM2
echo "Configuring PM2..."
pm2 delete tradewiser 2>/dev/null || true
pm2 start npm --name "tradewiser" -- start
pm2 save
pm2 startup systemd -u $USER --hp $HOME

# Configure Nginx
echo "Configuring Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/tradewiser
sudo ln -sf /etc/nginx/sites-available/tradewiser /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Configure firewall
echo "Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo ""
echo "=== Initial Deployment Complete ==="
echo ""
echo "Next steps:"
echo "1. Point your domain tradewiser.in to this server's IP address"
echo "2. Wait for DNS propagation (can take up to 48 hours)"
echo "3. Run the SSL setup script: ./setup-ssl.sh"
echo ""
echo "Database password: $DB_PASSWORD"
echo "Save this password securely!"
echo ""
