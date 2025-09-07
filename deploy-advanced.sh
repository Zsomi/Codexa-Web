#!/bin/bash

# Codexa weboldal automated deployment script
# Használat: ./deploy-advanced.sh [rollback|status|logs]

set -e

# Konfiguráció
PROJECT_DIR="/var/www/codexa"
BACKUP_DIR="/var/backups/codexa"
DATE=$(date +%Y%m%d_%H%M%S)
APP_NAME="codexa-web"
DOMAIN="https://codexa.hu"
REPO_URL="https://github.com/Zsomi/Codexa-Web.git"
# SSH verzió: REPO_URL="git@github.com:Zsomi/Codexa-Web.git"
BRANCH="master"

# Színek
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Logo
echo -e "${PURPLE}"
echo "  ██████╗ ██████╗ ██████╗ ███████╗██╗  ██╗ █████╗ "
echo " ██╔════╝██╔═══██╗██╔══██╗██╔════╝╚██╗██╔╝██╔══██╗"
echo " ██║     ██║   ██║██║  ██║█████╗   ╚███╔╝ ███████║"
echo " ██║     ██║   ██║██║  ██║██╔══╝   ██╔██╗ ██╔══██║"
echo " ╚██████╗╚██████╔╝██████╔╝███████╗██╔╝ ██╗██║  ██║"
echo "  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝"
echo -e "${NC}"
echo -e "${BLUE}Automated Deployment System v2.0${NC}"
echo ""

# Funkciók
check_prerequisites() {
    echo -e "${YELLOW}🔍 Előfeltételek ellenőrzése...${NC}"
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ Git nincs telepítve${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ NPM nincs telepítve${NC}"
        exit 1
    fi
    
    if ! command -v pm2 &> /dev/null; then
        echo -e "${RED}❌ PM2 nincs telepítve${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Minden előfeltétel teljesül${NC}"
}

backup_current_state() {
    echo -e "${YELLOW}💾 Jelenlegi állapot mentése...${NC}"
    mkdir -p $BACKUP_DIR
    
    cd $PROJECT_DIR
    CURRENT_COMMIT=$(git rev-parse HEAD)
    echo $CURRENT_COMMIT > $BACKUP_DIR/last_commit_$DATE.txt
    
    # Git stash if there are local changes
    if ! git diff-index --quiet HEAD --; then
        git stash push -m "Auto-stash before deployment $DATE"
        echo -e "${YELLOW}📝 Helyi változások elmentve stash-be${NC}"
    fi
    
    echo -e "${GREEN}✅ Backup készült: $BACKUP_DIR/last_commit_$DATE.txt${NC}"
}

check_for_updates() {
    echo -e "${YELLOW}🔍 Frissítések ellenőrzése...${NC}"
    cd $PROJECT_DIR
    
    git fetch origin $BRANCH
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/$BRANCH)
    
    if [ $LOCAL = $REMOTE ]; then
        echo -e "${BLUE}ℹ️  Nincs új változás a repository-ban${NC}"
        echo -e "${BLUE}Jelenlegi commit: ${LOCAL:0:8}${NC}"
        return 1
    fi
    
    echo -e "${GREEN}🆕 Új változások találhatók!${NC}"
    echo -e "${BLUE}Helyi commit: ${LOCAL:0:8}${NC}"
    echo -e "${BLUE}Remote commit: ${REMOTE:0:8}${NC}"
    
    # Show commits to be pulled
    echo -e "${YELLOW}📋 Következő változások:${NC}"
    git log --oneline --graph $LOCAL..$REMOTE
    
    return 0
}

deploy() {
    echo -e "${YELLOW}🚀 Deployment indítása...${NC}"
    
    # Git pull
    echo -e "${YELLOW}📥 Változások letöltése...${NC}"
    git pull origin $BRANCH
    
    # Dependencies
    echo -e "${YELLOW}📦 Dependencies frissítése...${NC}"
    npm ci --production --silent
    
    # Build
    echo -e "${YELLOW}🏗️  Production build...${NC}"
    npm run build
    
    # Test SMTP
    echo -e "${YELLOW}🧪 SMTP teszt...${NC}"
    if npm run test:smtp > /dev/null 2>&1; then
        echo -e "${GREEN}✅ SMTP működik${NC}"
    else
        echo -e "${RED}⚠️  SMTP teszt sikertelen${NC}"
    fi
    
    # PM2 restart
    echo -e "${YELLOW}🔄 Alkalmazás újraindítása...${NC}"
    pm2 restart $APP_NAME
    
    # Health check
    health_check
    
    # Log deployment
    log_deployment
}

health_check() {
    echo -e "${YELLOW}🏥 Health check...${NC}"
    
    # PM2 status
    if pm2 describe $APP_NAME > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PM2 process fut${NC}"
    else
        echo -e "${RED}❌ PM2 process nem fut${NC}"
        return 1
    fi
    
    # HTTP check
    echo -e "${YELLOW}🌐 HTTP válasz ellenőrzése...${NC}"
    sleep 5
    
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN --max-time 10 || echo "000")
    
    if [ $HTTP_STATUS -eq 200 ]; then
        echo -e "${GREEN}✅ Weboldal elérhető (HTTP $HTTP_STATUS)${NC}"
    else
        echo -e "${RED}❌ Weboldal nem elérhető (HTTP $HTTP_STATUS)${NC}"
        return 1
    fi
    
    # Nginx test
    if sudo nginx -t > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Nginx konfiguráció OK${NC}"
    else
        echo -e "${RED}❌ Nginx konfiguráció hiba${NC}"
    fi
}

log_deployment() {
    CURRENT_COMMIT=$(git rev-parse HEAD)
    COMMIT_MSG=$(git log -1 --pretty=%B)
    echo "$(date '+%Y-%m-%d %H:%M:%S'): Deployed commit $CURRENT_COMMIT - $COMMIT_MSG" >> $BACKUP_DIR/deployment.log
}

rollback() {
    echo -e "${YELLOW}🔄 Rollback művelet...${NC}"
    cd $PROJECT_DIR
    
    if [ -z "$2" ]; then
        echo -e "${BLUE}Utolsó 10 commit:${NC}"
        git log --oneline -10
        echo ""
        read -p "Add meg a commit hash-t a rollback-hez: " COMMIT_HASH
    else
        COMMIT_HASH=$2
    fi
    
    if [ -z "$COMMIT_HASH" ]; then
        echo -e "${RED}❌ Nem adtál meg commit hash-t${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}⏪ Rollback a $COMMIT_HASH commit-ra...${NC}"
    git reset --hard $COMMIT_HASH
    npm ci --production --silent
    npm run build
    pm2 restart $APP_NAME
    
    health_check
    
    echo -e "${GREEN}✅ Rollback befejezve!${NC}"
    log_deployment
}

show_status() {
    echo -e "${YELLOW}📊 Rendszer státusz:${NC}"
    echo ""
    
    # Git info
    cd $PROJECT_DIR
    echo -e "${BLUE}📋 Git információk:${NC}"
    echo "Branch: $(git branch --show-current)"
    echo "Commit: $(git rev-parse --short HEAD) - $(git log -1 --pretty=%B | head -n1)"
    echo "Utolsó módosítás: $(git log -1 --pretty=%ad --date=relative)"
    echo ""
    
    # PM2 status
    echo -e "${BLUE}🔧 PM2 státusz:${NC}"
    pm2 describe $APP_NAME 2>/dev/null || echo "PM2 process nem fut"
    echo ""
    
    # Disk space
    echo -e "${BLUE}💾 Disk használat:${NC}"
    df -h $PROJECT_DIR | tail -1
    echo ""
    
    # Last deployments
    echo -e "${BLUE}🚀 Utolsó 5 deployment:${NC}"
    if [ -f "$BACKUP_DIR/deployment.log" ]; then
        tail -5 $BACKUP_DIR/deployment.log
    else
        echo "Nincs deployment log"
    fi
}

show_logs() {
    echo -e "${YELLOW}📄 Logok:${NC}"
    echo ""
    echo -e "${BLUE}PM2 logok (utolsó 20 sor):${NC}"
    pm2 logs $APP_NAME --lines 20 --nostream
    echo ""
    echo -e "${BLUE}Nginx access logok (utolsó 10 sor):${NC}"
    sudo tail -10 /var/log/nginx/access.log
}

# Main script logic
case $1 in
    "rollback")
        check_prerequisites
        rollback $@
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "")
        check_prerequisites
        backup_current_state
        if check_for_updates; then
            deploy
            echo ""
            echo -e "${GREEN}🎉 Deployment sikeresen befejezve!${NC}"
            echo -e "${GREEN}🌍 Weboldal: $DOMAIN${NC}"
            echo ""
            echo -e "${YELLOW}📚 Hasznos parancsok:${NC}"
            echo "./deploy-advanced.sh status    # Rendszer státusz"
            echo "./deploy-advanced.sh logs      # Logok megtekintése"
            echo "./deploy-advanced.sh rollback  # Rollback"
        else
            echo -e "${BLUE}ℹ️  Nincs mit deployolni${NC}"
        fi
        ;;
    *)
        echo -e "${YELLOW}Használat:${NC}"
        echo "./deploy-advanced.sh          # Normál deployment"
        echo "./deploy-advanced.sh rollback # Rollback az előző verzióra"
        echo "./deploy-advanced.sh status   # Rendszer státusz"
        echo "./deploy-advanced.sh logs     # Logok megtekintése"
        ;;
esac
