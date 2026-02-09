# Lens Voyage V2 - Deployment Summary

## 🚀 Deployment Information

**Deployment Date:** January 15, 2026  
**Domain:** https://lenvoyagev.devwooyou.space  
**Repository:** https://github.com/joozery/lenvoyagev2.git  
**Server Location:** /srv/lenvoyagev2

## 📋 Technology Stack

### Frontend
- **Framework:** Next.js 16.1.1 (React 19.2.3)
- **UI Library:** Radix UI Components
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion 12.26.2
- **Icons:** Lucide React
- **Language:** TypeScript 5.x

### Deployment
- **Process Manager:** PM2
- **Web Server:** Nginx
- **SSL Certificate:** Let's Encrypt (Certbot)
- **Port:** 3010
- **Node Environment:** Production

## 🔧 Configuration Files

### PM2 Ecosystem
- **File:** `/srv/lenvoyagev2/ecosystem.config.cjs`
- **App Name:** lenvoyagev2
- **Port:** 3010
- **Instances:** 1 (fork mode)
- **Max Memory:** 1GB
- **Auto Restart:** Yes
- **Logs Directory:** `/srv/lenvoyagev2/logs/`

### Nginx Configuration
- **Config File:** `/etc/nginx/sites-available/lenvoyagev.devwooyou.space`
- **Enabled:** Yes (symlinked to sites-enabled)
- **SSL:** Enabled (Auto-redirect HTTP to HTTPS)
- **Certificate:** `/etc/letsencrypt/live/lenvoyagev.devwooyou.space/`
- **Certificate Expiry:** April 15, 2026 (auto-renewal enabled)

## 📁 Project Structure

```
/srv/lenvoyagev2/
├── .next/                 # Next.js build output
├── logs/                  # PM2 application logs
├── node_modules/          # Dependencies
├── public/                # Static assets
├── src/                   # Source code
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   └── lib/              # Utilities
├── ecosystem.config.cjs   # PM2 configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## 🌐 Application Routes

The application includes the following pages:
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/gallery` - Gallery page
- `/tours` - Tours listing
- `/admin` - Admin dashboard (with subpages)
  - `/admin/admins` - Admin management
  - `/admin/bookings` - Bookings management
  - `/admin/gallery` - Gallery management
  - `/admin/login` - Admin login
  - `/admin/partners` - Partners management
  - `/admin/profile` - Admin profile
  - `/admin/settings` - Settings
  - `/admin/teams` - Teams management
  - `/admin/tours` - Tours management
  - `/admin/users` - Users management

## 🔐 SSL/TLS Configuration

- **Protocol:** TLS 1.2, TLS 1.3
- **Certificate Authority:** Let's Encrypt
- **Auto-renewal:** Enabled via Certbot
- **HSTS:** Enabled (max-age=31536000)
- **Redirect:** HTTP → HTTPS (301 Permanent)

## 📊 Performance Optimization

### Caching
- **Next.js Static Files:** 60 minutes cache
- **Static Assets:** 1 year cache (immutable)
- **Gzip Compression:** Enabled for text/json/js/css

### Proxy Settings
- **Timeout:** 60 seconds
- **HTTP Version:** 1.1
- **WebSocket Support:** Enabled (upgrade header)

## 🚀 Deployment Commands

### Start Application
```bash
cd /srv/lenvoyagev2
pm2 start ecosystem.config.cjs
```

### Stop Application
```bash
pm2 stop lenvoyagev2
```

### Restart Application
```bash
pm2 restart lenvoyagev2
```

### View Logs
```bash
pm2 logs lenvoyagev2
```

### Update Deployment
```bash
cd /srv/lenvoyagev2
git pull origin main
npm install
npm run build
pm2 restart lenvoyagev2
```

## 📝 Maintenance

### PM2 Process Management
- **Save PM2 List:** `pm2 save`
- **Resurrect on Reboot:** `pm2 startup`
- **Monitor:** `pm2 monit`

### SSL Certificate Renewal
- **Auto-renewal:** Configured via Certbot
- **Manual Renewal:** `certbot renew`
- **Check Expiry:** `certbot certificates`

### Nginx
- **Test Config:** `nginx -t`
- **Reload:** `systemctl reload nginx`
- **Restart:** `systemctl restart nginx`

## 🔍 Monitoring & Logs

### Application Logs
- **Output Log:** `/srv/lenvoyagev2/logs/out-7.log`
- **Error Log:** `/srv/lenvoyagev2/logs/error-7.log`
- **Combined Log:** `/srv/lenvoyagev2/logs/combined-7.log`

### Nginx Logs
- **Access Log:** `/var/log/nginx/lenvoyagev.devwooyou.space-access.log`
- **Error Log:** `/var/log/nginx/lenvoyagev.devwooyou.space-error.log`

### PM2 Monitoring
```bash
pm2 list                    # List all processes
pm2 info lenvoyagev2       # Detailed info
pm2 monit                   # Real-time monitoring
```

## 🎯 Status

✅ Application deployed successfully  
✅ Next.js running on port 3010  
✅ PM2 process manager active  
✅ Nginx reverse proxy configured  
✅ SSL/HTTPS enabled  
✅ Auto-restart enabled  
✅ Logs configured  

**Website URL:** https://lenvoyagev.devwooyou.space  
**Status:** 🟢 Online and Running
