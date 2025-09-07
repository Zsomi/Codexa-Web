# 🔧 VPS Troubleshooting Guide - Codexa

## 🚨 Gyakori Problémák és Megoldások

### 📋 **Gyors Diagnosztika**

```bash
# Teljes rendszer ellenőrzés (futtatd ezt először!)
./deploy-advanced.sh status

# Vagy manuálisan:
pm2 status                    # PM2 alkalmazás fut-e
sudo systemctl status nginx   # Nginx fut-e
sudo ufw status               # Tűzfal beállítások
df -h                         # Disk space
free -m                       # Memória használat
```

---

## 🔥 **Deployment Problémák**

### **❌ "Permission denied" hiba:**
```bash
# Scripts futtathatóvá tétele
chmod +x deploy.sh
chmod +x deploy-advanced.sh

# Projekt könyvtár tulajdonos ellenőrzés
sudo chown -R codexa:codexa /var/www/codexa
```

### **❌ Git pull sikertelen:**
```bash
# Git status ellenőrzés
cd /var/www/codexa
git status

# Helyi változások mentése
git stash

# Git pull újra
git pull origin master

# Stash visszaállítás (ha kell)
git stash pop
```

### **❌ NPM install hibák:**
```bash
# Node modules tisztítás
rm -rf node_modules
rm package-lock.json

# Újra telepítés
npm install

# Ha még mindig hiba van:
npm cache clean --force
npm install
```

### **❌ Build hibák:**
```bash
# Environment variables ellenőrzés
cat .env.local

# Build clean
rm -rf .next
npm run build

# Ha memory hiba:
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

---

## 🔧 **PM2 Problémák**

### **❌ PM2 process nem indul:**
```bash
# PM2 processes ellenőrzés
pm2 list

# Ha nincs process:
pm2 start ecosystem.config.js

# Ha van, de crashed:
pm2 restart codexa-web

# Részletes hiba info:
pm2 describe codexa-web
pm2 logs codexa-web --lines 50
```

### **❌ PM2 autostart nem működik:**
```bash
# PM2 startup újra beállítása
pm2 unstartup
pm2 startup

# A kiírt parancs futtatása (sudo env PATH=...)
pm2 save
```

### **❌ PM2 memory leak:**
```bash
# Memory használat ellenőrzés
pm2 monit

# Restart ha túl sok memoryt használ
pm2 restart codexa-web

# Ecosystem config memory limit növelés
nano ecosystem.config.js
# max_memory_restart: '2G'
```

---

## 🌐 **Nginx Problémák**

### **❌ "502 Bad Gateway" hiba:**
```bash
# PM2 alkalmazás fut-e?
pm2 status

# Ha nem fut:
pm2 start ecosystem.config.js

# Nginx konfiguráció teszt:
sudo nginx -t

# Nginx restart:
sudo systemctl restart nginx

# Nginx hibalogok:
sudo tail -f /var/log/nginx/error.log
```

### **❌ Nginx konfiguráció hibák:**
```bash
# Konfiguráció szintaxis ellenőrzés
sudo nginx -t

# Site konfiguráció ellenőrzés
sudo nano /etc/nginx/sites-available/codexa.hu

# Symlink ellenőrzés
ls -la /etc/nginx/sites-enabled/

# Ha nincs symlink:
sudo ln -s /etc/nginx/sites-available/codexa.hu /etc/nginx/sites-enabled/
```

### **❌ Static fájlok nem töltődnek:**
```bash
# Next.js build ellenőrzés
ls -la /var/www/codexa/.next/static/

# Nginx static fájl konfiguráció:
sudo nano /etc/nginx/sites-available/codexa.hu

# Nginx reload:
sudo systemctl reload nginx
```

---

## 🔒 **SSL/HTTPS Problémák**

### **❌ SSL certificate expired:**
```bash
# Certificate státusz
sudo certbot certificates

# Manuális megújítás
sudo certbot renew

# Specific domain megújítás
sudo certbot renew --cert-name codexa.hu

# Nginx restart SSL után
sudo systemctl restart nginx
```

### **❌ "Not secure" warning:**
```bash
# SSL konfiguráció ellenőrzés
openssl s_client -connect codexa.hu:443 -servername codexa.hu

# Nginx SSL konfiguráció:
sudo nano /etc/nginx/sites-available/codexa.hu

# SSL test online:
# https://www.ssllabs.com/ssltest/
```

---

## 🔥 **Tűzfal Problémák**

### **❌ Weboldal nem elérhető:**
```bash
# UFW státusz
sudo ufw status

# HTTP/HTTPS portok engedélyezése
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# SSH port ellenőrzés (saját port!)
sudo ufw allow 2222/tcp

# UFW reload
sudo ufw reload
```

### **❌ SSH kapcsolat megszakad:**
```bash
# SSH konfiguráció ellenőrzés
sudo nano /etc/ssh/sshd_config

# Port ellenőrzés
# AllowUsers ellenőrzés

# SSH restart
sudo systemctl restart ssh

# UFW SSH port engedély
sudo ufw allow 2222/tcp
```

---

## 📧 **Email/SMTP Problémák**

### **❌ SMTP teszt sikertelen:**
```bash
# Environment variables ellenőrzés
cat .env.local | grep -E "SMTP|EMAIL"

# SMTP teszt részletesen
npm run test:smtp

# Mailcow kapcsolat teszt
telnet mail.codexa.hu 587

# DNS ellenőrzés
nslookup mail.codexa.hu
```

### **❌ Email nem érkezik meg:**
```bash
# SMTP logs ellenőrzés
pm2 logs codexa-web | grep -i smtp

# Mailcow admin panel ellenőrzés
# https://mail.codexa.hu/admin

# Email queue ellenőrzés a Mailcow-ban
```

---

## 💾 **Disk Space Problémák**

### **❌ "No space left on device":**
```bash
# Disk használat ellenőrzés
df -h

# Legnagyobb fájlok keresése
du -h /var/www/codexa | sort -hr | head -20

# Node modules tisztítás
cd /var/www/codexa
rm -rf node_modules
npm install

# Log fájlok tisztítás
sudo journalctl --vacuum-time=7d

# PM2 logs rotálás
pm2 flush
```

### **❌ Backup könyvtár túl nagy:**
```bash
# Backup fájlok ellenőrzés
ls -la /var/backups/codexa/

# Régi backupok törlése (>30 napnál régebbi)
find /var/backups/codexa/ -name "*.txt" -mtime +30 -delete
```

---

## 🔧 **Performance Problémák**

### **❌ Weboldal lassú:**
```bash
# System resources
htop
iotop

# PM2 monitoring
pm2 monit

# Nginx access logok
sudo tail -f /var/log/nginx/access.log

# Response time teszt
curl -w "@curl-format.txt" -o /dev/null -s https://codexa.hu
```

### **❌ Memory problémák:**
```bash
# Memory használat
free -m

# PM2 memory restart
pm2 restart codexa-web

# Swap ellenőrzés
swapon --show

# Ha nincs swap:
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## 🌍 **Domain/DNS Problémák**

### **❌ Domain nem mutat a szerverre:**
```bash
# DNS propagáció ellenőrzés
dig codexa.hu
nslookup codexa.hu

# Online DNS check:
# https://dnschecker.org/
# https://whatsmydns.net/

# Local DNS cache flush (ha local gépről tesztelsz)
# Windows: ipconfig /flushdns
# Linux: sudo systemctl restart systemd-resolved
```

### **❌ Subdomain problémák:**
```bash
# WWW redirect ellenőrzés
curl -I www.codexa.hu

# Nginx konfiguráció ellenőrzés
grep -n "server_name" /etc/nginx/sites-available/codexa.hu
```

---

## 🔄 **Git Problémák**

### **❌ Git pull merge conflict:**
```bash
cd /var/www/codexa

# Helyi változások mentése
git stash

# Pull újra
git pull origin master

# Ha még mindig conflict:
git reset --hard origin/master

# VIGYÁZAT: Ez törli a helyi változásokat!
```

### **❌ Git authentication problems:**
```bash
# SSH key ellenőrzés
ssh-add -l

# GitHub connection teszt
ssh -T git@github.com

# HTTPS authentication (ha SSH nem működik)
git remote set-url origin https://github.com/Zsomi/Codexa-Web.git
```

---

## 🆘 **Emergency Recovery**

### **🚨 Teljes szolgáltatás újraindítás:**
```bash
# 1. PM2 restart
pm2 restart all

# 2. Nginx restart
sudo systemctl restart nginx

# 3. Network restart (csak végszükségben!)
# sudo systemctl restart networking
```

### **🚨 Rollback az előző működő verzióra:**
```bash
cd /var/www/codexa

# Rollback script használata
./deploy-advanced.sh rollback

# Vagy manuálisan:
git log --oneline -10
git reset --hard WORKING_COMMIT_HASH
npm ci --production
npm run build
pm2 restart codexa-web
```

### **🚨 Teljes projekt újratelepítés:**
```bash
# Backup jelenlegi .env.local
cp /var/www/codexa/.env.local ~/env.backup

# Projekt könyvtár tisztítás
sudo rm -rf /var/www/codexa/*

# Git clone újra
cd /var/www/codexa
git clone https://github.com/Zsomi/Codexa-Web.git .

# Environment visszaállítás
cp ~/env.backup .env.local

# Teljes setup
npm install
npm run build
pm2 start ecosystem.config.js
```

---

## 📊 **Monitoring Commands**

### **Napi ellenőrző parancsok:**
```bash
# Gyors státusz
./deploy-advanced.sh status

# PM2 monitoring
pm2 monit

# System resources
htop

# Disk space
df -h

# Recent logs
pm2 logs codexa-web --lines 20
sudo tail -20 /var/log/nginx/access.log
```

### **Weekly maintenance:**
```bash
# System update
sudo apt update && sudo apt upgrade

# PM2 logs clean
pm2 flush

# Old backup cleanup
find /var/backups/codexa/ -mtime +30 -delete

# SSL certificate check
sudo certbot certificates
```

---

## 📞 **Segítség Kérése**

### **Log információk gyűjtése:**
```bash
# System info
uname -a
lsb_release -a

# Service status
systemctl status nginx pm2-codexa

# Error logs
sudo journalctl -u nginx --since "1 hour ago"
pm2 logs codexa-web --lines 50 --err

# Network info
ss -tulpn | grep -E ":80|:443|:3000"
```

### **Debug információk script:**
```bash
#!/bin/bash
# Debug info script
echo "=== CODEXA DEBUG INFO ==="
echo "Date: $(date)"
echo ""
echo "System:"
uname -a
echo ""
echo "PM2 Status:"
pm2 status
echo ""
echo "Nginx Status:"
sudo systemctl status nginx --no-pager
echo ""
echo "Disk Space:"
df -h
echo ""
echo "Memory:"
free -m
echo ""
echo "Last 10 deployment logs:"
tail -10 /var/backups/codexa/deployment.log 2>/dev/null || echo "No deployment log"
```

---

## ✅ **Preventív Karbantartás**

### **Hetente egyszer:**
- [ ] `sudo apt update && sudo apt upgrade`
- [ ] `pm2 logs` ellenőrzés
- [ ] Disk space ellenőrzés
- [ ] SSL certificate lejárat ellenőrzés

### **Havonta egyszer:**
- [ ] Backup tesztelés
- [ ] Security audit
- [ ] Performance review
- [ ] Log archíválás

**A rendszeres karbantartással elkerülhető a legtöbb probléma! 🔧**
