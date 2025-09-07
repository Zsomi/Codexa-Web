// SMTP Teszt Script - Mailcow kapcsolat ellenőrzése
// npm run test:smtp

import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

async function testSMTP() {
  console.log('🔧 SMTP Konfiguráció teszt...\n');
  
  console.log('Environment változók:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
  console.log('');

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
      }
    });

    console.log('🔗 SMTP kapcsolat tesztelése...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP kapcsolat sikeres!');
    
    console.log('\n📧 Teszt email küldése...');
    
    // Send test email
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // saját magunknak
      subject: '🧪 SMTP Teszt - Codexa',
      html: `
        <h2>🚀 SMTP Teszt Sikeres!</h2>
        <p>Ez egy teszt email a Codexa weboldalról.</p>
        <p><strong>Időpont:</strong> ${new Date().toLocaleString('hu-HU')}</p>
        <p><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</p>
        <p><strong>Port:</strong> ${process.env.SMTP_PORT}</p>
        <hr>
        <p><em>Ha ezt az emailt megkaptad, akkor a Mailcow SMTP konfiguráció működik!</em></p>
      `,
      text: `SMTP Teszt sikeres! Időpont: ${new Date().toLocaleString('hu-HU')}`
    };

    const info = await transporter.sendMail(testEmail);
    console.log('✅ Teszt email elküldve!');
    console.log('Message ID:', info.messageId);
    console.log('');
    console.log('🎉 Minden rendben! A Mailcow SMTP működik.');
    console.log('💡 Most már használhatod a weboldalon a kapcsolat formot.');
    
  } catch (error) {
    console.error('❌ SMTP hiba:');
    console.error(error.message);
    console.log('');
    console.log('🔧 Hibaelhárítási tippek:');
    console.log('1. Ellenőrizd a .env.local fájlt');
    console.log('2. Mailcow admin panel: SMTP engedélyezve?');
    console.log('3. Helyes jelszó az EMAIL_PASS-ben?');
    console.log('4. Tűzfal: 587/465 port nyitva?');
    console.log('5. SSL problémák? Próbáld: SMTP_REJECT_UNAUTHORIZED=false');
  }
}

testSMTP();
