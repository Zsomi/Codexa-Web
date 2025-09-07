#!/bin/bash

# Codexa weboldal deployment script
# Használat: ./deploy.sh [rollback]

set -e

echo "🚀 Codexa Deployment indítás..."

# Színek a terminal outputhoz
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Projekt könyvtár
PROJECT_DIR="/var/www/codexa"
BACKUP_DIR="/var/backups/codexa"
DATE=$(date +%Y%m%d_%H%M%S)

# Rollback funkció
if [ "$1" = "rollback" ]; then
    echo -e "${YELLOW}� Rollback művelet...${NC}"
    cd $PROJECT_DIR
    git log --oneline -10
    echo -e "${BLUE}Add meg a commit hash-t a rollback-hez:${NC}"
    read -p "Commit hash: " COMMIT_HASH
    git reset --hard $COMMIT_HASH
    npm run build
    pm2 restart codexa-web
    echo -e "${GREEN}✅ Rollback befejezve!${NC}"
    exit 0
fi

echo -e "${YELLOW}�📂 Navigálás a projekt könyvtárba...${NC}"
cd $PROJECT_DIR

# Backup készítése
echo -e "${YELLOW}💾 Backup készítése...${NC}"
mkdir -p $BACKUP_DIR
git rev-parse HEAD > $BACKUP_DIR/last_commit_$DATE.txt

# Git változások ellenőrzése
echo -e "${YELLOW}🔍 Git státusz ellenőrzése...${NC}"
git fetch origin master

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/master)

if [ $LOCAL = $REMOTE ]; then
    echo -e "${BLUE}ℹ️  Nincs új változás. Deployment kihagyva.${NC}"
    exit 0
fi

echo -e "${YELLOW}🔄 Git változások letöltése...${NC}"
git pull origin master

echo -e "${YELLOW}📦 NPM dependencies telepítése...${NC}"
npm ci --production

echo -e "${YELLOW}🏗️  Production build készítése...${NC}"
npm run build

echo -e "${YELLOW}🧪 SMTP konfiguráció tesztelése...${NC}"
npm run test:smtp || echo -e "${RED}⚠️  SMTP teszt sikertelen${NC}"

echo -e "${YELLOW}🔧 PM2 alkalmazás újraindítása...${NC}"
pm2 restart codexa-web

echo -e "${YELLOW}🔍 PM2 státusz ellenőrzése...${NC}"
pm2 status

echo -e "${YELLOW}🌐 Nginx konfiguráció tesztelése...${NC}"
sudo nginx -t

echo -e "${YELLOW}🔄 Nginx újraindítása...${NC}"
sudo systemctl reload nginx

# Deployment ellenőrzés
echo -e "${YELLOW}✅ Deployment ellenőrzés...${NC}"
sleep 5
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://codexa.hu || echo "000")

if [ $HTTP_STATUS -eq 200 ]; then
    echo -e "${GREEN}✅ Weboldal elérhető (HTTP $HTTP_STATUS)${NC}"
else
    echo -e "${RED}❌ Weboldal nem elérhető (HTTP $HTTP_STATUS)${NC}"
fi

# Deployment log
CURRENT_COMMIT=$(git rev-parse HEAD)
echo "$(date): Deployed commit $CURRENT_COMMIT" >> $BACKUP_DIR/deployment.log

echo -e "${GREEN}✅ Deployment sikeresen befejezve!${NC}"
echo -e "${GREEN}🌍 Weboldal elérhető: https://codexa.hu${NC}"

# Log információk
echo -e "${YELLOW}📊 Hasznos parancsok:${NC}"
echo "pm2 logs codexa-web --lines 10    # PM2 logok"
echo "sudo tail -f /var/log/nginx/access.log    # Nginx logok"
echo "./deploy.sh rollback    # Rollback az előző verzióra"
