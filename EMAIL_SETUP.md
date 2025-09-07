# 📧 Saját Email Rendszer Beállítása - Mailcow

## 🚀 EmailJS helyett Nodemailer + Mailcow

Az EmailJS helyett most már saját email küldő rendszert használunk Mailcow-val, ami:
- ✅ Nincs brand üzenet az email végén
- ✅ Teljes kontroll az email template felett  
- ✅ Biztonságosabb (nincs külső függőség)
- ✅ Professzionális (saját email szerver)

## ⚙️ Beállítási lépések:

### 1. Mailcow SMTP beállítások:

1. **Mailcow Admin Panel** → Mailboxes → info@codexa.hu
2. **Ellenőrizd** hogy az email fiók aktív
3. **SMTP beállítások** → Engedélyezd az SMTP hozzáférést
4. **Jelszó** → Használd az email fiók jelszavát

### 2. Environment változók beállítása:

Másold a `.env.example` fájlt `.env.local` néven:

```bash
# .env.local
EMAIL_USER=info@codexa.hu
EMAIL_PASS=your_email_password_here

# SMTP beállítások
SMTP_HOST=mail.codexa.hu
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REJECT_UNAUTHORIZED=true
```

### 3. SMTP Port beállítások:

| Port | Titkosítás | SMTP_SECURE | Leírás |
|------|------------|-------------|---------|
| **587** | STARTTLS | `false` | ✅ Ajánlott |
| **465** | SSL/TLS | `true` | Alternatíva |
| **25** | Plain | `false` | ❌ Nem biztonságos |

### 4. Hibaelhárítás:

**SSL Certificate problémák:**
```bash
SMTP_REJECT_UNAUTHORIZED=false
```

**Port problémák:**
- Ellenőrizd a tűzfalat (587/465 port)
- ISP esetleg blokkolja a 25/587 portot

**Auth problémák:**
- Ellenőrizd az email jelszót
- Mailcow admin panelben nézd meg a log-okat

### 3. API Endpoint:

Az `/api/send-email` endpoint már elkészült:
- **URL**: `/api/send-email`
- **Method**: POST
- **Body**: `{ "email": "user@email.com", "projectDescription": "..." }`

### 4. Quote komponens:

A Quote komponens már frissítve lett, hogy az új API-t használja.

## 🎨 Email Template:

A template már tartalmazza:
- **Codexa branding** (saját design)
- **Sötét téma** (weboldal stílusa)
- **Terminal ablak** 
- **Responsive design**
- **Nincs külső brand!** ✅

## 🔧 Tesztelés:

1. **Állítsd be** a `.env.local` fájlt
2. **Indítsd el** a dev servert: `npm run dev`
3. **Próbáld ki** a kapcsolat formot
4. **Ellenőrizd** az info@codexa.hu inbox-ot

## 🆚 EmailJS vs Nodemailer összehasonlítás:

| Funkció | EmailJS | Nodemailer |
|---------|---------|------------|
| **Branding** | ❌ EmailJS logo | ✅ Tiszta |
| **Költség** | Limitált ingyenes | ✅ Teljesen ingyenes |
| **Kontroll** | ❌ Korlátozott | ✅ Teljes |
| **Biztonság** | ❌ Client-side | ✅ Server-side |
| **Testreszabás** | ❌ Template limits | ✅ Korlátlan |

## 🔐 Biztonság:

- **Server-side**: Email küldés backend-en történik
- **Environment változók**: Jelszavak biztonságosan tárolva
- **Validáció**: Input validáció mindkét oldalon
- **Rate limiting**: Opcionálisan hozzáadható

Ez a megoldás sokkal professzonálisabb és rugalmasabb! 🚀
