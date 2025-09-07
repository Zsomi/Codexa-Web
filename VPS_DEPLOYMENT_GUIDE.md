# 🚀 VPS Deployment Útmutató - Codexa Weboldal

## 1. VPS Előkészítés

### Ubuntu/Debian szerveren:
```bash
# Rendszer frissítés
sudo apt update && sudo apt upgrade -y

# Node.js 20 telepítés (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 process manager telepítés (globálisan)
sudo npm install -g pm2

# Git telepítés
sudo apt install git -y

# Nginx telepítés (reverse proxy-hoz)
sudo apt install nginx -y

# SSL certificatehez
sudo apt install certbot python3-certbot-nginx -y
```

## 2. Projekt Feltöltés VPS-re

### Opció A: Git Clone (AJÁNLOTT)
```bash
# SSH kapcsolódás a VPS-hez
ssh root@your-vps-ip

# Projekt mappa létrehozás
mkdir -p /var/www/codexa
cd /var/www/codexa

# Ha nincs még Git repo, akkor először hozd létre:
# git init
# git add .
# git commit -m "Initial commit"
# git remote add origin https://github.com/yourusername/codexa-web.git
# git push -u origin main

# Projekt klónozás
git clone https://github.com/yourusername/codexa-web.git .

# Vagy ha már van a kód a gépen, akkor SCP-vel:
# scp -r C:\Users\zsomi\Desktop\codexaweb root@your-vps-ip:/var/www/codexa
```

### Opció B: SCP/SFTP feltöltés
```bash
# Windows-ról PowerShell-ben:
scp -r "C:\Users\zsomi\Desktop\codexaweb\*" root@your-vps-ip:/var/www/codexa/

# Vagy WinSCP/FileZilla használata
```

## 3. Projekt Konfiguráció VPS-en

```bash
# Navigálás a projekt mappába
cd /var/www/codexa

# Dependencies telepítése
npm install

# Environment fájl létrehozása
nano .env.local
```

### .env.local tartalma:
```bash
# Mailcow SMTP konfiguráció
SMTP_HOST=mail.codexa.hu
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=info@codexa.hu
EMAIL_PASS=VALÓDI_JELSZÓ_IDE
SMTP_REJECT_UNAUTHORIZED=false
```

```bash
# Production build
npm run build

# Tesztelés
npm run test:smtp
```

## 4. PM2 Process Manager Beállítás

```bash
# PM2 config fájl létrehozása
nano ecosystem.config.js
```

### ecosystem.config.js tartalma:
```javascript
module.exports = {
  apps: [{
    name: 'codexa-web',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/codexa',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

```bash
# PM2 indítás
pm2 start ecosystem.config.js

# Automatikus indítás boot-kor
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
pm2 save

# PM2 státusz ellenőrzés
pm2 status
pm2 logs codexa-web
```

## 5. Nginx Reverse Proxy Beállítás

```bash
# Nginx config létrehozás
sudo nano /etc/nginx/sites-available/codexa.hu
```

### Nginx konfiguráció:
```nginx
server {
    listen 80;
    server_name codexa.hu www.codexa.hu;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Site engedélyezés
sudo ln -s /etc/nginx/sites-available/codexa.hu /etc/nginx/sites-enabled/

# Default site eltávolítás (opcionális)
sudo rm /etc/nginx/sites-enabled/default

# Nginx konfiguráció teszt
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx
```

## 6. SSL Certificate (Let's Encrypt)

```bash
# SSL certificate kérés
sudo certbot --nginx -d codexa.hu -d www.codexa.hu

# Automatikus megújítás teszt
sudo certbot renew --dry-run
```

## 7. Tűzfal Beállítás

```bash
# UFW tűzfal engedélyezés
sudo ufw enable

# Szükséges portok megnyitása
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Státusz ellenőrzés
sudo ufw status
```

## 8. Monitoring és Karbantartás

### PM2 monitoring:
```bash
# Valós idejű monitoring
pm2 monit

# Logs ellenőrzés
pm2 logs codexa-web --lines 50

# Restart ha kell
pm2 restart codexa-web

# Memory info
pm2 show codexa-web
```

### Rendszer monitoring:
```bash
# Disk space
df -h

# Memory usage
free -m

# CPU load
top

# Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

## 9. Automatikus Deployment Script

```bash
# Deploy script létrehozás
nano deploy.sh
```

### deploy.sh tartalma:
```bash
#!/bin/bash
cd /var/www/codexa

echo "🔄 Pulling latest changes..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building project..."
npm run build

echo "🔄 Restarting PM2..."
pm2 restart codexa-web

echo "✅ Deployment complete!"
```

```bash
# Script futtathatóvá tétel
chmod +x deploy.sh

# Deployment futtatás
./deploy.sh
```

## 10. Backup Script

```bash
# Backup script
nano backup.sh
```

### backup.sh tartalma:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/codexa"

mkdir -p $BACKUP_DIR

# Project backup
tar -czf $BACKUP_DIR/codexa_$DATE.tar.gz /var/www/codexa

# Keep only last 7 backups
find $BACKUP_DIR -name "codexa_*.tar.gz" -mtime +7 -delete

echo "✅ Backup created: codexa_$DATE.tar.gz"
```

```bash
chmod +x backup.sh

# Crontab beállítás (napi backup)
crontab -e
# Add line: 0 2 * * * /var/www/codexa/backup.sh
```

## 11. Troubleshooting

### Gyakori problémák:
```bash
# Port foglalt
sudo lsof -i :3000

# PM2 problémák
pm2 kill
pm2 start ecosystem.config.js

# Nginx problémák
sudo nginx -t
sudo systemctl status nginx

# SSL problémák
sudo certbot certificates
sudo certbot renew

# Permissions
sudo chown -R $USER:$USER /var/www/codexa
```

## 12. Performance Optimalizálás

```bash
# Node.js memory limit növelés
# ecosystem.config.js-ben:
max_memory_restart: '2G'

# Nginx gzip engedélyezés
sudo nano /etc/nginx/nginx.conf
# gzip on; hozzáadás
```

## Teljes deployment checklist:

- [ ] VPS alapbeállítások (Node.js, PM2, Nginx)
- [ ] Projekt feltöltés és build
- [ ] Environment variables beállítás
- [ ] PM2 konfigurálás és indítás
- [ ] Nginx reverse proxy
- [ ] SSL certificate
- [ ] Tűzfal konfiguráció
- [ ] SMTP teszt élesben
- [ ] Domain DNS beállítás
- [ ] Monitoring beállítás
- [ ] Backup script

**Teljes telepítési idő: ~30-45 perc**

## DNS Beállítások:
```
A Record: codexa.hu → VPS-IP
CNAME: www.codexa.hu → codexa.hu
```
