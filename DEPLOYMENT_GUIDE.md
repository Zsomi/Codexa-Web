# 🚀 Codexa Weboldal Deployment Útmutató

## 1. Vercel Deployment (AJÁNLOTT)

### Előkészület:
```bash
# .env.local fájl ellenőrzése
# Győződj meg róla, hogy a SMTP beállítások helyesek:
SMTP_HOST=mail.codexa.hu
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=info@codexa.hu
EMAIL_PASS=VALÓDI_JELSZÓ_IDE
SMTP_REJECT_UNAUTHORIZED=false
```

### Deployment lépések:
1. **Vercel CLI telepítése:**
   ```bash
   npm install -g vercel
   ```

2. **Git repository létrehozása:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Vercel deployment:**
   ```bash
   vercel
   ```
   - Válaszd ki a projekt mappát
   - Válaszd ki a Vercel accountod
   - Projekt neve: `codexa-weboldal`
   - Framework: `Next.js` (automatikusan felismeri)

4. **Environment Variables beállítása Vercel-ben:**
   - Menj a Vercel dashboard-ra
   - Project Settings → Environment Variables
   - Add hozzá az összes SMTP változót a `.env.local` fájlból

5. **Custom Domain hozzáadása:**
   - Project Settings → Domains
   - Add domain: `codexa.hu`
   - DNS beállítások szerint konfiguráld

## 2. Production Optimalizálás

### Build előtt ellenőrizd:
```bash
# Tesztelés
npm run build
npm run start

# SMTP teszt
npm run test:smtp
```

### Performance optimalizálás:
```bash
# Bundle analyzer (opcionális)
npm install --save-dev @next/bundle-analyzer
```

## 3. Jövőbeli Szerkesztéshez - Content Management

### Opció A: Markdown-based (Egyszerű)
```bash
# Content mappa létrehozása
mkdir content
mkdir content/portfolio
mkdir content/services

# Markdown fájlok a projektekhez
touch content/portfolio/hexorystore.md
touch content/portfolio/partyzona.md
```

### Opció B: Sanity CMS (Professzionális)
```bash
# Sanity project létrehozása
npm create sanity@latest
cd sanity-studio
npm run dev
```

### Opció C: Strapi CMS (Teljes CMS)
```bash
# Külön Strapi backend
npx create-strapi-app@latest codexa-cms
```

## 4. Monitoring és Karbantartás

### Hiba monitoring:
```bash
# Sentry integration (opcionális)
npm install @sentry/nextjs
```

### Analytics:
```bash
# Google Analytics vagy Vercel Analytics
npm install @vercel/analytics
```

## 5. Biztonsági Checklist

- [ ] Environment variables nem commitolva Git-be
- [ ] SMTP jelszó biztonságos
- [ ] HTTPS engedélyezve
- [ ] Email rate limiting (ha szükséges)
- [ ] CORS beállítások ellenőrizve

## 6. Maintenance Script

```bash
# package.json scripts bővítése:
"scripts": {
  "deploy": "vercel --prod",
  "test:all": "npm run test:smtp && npm run build",
  "backup": "git push origin main"
}
```

## Következő lépések:

1. ✅ **Vercel deployment** - 5 perc
2. ✅ **Domain beállítás** - 10 perc  
3. ✅ **SMTP teszt élesben** - 5 perc
4. 📝 **Content management döntés** - jövőbeli fejlesztés
5. 📊 **Analytics hozzáadása** - opcionális

**Teljes deployment idő: ~20 perc**
