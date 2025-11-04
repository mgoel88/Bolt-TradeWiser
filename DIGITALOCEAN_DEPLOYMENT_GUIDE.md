# TradeWiser - DigitalOcean Deployment Guide

Complete step-by-step guide to deploy your TradeWiser application to DigitalOcean with the custom domain **tradewiser.in**.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create DigitalOcean Droplet](#step-1-create-digitalocean-droplet)
3. [Step 2: Configure Domain DNS](#step-2-configure-domain-dns)
4. [Step 3: Connect to Server](#step-3-connect-to-server)
5. [Step 4: Deploy Application](#step-4-deploy-application)
6. [Step 5: Configure SSL Certificate](#step-5-configure-ssl-certificate)
7. [Step 6: Verify Deployment](#step-6-verify-deployment)
8. [Management & Maintenance](#management--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- ✅ DigitalOcean account (sign up at https://www.digitalocean.com)
- ✅ Domain name **tradewiser.in** with access to DNS settings
- ✅ SSH key pair (or ability to use password authentication)
- ✅ GitHub repository access to mgoel88/Bolt-TradeWiser

**Estimated Time:** 30-45 minutes  
**Estimated Cost:** $6-12/month (depending on droplet size)

---

## Step 1: Create DigitalOcean Droplet

### 1.1 Log in to DigitalOcean

1. Go to https://cloud.digitalocean.com
2. Log in to your account
3. Click **"Create"** → **"Droplets"**

### 1.2 Configure Droplet Settings

**Choose an Image:**
- Distribution: **Ubuntu 22.04 LTS x64**

**Choose Size:**
- **Recommended:** Basic plan - $12/month (2 GB RAM, 1 vCPU, 50 GB SSD)
- **Minimum:** Basic plan - $6/month (1 GB RAM, 1 vCPU, 25 GB SSD)
  - Note: 1GB may require swap configuration for building

**Choose a Datacenter Region:**
- Select the region closest to your target users
- Recommended for India: **Bangalore** or **Singapore**

**Authentication:**
- **Option A (Recommended):** SSH Key
  - Click "New SSH Key"
  - Paste your public key (from `~/.ssh/id_rsa.pub`)
  - Give it a name
- **Option B:** Password
  - You'll receive root password via email

**Hostname:**
- Enter: `tradewiser-production`

**Additional Options (Optional but Recommended):**
- ✅ Enable monitoring (free)
- ✅ Enable IPv6
- ✅ User data (leave empty for now)

### 1.3 Create Droplet

1. Click **"Create Droplet"**
2. Wait 1-2 minutes for droplet creation
3. **Note the IP address** displayed (e.g., `123.45.67.89`)

---

## Step 2: Configure Domain DNS

### 2.1 Access Domain DNS Settings

1. Log in to your domain registrar (where you purchased tradewiser.in)
2. Navigate to DNS management/settings for tradewiser.in

### 2.2 Add DNS Records

Add the following DNS records (replace `123.45.67.89` with your droplet's IP):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 123.45.67.89 | 3600 |
| A | www | 123.45.67.89 | 3600 |

**Example for common registrars:**

**GoDaddy:**
- DNS → Manage Zones → tradewiser.in → Add Record

**Namecheap:**
- Domain List → Manage → Advanced DNS → Add New Record

**Cloudflare:**
- DNS → Add record

### 2.3 Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** to propagate
- Check propagation status: https://dnschecker.org
- Enter `tradewiser.in` and verify it shows your droplet's IP

**Quick Check:**
```bash
# On your local machine
dig tradewiser.in
# Should show your droplet's IP address
```

---

## Step 3: Connect to Server

### 3.1 SSH into Droplet

**If using SSH key:**
```bash
ssh root@123.45.67.89
```

**If using password:**
```bash
ssh root@123.45.67.89
# Enter the password sent to your email
```

### 3.2 Create Non-Root User (Recommended)

```bash
# Create new user
adduser tradewiser

# Add to sudo group
usermod -aG sudo tradewiser

# Copy SSH keys (if using SSH authentication)
rsync --archive --chown=tradewiser:tradewiser ~/.ssh /home/tradewiser

# Switch to new user
su - tradewiser
```

**For subsequent logins:**
```bash
ssh tradewiser@123.45.67.89
```

---

## Step 4: Deploy Application

### 4.1 Download Deployment Files

**Option A: Clone the entire repository**
```bash
cd ~
git clone https://github.com/mgoel88/Bolt-TradeWiser.git
cd Bolt-TradeWiser
```

**Option B: If you have deployment files separately**
```bash
# Upload files using scp from your local machine
scp deploy.sh setup-ssl.sh nginx.conf tradewiser@123.45.67.89:~/
```

### 4.2 Run Deployment Script

```bash
# Make sure you're in the directory with deploy.sh
chmod +x deploy.sh
./deploy.sh
```

**What the script does:**
1. Updates system packages
2. Installs Node.js 22, PostgreSQL, Nginx, Certbot
3. Installs PM2 process manager
4. Creates database and user
5. Clones/updates repository to `/var/www/tradewiser`
6. Installs dependencies and builds application
7. Configures PM2 to run application
8. Sets up Nginx reverse proxy
9. Configures firewall

**During execution:**
- You'll be prompted for a database password
- Press Enter to auto-generate a secure password
- **SAVE THE PASSWORD** displayed at the end!

**Expected duration:** 5-10 minutes

### 4.3 Verify Application is Running

```bash
# Check PM2 status
pm2 status

# Should show:
# ┌─────┬──────────────┬─────────┬─────────┐
# │ id  │ name         │ status  │ cpu     │
# ├─────┼──────────────┼─────────┼─────────┤
# │ 0   │ tradewiser   │ online  │ 0%      │
# └─────┴──────────────┴─────────┴─────────┘

# View application logs
pm2 logs tradewiser

# Test local access
curl http://localhost:5000
# Should return HTML content
```

---

## Step 5: Configure SSL Certificate

### 5.1 Verify DNS is Propagated

Before proceeding, ensure your domain is pointing to the server:

```bash
# Check if domain resolves to your server
dig tradewiser.in +short
# Should output your server's IP address

# Test HTTP access (should work now)
curl http://tradewiser.in
```

If the domain doesn't resolve yet, **wait and check again**. Do not proceed until DNS is working.

### 5.2 Run SSL Setup Script

```bash
cd /var/www/tradewiser
./setup-ssl.sh
```

**You'll be prompted for:**
- Your email address (for certificate expiration notifications)

**What the script does:**
1. Obtains SSL certificate from Let's Encrypt
2. Configures Nginx for HTTPS
3. Sets up automatic certificate renewal
4. Redirects HTTP to HTTPS

**Expected duration:** 1-2 minutes

### 5.3 Verify HTTPS is Working

```bash
# Test HTTPS access
curl https://tradewiser.in
# Should return HTML content

# Check certificate
curl -vI https://tradewiser.in 2>&1 | grep -i "SSL certificate"
```

---

## Step 6: Verify Deployment

### 6.1 Access Your Website

Open your browser and visit:
- **https://tradewiser.in**
- **https://www.tradewiser.in**

Both should:
- ✅ Load the TradeWiser application
- ✅ Show a secure padlock icon (HTTPS)
- ✅ Redirect from HTTP to HTTPS

### 6.2 Test Application Features

1. **Registration:** Create a new user account
2. **Login:** Log in with created credentials
3. **Navigation:** Test all pages and features
4. **WebSocket (if applicable):** Check real-time features

### 6.3 Check System Status

```bash
# Application status
pm2 status

# Nginx status
sudo systemctl status nginx

# PostgreSQL status
sudo systemctl status postgresql

# View application logs
pm2 logs tradewiser --lines 50

# View Nginx logs
sudo tail -f /var/log/nginx/tradewiser_access.log
sudo tail -f /var/log/nginx/tradewiser_error.log
```

---

## Management & Maintenance

### Daily Operations

**View Application Logs:**
```bash
pm2 logs tradewiser
pm2 logs tradewiser --lines 100  # Last 100 lines
```

**Restart Application:**
```bash
pm2 restart tradewiser
```

**Stop Application:**
```bash
pm2 stop tradewiser
```

**Start Application:**
```bash
pm2 start tradewiser
```

**Monitor Resources:**
```bash
pm2 monit
```

### Deploying Updates

When you push changes to GitHub:

```bash
cd /var/www/tradewiser
./update.sh
```

This will:
1. Pull latest code
2. Install new dependencies
3. Run database migrations
4. Rebuild application
5. Restart with zero downtime

### Database Management

**Connect to Database:**
```bash
sudo -u postgres psql -d tradewiser
```

**Backup Database:**
```bash
sudo -u postgres pg_dump tradewiser > backup_$(date +%Y%m%d).sql
```

**Restore Database:**
```bash
sudo -u postgres psql tradewiser < backup_20251030.sql
```

**Automated Backups (Recommended):**
```bash
# Create backup script
sudo nano /usr/local/bin/backup-tradewiser.sh
```

Add:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/tradewiser"
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump tradewiser | gzip > $BACKUP_DIR/tradewiser_$(date +%Y%m%d_%H%M%S).sql.gz
# Keep only last 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
```

Make executable and add to cron:
```bash
sudo chmod +x /usr/local/bin/backup-tradewiser.sh
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-tradewiser.sh
```

### Security Updates

**Update System Packages:**
```bash
sudo apt-get update
sudo apt-get upgrade -y
```

**Update Node.js Dependencies:**
```bash
cd /var/www/tradewiser
npm audit
npm audit fix
npm update
npm run build
pm2 restart tradewiser
```

### Monitoring

**Set up PM2 Monitoring (Free):**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

**Check Disk Space:**
```bash
df -h
```

**Check Memory Usage:**
```bash
free -h
```

**Check CPU Usage:**
```bash
top
# Press 'q' to quit
```

---

## Troubleshooting

### Application Won't Start

**Check logs:**
```bash
pm2 logs tradewiser --err
```

**Common issues:**
- Database connection failed: Check DATABASE_URL in `/var/www/tradewiser/.env`
- Port already in use: `sudo lsof -i :5000` to find conflicting process
- Build failed: Run `npm run build` manually to see errors

### Domain Not Accessible

**Check DNS:**
```bash
dig tradewiser.in
nslookup tradewiser.in
```

**Check Nginx:**
```bash
sudo nginx -t  # Test configuration
sudo systemctl status nginx
sudo systemctl restart nginx
```

**Check Firewall:**
```bash
sudo ufw status
# Should show ports 22, 80, 443 allowed
```

### SSL Certificate Issues

**Check certificate status:**
```bash
sudo certbot certificates
```

**Renew certificate manually:**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

**Certificate not found:**
- Ensure DNS is propagated
- Run `./setup-ssl.sh` again

### Database Connection Issues

**Check PostgreSQL status:**
```bash
sudo systemctl status postgresql
```

**Test connection:**
```bash
sudo -u postgres psql -d tradewiser -c "SELECT version();"
```

**Reset database password:**
```bash
sudo -u postgres psql
ALTER USER tradewiser_user WITH PASSWORD 'new_password';
\q

# Update .env file
nano /var/www/tradewiser/.env
# Update DATABASE_URL with new password
pm2 restart tradewiser
```

### High Memory Usage

**Add swap space (for 1GB droplets):**
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Application Crashes

**Enable auto-restart:**
```bash
pm2 startup
pm2 save
```

**Check crash logs:**
```bash
pm2 logs tradewiser --err --lines 200
```

---

## Performance Optimization

### Enable Nginx Caching

Add to nginx.conf before the server block:
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=app_cache:10m max_size=1g inactive=60m;
```

### Enable Gzip Compression

Already configured in nginx.conf, but verify:
```bash
curl -H "Accept-Encoding: gzip" -I https://tradewiser.in
# Should show: Content-Encoding: gzip
```

### Database Optimization

```bash
sudo -u postgres psql -d tradewiser
```

```sql
-- Analyze tables
ANALYZE;

-- Check slow queries
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

---

## Scaling Considerations

### Vertical Scaling (Upgrade Droplet)

1. Go to DigitalOcean dashboard
2. Select your droplet
3. Click "Resize"
4. Choose larger plan
5. Application will restart automatically

### Horizontal Scaling (Multiple Servers)

For high traffic, consider:
- Load balancer (DigitalOcean Load Balancer)
- Multiple app servers
- Managed PostgreSQL database
- Redis for session storage

---

## Cost Breakdown

| Component | Monthly Cost |
|-----------|--------------|
| Droplet (2GB) | $12.00 |
| Bandwidth (1TB included) | $0.00 |
| Backups (optional) | $2.40 |
| Load Balancer (if needed) | $12.00 |
| Managed Database (if needed) | $15.00+ |
| **Total (Basic)** | **$12.00** |

---

## Support & Resources

### DigitalOcean Documentation
- https://docs.digitalocean.com
- https://www.digitalocean.com/community/tutorials

### Application Resources
- Repository: https://github.com/mgoel88/Bolt-TradeWiser
- PM2 Documentation: https://pm2.keymetrics.io/docs
- Nginx Documentation: https://nginx.org/en/docs

### Getting Help
- DigitalOcean Community: https://www.digitalocean.com/community
- PM2 Support: https://github.com/Unitech/pm2/issues
- Let's Encrypt: https://community.letsencrypt.org

---

## Security Checklist

- ✅ SSH key authentication enabled
- ✅ Firewall configured (UFW)
- ✅ SSL/TLS certificate installed
- ✅ Regular security updates scheduled
- ✅ Database password secured
- ✅ Non-root user created
- ✅ Fail2ban installed (optional but recommended)
- ✅ Regular backups configured

**Install Fail2ban (Recommended):**
```bash
sudo apt-get install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## Quick Reference Commands

```bash
# Application Management
pm2 status                    # Check status
pm2 logs tradewiser          # View logs
pm2 restart tradewiser       # Restart app
pm2 monit                    # Monitor resources

# Deployment
cd /var/www/tradewiser && ./update.sh    # Deploy updates

# System
sudo systemctl status nginx              # Nginx status
sudo systemctl status postgresql         # Database status
sudo ufw status                          # Firewall status

# SSL
sudo certbot renew                       # Renew certificate
sudo certbot certificates                # Check certificates

# Database
sudo -u postgres psql -d tradewiser      # Connect to DB
```

---

## Conclusion

Your TradeWiser application is now deployed on DigitalOcean with:

✅ Production-ready configuration  
✅ HTTPS encryption with auto-renewal  
✅ Process management with PM2  
✅ Nginx reverse proxy  
✅ PostgreSQL database  
✅ Automated deployment scripts  
✅ Custom domain (tradewiser.in)  

**Your application is live at: https://tradewiser.in**

For questions or issues, refer to the troubleshooting section or consult the official documentation.

---

**Deployment Date:** October 30, 2025  
**Version:** 1.0  
**Maintained by:** TradeWiser Team
