# 🚀 Codexa Deployment Rendszer

## 📁 Deployment Fájlok

### **🔧 Egyszerű Deployment:**
- `deploy.sh` - Alapvető deployment script
- `ecosystem.config.js` - PM2 konfiguráció

### **⚡ Haladó Deployment:**
- `deploy-advanced.sh` - Teljes funkciójú deployment rendszer
- `nginx-codexa.conf` - Optimalizált Nginx konfiguráció

## 🎯 **Gyors Parancsok**

### NPM Scripts:
```bash
# Egyszerű deployment
npm run deploy:simple

# Haladó deployment (ajánlott)
npm run deploy

# Státusz ellenőrzés
npm run deploy:status

# Logok megtekintése
npm run deploy:logs

# Rollback
npm run deploy:rollback
```

### Közvetlen Scripts:
```bash
# Normál deployment
./deploy-advanced.sh

# Rollback
./deploy-advanced.sh rollback

# Rendszer státusz
./deploy-advanced.sh status

# Logok
./deploy-advanced.sh logs
```

## 🔄 **Git Workflow**

### 1. Fejlesztés Windows-on:
```bash
# Módosítások
git add .
git commit -m "Feature: új funkció hozzáadása"
git push origin master
```

### 2. VPS-en deployment:
```bash
# Automatikus deployment
./deploy-advanced.sh
```

## ⚙️ **Főbb Funkciók**

### **🔍 Automatikus Ellenőrzések:**
- Git változások detektálása
- Előfeltételek ellenőrzése (Git, NPM, PM2)
- SMTP konfiguráció teszt
- HTTP health check
- Nginx konfiguráció validálás

### **💾 Backup & Rollback:**
- Automatikus backup minden deployment előtt
- Egyszerű rollback lehetőség
- Deployment history nyomon követés

### **📊 Monitoring:**
- PM2 process monitoring
- HTTP response check
- Disk space monitoring
- Real-time logok

### **🛡️ Biztonság:**
- Git stash helyi változásokhoz
- Rollback lehetőség hibás deployment esetén
- Backup rendszer

## 📋 **VPS Beállítás Checklist**

### Első telepítés:
- [ ] Node.js 20+ telepítve
- [ ] PM2 globálisan telepítve
- [ ] Nginx telepítve és konfigurálva
- [ ] SSL certificate (Let's Encrypt)
- [ ] UFW tűzfal beállítva
- [ ] Git repository klónozva
- [ ] Environment variables beállítva
- [ ] PM2 autostart engedélyezve

### Deployment előtt:
- [ ] `.env.local` fájl helyes értékekkel
- [ ] SMTP konfiguráció tesztelve
- [ ] Domain DNS beállítások OK
- [ ] Backup könyvtár létezik

## 🎭 **Deployment Típusok**

### **Simple Deployment (`deploy.sh`):**
- Alapvető funkcionalitás
- Git pull + build + restart
- Minimális ellenőrzések

### **Advanced Deployment (`deploy-advanced.sh`):**
- Teljes körű ellenőrzések
- Automatikus backup
- Health check
- Rollback funkció
- Részletes logging
- Színes terminal output

## 🔧 **Troubleshooting**

### Gyakori problémák:
```bash
# Permission denied
chmod +x deploy-advanced.sh

# PM2 process nem fut
pm2 start ecosystem.config.js

# Nginx hiba
sudo nginx -t
sudo systemctl restart nginx

# Git merge conflict
git stash
git pull origin master
git stash pop

# Node modules hiba
rm -rf node_modules
npm install
```

### Log ellenőrzés:
```bash
# PM2 logok
pm2 logs codexa-web

# Nginx logok
sudo tail -f /var/log/nginx/access.log

# Deployment history
cat /var/backups/codexa/deployment.log
```

## 📈 **Performance Tips**

### **Build optimalizálás:**
- `npm ci` használata `npm install` helyett
- `--production` flag dependencies-hez
- Next.js turbopack build

### **PM2 optimalizálás:**
- Memory restart limit beállítás
- Process monitoring
- Automated restart

### **Nginx optimalizálás:**
- Gzip compression
- Static file caching
- Security headers

## 🌍 **Production URLs**

- **Weboldal:** https://codexa.hu
- **Git Repository:** https://github.com/Zsomi/Codexa-Web
- **PM2 Monitoring:** `pm2 monit`

---

**🎯 A deployment rendszer használatra kész!**
**Minden szükséges funkció implementálva és tesztelve.**
