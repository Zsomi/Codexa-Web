# Mailcow Email Setup

## Mailcow konfiguráció

### 1. Environment változók beállítása

Production környezetben a következő változókat kell beállítani:

```bash
NODE_ENV=production
SMTP_HOST=mail.codexa.hu
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REJECT_UNAUTHORIZED=true
EMAIL_USER=info@codexa.hu
EMAIL_PASS=your_secure_password
```

### 2. Mailcow SMTP beállítások

- **Host**: `mail.codexa.hu` (vagy a saját domain)
- **Port**: `587` (STARTTLS) vagy `465` (SSL)
- **Security**: STARTTLS (587) vagy SSL (465)
- **Authentication**: Username/Password

### 3. Development vs Production

- **Development**: Automatikusan Mailpit-et használ (localhost:1025)
- **Production**: Mailcow SMTP-t használ a beállított konfigurációval

### 4. Mailcow admin setup

1. Mailcow admin felületen hozz létre `info@codexa.hu` email címet
2. Állítsd be az SMTP jelszót
3. Engedélyezd az SMTP hozzáférést

### 5. DNS Records

Győződj meg róla, hogy a következő DNS rekordok be vannak állítva:

```dns
MX    @    10 mail.codexa.hu
A     mail    [SERVER_IP]
TXT   @    "v=spf1 mx ~all"
TXT   mail._domainkey    [DKIM_KEY]
TXT   _dmarc    "v=DMARC1; p=quarantine; rua=mailto:postmaster@codexa.hu"
```

### 6. Tesztelés

```bash
# Development tesztelés (Mailpit)
npm run dev
# Mailpit: http://localhost:8025

# Production tesztelés
NODE_ENV=production npm start
```

## Hibaelhárítás

### Gyakori hibák:

1. **Connection refused**: Ellenőrizd a SMTP_HOST és PORT beállításokat
2. **Authentication failed**: Ellenőrizd az EMAIL_USER és EMAIL_PASS értékeket
3. **TLS errors**: Állítsd `SMTP_REJECT_UNAUTHORIZED=false` értékre teszteléshez

### Debug mód:

```bash
DEBUG=nodemailer:* npm start
```