import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email template function
func    // Create transporter - Mailpit for local development or production SMTP
    const isProduction = process.env.NODE_ENV === 'production';
    
    const transporter = nodemailer.createTransporter({
      host: isProduction ? process.env.SMTP_HOST : 'localhost',
      port: isProduction ? parseInt(process.env.SMTP_PORT || '587') : 1025,
      secure: isProduction ? (process.env.SMTP_SECURE === 'true') : false,
      auth: isProduction ? {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      } : undefined, // No auth needed for Mailpit
      tls: isProduction ? {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
      } : {
        rejectUnauthorized: false
      }
    });mailHTML(projectDescription: string, clientEmail: string) {
  return `
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Új weboldal megrendelés - Codexa</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif; line-height: 1.6; min-height: 100vh;"
    
    <!-- Email Container -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0d1117; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(59, 130, 246, 0.05)); backdrop-filter: blur(16px); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 16px; box-shadow: 0 25px 50px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);"
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa); padding: 40px 32px; text-align: center; border-radius: 16px 16px 0 0; position: relative;">
                            <!-- Glass effect overlay -->
                            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.1); border-radius: 16px 16px 0 0; backdrop-filter: blur(10px);"></div>
                            <div style="position: relative; z-index: 1;">
                                <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 800; font-family: 'JetBrains Mono', monospace; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">� Codexa</h1>
                                <div style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-top: 8px; font-weight: 500;">Modern web development • Professional • Fast</div>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 32px 24px;">
                            
                            <!-- Alert Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #1f2937, #374151); border: 1px solid #4b5563; border-left: 4px solid #60a5fa; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <div style="border-top: 2px solid #60a5fa; margin: -20px -20px 16px -20px; height: 2px;"></div>
                                        <h2 style="font-size: 20px; font-weight: 600; color: #60a5fa; margin: 0 0 8px 0; font-family: 'JetBrains Mono', monospace;">⚡ Új weboldal megrendelés!</h2>
                                        <p style="margin: 0; color: #d1d5db; font-size: 14px;">Új projektjavaslat érkezett be a weboldalról.</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Project Description -->
                            <h3 style="color: #60a5fa; font-family: 'JetBrains Mono', monospace; margin: 24px 0 12px 0; font-size: 16px; font-weight: 600;">📋 Projekt leírás:</h3>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 8px; margin: 16px 0; position: relative;">
                                <tr>
                                    <td style="padding: 8px; font-family: 'JetBrains Mono', monospace; font-size: 14px; line-height: 1.6; color: #e6edf3; white-space: pre-wrap; text-align: left; margin: 0;">
                                        ${projectDescription}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Client Email -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #1f2937, #111827); border: 1px solid #374151; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="margin: 0 0 16px 0; color: #60a5fa; font-size: 16px; font-family: 'JetBrains Mono', monospace;">📧 Küldő email:</h3>
                                        <p style="margin: 8px 0; color: #d1d5db;">
                                            <a href="mailto:${clientEmail}" style="color: #60a5fa; text-decoration: none; font-size: 16px;">${clientEmail}</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Terminal Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 8px; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
                                        <!-- Terminal Header -->
                                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #30363d;">
                                            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ff5f56; display: inline-block; margin-right: 2px;"></div>
                                            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ffbd2e; display: inline-block; margin-right: 2px;"></div>
                                            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #27ca3f; display: inline-block;"></div>
                                        </div>
                                        <!-- Terminal Content -->
                                        <div style="color: #7dd3fc;">
                                            <span style="color: #60a5fa;">codexa@server:~$</span> 
                                            <span style="color: #a7f3d0;">echo "Új projekt feldolgozás alatt..."</span><br>
                                            Új projekt feldolgozás alatt...<br>
                                            <span style="color: #60a5fa;">codexa@server:~$</span> 
                                            <span style="color: #a7f3d0;">sleep 1 && echo "Kapcsolatfelvétel szükséges!"</span><br>
                                            Kapcsolatfelvétel szükséges!<br>
                                            <span style="color: #60a5fa;">codexa@server:~$</span> <span style="color: #a7f3d0;">_</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0d1117; padding: 24px; text-align: center; border-top: 1px solid #30363d; border-radius: 0 0 12px 12px;">
                            <p style="margin: 4px 0; color: #9ca3af; font-size: 14px; font-weight: 600;">© 2025 Codexa - Modern web development</p>
                            <p style="font-size: 12px; margin: 12px 0 4px 0; color: #6b7280; font-style: italic;">
                                Ezt az emailt a Codexa weboldalról küldték.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
    
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const { email, projectDescription } = await request.json();

    // Validate input
    if (!email || !projectDescription) {
      return NextResponse.json(
        { error: 'Email és projekt leírás szükséges' },
        { status: 400 }
      );
    }

    // Create transporter - Mailcow SMTP konfiguráció
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // pl: mail.codexa.hu
      port: parseInt(process.env.SMTP_PORT || '587'), // 587 (STARTTLS) vagy 465 (SSL)
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // info@codexa.hu
        pass: process.env.EMAIL_PASS, // email jelszó
      },
      // Mailcow specifikus beállítások
      tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@codexa.hu',
      replyTo: email,
      subject: `🚀 Új weboldal megrendelés - ${email}`,
      html: generateEmailHTML(projectDescription, email),
      text: `Új weboldal megrendelés érkezett!\n\nKüldő: ${email}\n\nProjekt leírás:\n${projectDescription}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email elküldve:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sikeresen elküldve!' 
    });

  } catch (error) {
    console.error('Email küldési hiba:', error);
    return NextResponse.json(
      { error: 'Hiba történt az email küldése során' },
      { status: 500 }
    );
  }
}
