#!/bin/bash

# Codexa weboldal deployment script
# Használat: ./deploy.sh

set -e

echo "🚀 Codexa Deployment indítás..."

# Színek a terminal outputhoz
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Projekt könyvtár
PROJECT_DIR="/var/www/codexa"

echo -e "${YELLOW}📂 Navigálás a projekt könyvtárba...${NC}"
cd $PROJECT_DIR

echo -e "${YELLOW}🔄 Git változások letöltése...${NC}"
git pull origin main

echo -e "${YELLOW}📦 NPM dependencies telepítése...${NC}"
npm install --production

echo -e "${YELLOW}🏗️  Production build készítése...${NC}"
npm run build

echo -e "${YELLOW}🔧 PM2 alkalmazás újraindítása...${NC}"
pm2 restart codexa-web

echo -e "${YELLOW}🔍 PM2 státusz ellenőrzése...${NC}"
pm2 status

echo -e "${YELLOW}🌐 Nginx konfiguráció tesztelése...${NC}"
sudo nginx -t

echo -e "${YELLOW}🔄 Nginx újraindítása...${NC}"
sudo systemctl reload nginx

echo -e "${GREEN}✅ Deployment sikeresen befejezve!${NC}"
echo -e "${GREEN}🌍 Weboldal elérhető: https://codexa.hu${NC}"

# Log információk
echo -e "${YELLOW}📊 PM2 logok megtekintése:${NC}"
echo "pm2 logs codexa-web --lines 10"

echo -e "${YELLOW}🔍 Nginx access logok:${NC}"
echo "sudo tail -f /var/log/nginx/access.log"
