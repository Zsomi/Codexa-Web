# EmailJS Beállítási Útmutató

## 1. EmailJS Regisztráció
1. Menj az https://www.emailjs.com/ oldalra
2. Regisztrálj egy ingyenes fiókot
3. Jelentkezz be a dashboardba

## 2. Email Service Létrehozása
1. A dashboardban kattints az "Email Services" fülre
2. Kattints az "Add New Service" gombra
3. Válaszd ki az email szolgáltatót (pl. Gmail, Outlook)
4. Kövesd a beállítási lépéseket
5. Jegyezd fel a Service ID-t

## 3. Email Template Létrehozása
1. Kattints az "Email Templates" fülre
2. Kattints a "Create New Template" gombra
3. Használd ezt a template-et:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})
To: {{to_email}}

{{message}}

---
Projekt leírás:
{{project_description}}
```

4. Jegyezd fel a Template ID-t

## 4. Public Key Beszerzése
1. Menj az "Account" részbe
2. Az "API Keys" szekcióban találod a Public Key-t

## 5. Környezeti Változók Beállítása
Frissítsd a `.env.local` fájlt az igazi értékekkel:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

## 6. Restart Development Server
```bash
npm run dev
```

Ezután a contact form működni fog és a valódi emaileket küldi az info@codexa.hu címre!
