# TradeWiser - Quick Start Deployment

**Fast track deployment guide for tradewiser.in on DigitalOcean**

---

## Prerequisites

- DigitalOcean account
- Domain: tradewiser.in with DNS access
- 30 minutes of time

---

## Step 1: Create Droplet (5 minutes)

1. Go to https://cloud.digitalocean.com
2. Create → Droplets
3. Choose:
   - **Image:** Ubuntu 22.04 LTS
   - **Size:** Basic $12/month (2GB RAM)
   - **Region:** Bangalore or Singapore
   - **Authentication:** SSH key or Password
   - **Hostname:** tradewiser-production
4. Click "Create Droplet"
5. **Note the IP address** (e.g., 123.45.67.89)

---

## Step 2: Configure DNS (2 minutes)

Add these DNS records at your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_DROPLET_IP | 3600 |
| A | www | YOUR_DROPLET_IP | 3600 |

**Wait 5-30 minutes for DNS propagation**

Check: https://dnschecker.org (enter tradewiser.in)

---

## Step 3: Deploy Application (10 minutes)

### 3.1 Connect to Server

```bash
ssh root@YOUR_DROPLET_IP
```

### 3.2 Run Deployment

```bash
# Clone repository
git clone https://github.com/mgoel88/Bolt-TradeWiser.git
cd Bolt-TradeWiser

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

**Save the database password shown at the end!**

### 3.3 Verify

```bash
pm2 status
# Should show "tradewiser" as "online"

curl http://localhost:5000
# Should return HTML
```

---

## Step 4: Setup SSL (5 minutes)

**Only after DNS is propagated!**

```bash
cd /var/www/tradewiser
./setup-ssl.sh
```

Enter your email when prompted.

---

## Step 5: Access Your Site

Open browser and visit:
- **https://tradewiser.in**
- **https://www.tradewiser.in**

✅ **Done! Your application is live.**

---

## Common Commands

```bash
# View logs
pm2 logs tradewiser

# Restart app
pm2 restart tradewiser

# Deploy updates
cd /var/www/tradewiser && ./update.sh

# Check status
pm2 status
```

---

## Troubleshooting

**Site not loading?**
- Check DNS: `dig tradewiser.in`
- Check app: `pm2 status`
- Check nginx: `sudo systemctl status nginx`

**SSL not working?**
- Ensure DNS is propagated first
- Run `./setup-ssl.sh` again

**Need help?**
See full guide: `DIGITALOCEAN_DEPLOYMENT_GUIDE.md`

---

**Cost:** $12/month  
**Time to deploy:** ~30 minutes  
**Your site:** https://tradewiser.in
