# 🐧 Ubuntu VPS Setup - Codexa Weboldal

## 📋 Teljes Ubuntu VPS Telepítési Útmutató

### 🎯 **Mit fogunk elérni:**
- Ubuntu 22.04 LTS VPS teljes beállítása
- Node.js, PM2, Nginx telepítése és konfigurálása
- SSL certificate (Let's Encrypt)
- Biztonságos tűzfal beállítás
- Automated deployment rendszer
- Monitoring és backup

---

## 1. 🔐 Alapvető Biztonság és Beállítások

### **Első SSH kapcsolódás:**
```bash
# SSH kapcsolódás root felhasználóval
ssh root@YOUR_VPS_IP

# Rendszer frissítés
apt update && apt upgrade -y
```

### **Új sudo felhasználó létrehozása:**
```bash
# Új felhasználó hozzáadása
adduser codexa

# Sudo jogosultság
usermod -aG sudo codexa

# SSH key másolás új felhasználóhoz (opcionális)
mkdir -p /home/codexa/.ssh
cp ~/.ssh/authorized_keys /home/codexa/.ssh/
chown -R codexa:codexa /home/codexa/.ssh
chmod 700 /home/codexa/.ssh
chmod 600 /home/codexa/.ssh/authorized_keys
```

### **SSH biztonság növelése:**
```bash
# SSH konfiguráció szerkesztése
nano /etc/ssh/sshd_config
```

**Változtatandó beállítások:**
```bash
# Port módosítása (opcionális, default: 22)
Port 2222

# Root login tiltása
PermitRootLogin no

# Password authentication tiltása (csak SSH key)
PasswordAuthentication no

# Csak a codexa user engedélyezése
AllowUsers codexa
```

```bash
# SSH szolgáltatás újraindítása
systemctl restart ssh

# Új terminálban tesztelés (NE ZÁRD BE az aktuális kapcsolatot!)
ssh codexa@YOUR_VPS_IP -p 2222
```

---

## 2. 🔥 UFW Tűzfal Beállítása

```bash
# UFW telepítése (ha nincs telepítve)
sudo apt install ufw -y

# Alapértelmezett szabályok
sudo ufw default deny incoming
sudo ufw default allow outgoing

# SSH engedélyezése (saját port!)
sudo ufw allow 2222/tcp

# HTTP és HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Tűzfal aktiválása
sudo ufw enable

# Státusz ellenőrzés
sudo ufw status verbose
```

---

## 3. 📦 Alapvető Szoftverek Telepítése

### **Alapvető csomagok:**
```bash
sudo apt update
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

### **Build tools:**
```bash
sudo apt install -y build-essential
```

---

## 4. 🟢 Node.js 20 LTS Telepítése

```bash
# NodeSource repository hozzáadása
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js telepítése
sudo apt-get install -y nodejs

# Verzió ellenőrzés
node --version
npm --version

# Npm globális könyvtár beállítása (opcionális)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## 5. ⚡ PM2 Process Manager Telepítése

```bash
# PM2 globális telepítése
sudo npm install -g pm2

# PM2 verzió ellenőrzés
pm2 --version

# PM2 autostart beállítása
pm2 startup

# A kiírt parancsot futtasd (sudo env PATH=... kezdetű)
# Példa (ez az SAJÁT parancsod lesz!):
# sudo env PATH=$PATH:/usr/bin /home/codexa/.npm-global/lib/node_modules/pm2/bin/pm2 startup systemd -u codexa --hp /home/codexa
```

---

## 6. 🌐 Nginx Web Server Telepítése

```bash
# Nginx telepítése
sudo apt install nginx -y

# Nginx szolgáltatások
sudo systemctl start nginx
sudo systemctl enable nginx

# Nginx státusz ellenőrzés
sudo systemctl status nginx

# UFW-ben Nginx engedélyezése
sudo ufw allow 'Nginx Full'
```

### **Alapértelmezett oldal eltávolítása:**
```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

## 7. 🔒 SSL Certificate (Let's Encrypt)

```bash
# Certbot telepítése
sudo apt install certbot python3-certbot-nginx -y

# SSL certificate kérése (CSERÉLD KI A DOMAIN-T!)
sudo certbot --nginx -d codexa.hu -d www.codexa.hu

# Automatikus megújítás tesztelése
sudo certbot renew --dry-run

# Crontab beállítása automatikus megújításhoz
sudo crontab -e
# Add hozzá ezt a sort:
# 0 2 * * * /usr/bin/certbot renew --quiet
```

---

## 8. 📁 Projekt Könyvtár Létrehozása

```bash
# Weboldal könyvtár létrehozása
sudo mkdir -p /var/www/codexa

# Tulajdonos beállítása
sudo chown -R codexa:codexa /var/www/codexa

# Navigálás a projekt könyvtárba
cd /var/www/codexa
```

---

## 9. 📥 Git Repository Klónozása

```bash
# SSH key generálása (ha nincs)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Publikus kulcs megjelenítése (add hozzá GitHub-hoz)
cat ~/.ssh/id_rsa.pub

# Repository klónozása
git clone https://github.com/Zsomi/Codexa-Web.git .

# Vagy HTTPS-sel:
# git clone https://github.com/Zsomi/Codexa-Web.git .
```

---

## 10. ⚙️ Környezeti Változók Beállítása

```bash
# .env.local fájl létrehozása
nano .env.local
```

**Tartalma:**
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
# Fájl jogosultságok beállítása
chmod 600 .env.local
```

---

## 11. 📦 Projekt Dependencies és Build

```bash
# Dependencies telepítése
npm install

# Production build
npm run build

# SMTP teszt
npm run test:smtp
```

---

## 12. 🔧 PM2 Alkalmazás Beállítása

```bash
# PM2 indítása az ecosystem config-gal
pm2 start ecosystem.config.js

# PM2 mentése
pm2 save

# PM2 státusz ellenőrzés
pm2 status
pm2 logs codexa-web
```

---

## 13. 🌐 Nginx Konfiguráció

```bash
# Nginx site konfiguráció létrehozása
sudo nano /etc/nginx/sites-available/codexa.hu
```

**Nginx konfiguráció másolása:**
```bash
# A nginx-codexa.conf fájl tartalmát másold ide
sudo cp /var/www/codexa/nginx-codexa.conf /etc/nginx/sites-available/codexa.hu

# Site engedélyezése
sudo ln -s /etc/nginx/sites-available/codexa.hu /etc/nginx/sites-enabled/

# Nginx konfiguráció tesztelése
sudo nginx -t

# Nginx újraindítása
sudo systemctl restart nginx
```

---

## 14. 🌍 Domain és DNS Beállítások

### **DNS Records beállítása domain szolgáltatónál:**
```bash
# A Record
codexa.hu → YOUR_VPS_IP

# CNAME Record  
www.codexa.hu → codexa.hu

# MX Record (email-hez, ha van)
codexa.hu → mail.codexa.hu (priority: 10)
```

### **DNS propagáció ellenőrzése:**
```bash
# Helyi ellenőrzés
dig codexa.hu
nslookup codexa.hu

# Online tools:
# https://dnschecker.org/
# https://whatsmydns.net/
```

---

## 15. 📧 Email (SMTP) Beállítások

### **Mailcow konfiguráció:**
```bash
# Mailcow admin panel: https://mail.codexa.hu/admin
# 1. Lépj be admin felületére
# 2. Mailboxes → info@codexa.hu
# 3. App Passwords → Új jelszó generálása
# 4. Másold be a jelszót a .env.local fájlba

# .env.local frissítése
nano /var/www/codexa/.env.local
```

### **SMTP teszt:**
```bash
cd /var/www/codexa
npm run test:smtp
```

---

## 16. 📊 Monitoring és Backup Beállítása

### **Backup script engedélyezése:**
```bash
# Backup könyvtár létrehozása
sudo mkdir -p /var/backups/codexa
sudo chown -R codexa:codexa /var/backups/codexa

# Deploy scriptek futtathatóvá tétele
chmod +x /var/www/codexa/deploy.sh
chmod +x /var/www/codexa/deploy-advanced.sh
```

### **Monitoring scriptek:**
```bash
# System monitoring script létrehozása
sudo nano /usr/local/bin/codexa-monitor.sh
```

**Monitor script tartalma:**
```bash
#!/bin/bash
# Codexa monitoring script

echo "=== Codexa System Monitor ===" 
echo "Date: $(date)"
echo ""

echo "🔧 PM2 Status:"
pm2 status

echo ""
echo "💾 Disk Usage:"
df -h /var/www/codexa

echo ""
echo "🌐 Nginx Status:"
sudo systemctl status nginx --no-pager -l

echo ""
echo "📊 Last 5 deployments:"
if [ -f "/var/backups/codexa/deployment.log" ]; then
    tail -5 /var/backups/codexa/deployment.log
else
    echo "No deployment log found"
fi

echo ""
echo "🔒 SSL Certificate:"
sudo certbot certificates | grep codexa.hu || echo "No SSL certificate found"
```

```bash
# Script futtathatóvá tétele
sudo chmod +x /usr/local/bin/codexa-monitor.sh

# Teszt futtatás
sudo /usr/local/bin/codexa-monitor.sh
```

---

## 17. 🚀 Első Deployment Teszt

```bash
cd /var/www/codexa

# Deployment teszt
./deploy-advanced.sh

# Weboldal ellenőrzése
curl -I https://codexa.hu

# PM2 monitoring
pm2 monit
```

---

## 18. 🔧 Rendszer Optimalizálás

### **Swap file létrehozása (ha kevés a RAM):**
```bash
# 2GB swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Permanens swap
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### **Node.js memória optimalizálás:**
```bash
# .bashrc-hez hozzáadás
echo 'export NODE_OPTIONS="--max-old-space-size=1024"' >> ~/.bashrc
source ~/.bashrc
```

---

## 19. 🛡️ Biztonsági Kiegészítések

### **Fail2ban telepítése (brute force védelem):**
```bash
# Fail2ban telepítése
sudo apt install fail2ban -y

# Fail2ban konfiguráció
sudo nano /etc/fail2ban/local.conf
```

**Fail2ban konfiguráció:**
```ini
[DEFAULT]
bantime = 10m
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = 2222
logpath = /var/log/auth.log
```

```bash
# Fail2ban indítása
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### **Automatic security updates:**
```bash
# Unattended upgrades telepítése
sudo apt install unattended-upgrades -y

# Automatic updates engedélyezése
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## 20. 📋 Final Checklist

### **✅ Ellenőrző lista:**
- [ ] SSH biztonság konfigurálva (port, kulcsok)
- [ ] UFW tűzfal aktív és konfigurált
- [ ] Node.js 20 telepítve
- [ ] PM2 telepítve és autostart beállítva
- [ ] Nginx telepítve és futó
- [ ] SSL certificate aktív (Let's Encrypt)
- [ ] Git repository klónozva
- [ ] Environment variables beállítva (.env.local)
- [ ] Projekt dependencies telepítve
- [ ] Production build sikeres
- [ ] PM2 alkalmazás fut
- [ ] Nginx site konfiguráció aktív
- [ ] Domain DNS beállítások OK
- [ ] SMTP konfiguráció működik
- [ ] Deployment scriptek futtathatók
- [ ] Backup rendszer működik
- [ ] Monitoring tools beállítva

### **🧪 Tesztelendő funkciók:**
```bash
# 1. Weboldal elérhető
curl -I https://codexa.hu

# 2. PM2 status
pm2 status

# 3. SMTP teszt
npm run test:smtp

# 4. Deployment teszt
./deploy-advanced.sh

# 5. SSL ellenőrzés
openssl s_client -connect codexa.hu:443 -servername codexa.hu
```

---

## 🎯 **Gyakori Parancsok Összefoglaló**

### **Napi használat:**
```bash
# Deployment
./deploy-advanced.sh

# Status ellenőrzés
./deploy-advanced.sh status

# Logok
./deploy-advanced.sh logs

# PM2 monitoring
pm2 monit

# Nginx logok
sudo tail -f /var/log/nginx/access.log
```

### **Troubleshooting:**
```bash
# PM2 problémák
pm2 restart codexa-web
pm2 logs codexa-web

# Nginx problémák
sudo nginx -t
sudo systemctl restart nginx

# SSL problémák
sudo certbot certificates
sudo certbot renew

# Rendszer resources
htop
df -h
free -m
```

---

## 🎉 **Gratulálok!**

**Ubuntu VPS sikeresen beállítva a Codexa weboldalhoz!**

### **📊 Mit értél el:**
- ✅ Biztonságos Ubuntu szerver
- ✅ Modern Node.js környezet
- ✅ Automated deployment rendszer
- ✅ SSL biztonság
- ✅ Professional monitoring
- ✅ Backup és rollback rendszer

### **🚀 Következő lépések:**
1. Domain DNS beállítás
2. Mailcow SMTP jelszó beállítás
3. Első deployment futtatás
4. Rendszeres backup schedule beállítás

**Az oldal production-ready és skálázható! 🏆**
