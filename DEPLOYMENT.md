# TradeWiser Deployment Documentation

## Deployment Summary

The **Bolt-TradeWiser** application has been successfully deployed and is now publicly accessible.

## Application Details

- **Repository**: https://github.com/mgoel88/Bolt-TradeWiser
- **Type**: Full-stack Express.js + React application
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: User authentication system included

## Public Access URL

**Live Application**: https://5000-ihctspaclfmzbpjdc97rd-e5134e5f.manus-asia.computer/

## Deployment Configuration

### Environment Variables

The following environment variables have been configured:

```
DATABASE_URL=postgresql://tradewiser_user:tradewiser_pass@localhost:5432/tradewiser
NODE_ENV=production
```

### Database Setup

- **Database Name**: tradewiser
- **Database User**: tradewiser_user
- **Database Password**: tradewiser_pass
- **Port**: 5432 (PostgreSQL default)

Database schema has been initialized using Drizzle migrations with a `users` table for authentication.

### Application Server

- **Port**: 5000
- **Host**: 0.0.0.0 (accessible from all network interfaces)
- **Process**: Running in background with nohup

## Application Structure

```
Bolt-TradeWiser/
├── client/          # React frontend application
├── server/          # Express.js backend
├── shared/          # Shared schema and types
├── dist/            # Production build output
│   ├── public/      # Static frontend assets
│   └── index.js     # Compiled backend server
└── .env             # Environment configuration
```

## Management Commands

### View Application Logs

```bash
cd /home/ubuntu/Bolt-TradeWiser
tail -f app.log
```

### Restart Application

```bash
cd /home/ubuntu/Bolt-TradeWiser
pkill -f "node dist/index.js"
export $(cat .env | xargs)
nohup npm start > app.log 2>&1 &
```

### Stop Application

```bash
pkill -f "node dist/index.js"
```

### Check Application Status

```bash
ps aux | grep "node dist/index.js"
curl http://localhost:5000/
```

### Rebuild Application

```bash
cd /home/ubuntu/Bolt-TradeWiser
export $(cat .env | xargs)
npm run build
```

## Database Management

### Connect to PostgreSQL

```bash
sudo -u postgres psql -d tradewiser
```

### Run Database Migrations

```bash
cd /home/ubuntu/Bolt-TradeWiser
export $(cat .env | xargs)
npm run db:push
```

## Features

Based on the application structure, TradeWiser includes:

- User authentication and registration system
- PostgreSQL database with Drizzle ORM
- Modern React frontend with Vite
- Express.js REST API backend
- WebSocket support (ws package included)
- Radix UI components for the interface
- TailwindCSS for styling
- Form handling with React Hook Form
- Data visualization with Recharts

## Security Notes

⚠️ **Important**: This is a development/demo deployment. For production use, consider:

1. Using stronger database passwords
2. Setting up SSL/TLS certificates
3. Implementing rate limiting
4. Adding proper logging and monitoring
5. Using environment-specific configurations
6. Setting up proper backup strategies
7. Implementing security headers
8. Using a process manager like PM2 for better reliability

## Deployment Date

Deployed on: October 30, 2025

## Status

✅ **Application is running and accessible**
