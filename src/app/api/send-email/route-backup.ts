import { NextRequest, NextResponse } from 'next/server';
i                                        <h3 style="margin: 0 0 12px 0; color: #f9fafb; font-size: 16px; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 8px;">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#f9fafb"/>
                                            </svg>
                                            Küldő adatai:
                                        </h3>port nodemailer from 'nodemailer';

// Email template function
function generateEmailHTML(projectDescription: string, clientEmail: string, clientName: string) {
  return `
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Új weboldal megrendelés - Codexa</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d1117; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif; line-height: 1.6; min-height: 100vh;">
    
    <!-- Email Container -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0d1117; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #1f2937; border: 1px solid #374151; border-radius: 8px;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 24px; text-align: center; border-bottom: 1px solid #374151;">
                            <h1 style="margin: 0; color: #3b82f6; font-size: 24px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">Codexa</h1>
                            <p style="color: #9ca3af; font-size: 14px; margin: 8px 0 0 0;">Modern web development</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 24px;">
                            
                            <!-- Alert Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #374151; border: 1px solid #4b5563; border-left: 3px solid #3b82f6; border-radius: 6px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <h2 style="font-size: 18px; font-weight: 600; color: #3b82f6; margin: 0 0 8px 0; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 8px;">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                                                <path d="M12 2L13.09 8.26L19 7L14.74 11.74L21 12L14.74 12.26L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.26L3 12L9.26 11.74L5 7L10.91 8.26L12 2Z" fill="#3b82f6"/>
                                            </svg>
                                            Új weboldal megrendelés!
                                        </h2>
                                        <p style="margin: 0; color: #d1d5db; font-size: 14px;">Új projektjavaslat érkezett be a weboldalról.</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Project Description -->
                            <h3 style="color: #f9fafb; font-family: 'JetBrains Mono', monospace; margin: 20px 0 12px 0; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#f9fafb"/>
                                    <path d="M8 12H16V14H8V12ZM8 16H13V18H8V16Z" fill="#f9fafb"/>
                                </svg>
                                Projekt leírás:
                            </h3>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 6px; margin: 16px 0;">
                                <tr>
                                    <td style="padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 14px; line-height: 1.6; color: #e6edf3; white-space: pre-wrap;">
                                        ${projectDescription}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Client Email -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #374151; border: 1px solid #4b5563; border-radius: 6px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <h3 style="margin: 0 0 12px 0; color: #f9fafb; font-size: 16px; font-family: 'JetBrains Mono', monospace;">� Küldő adatai:</h3>
                                        <p style="margin: 0 0 8px 0; color: #d1d5db;">
                                            <strong style="color: #f9fafb;">Név:</strong> ${clientName}
                                        </p>
                                        <p style="margin: 0; color: #d1d5db;">
                                            <strong style="color: #f9fafb;">Email:</strong> <a href="mailto:${clientEmail}" style="color: #3b82f6; text-decoration: none;">${clientEmail}</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Terminal Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 6px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
                                        <!-- Terminal Header -->
                                        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #30363d;">
                                            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ff5f56; display: inline-block; margin-right: 4px;"></div>
                                            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ffbd2e; display: inline-block; margin-right: 4px;"></div>
                                            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #27ca3f; display: inline-block;"></div>
                                        </div>
                                        <!-- Terminal Content -->
                                        <div style="color: #7dd3fc;">
                                            <span style="color: #3b82f6;">codexa@server:~$</span> 
                                            <span style="color: #a7f3d0;">echo "Új projekt feldolgozás alatt..."</span><br>
                                            Új projekt feldolgozás alatt...<br>
                                            <span style="color: #3b82f6;">codexa@server:~$</span> 
                                            <span style="color: #a7f3d0;">sleep 1 && echo "Kapcsolatfelvétel szükséges!"</span><br>
                                            Kapcsolatfelvétel szükséges!<br>
                                            <span style="color: #3b82f6;">codexa@server:~$</span> <span style="color: #a7f3d0;">_</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0d1117; padding: 20px; text-align: center; border-top: 1px solid #30363d; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 14px; font-weight: 600;">© 2025 Codexa - Modern web development</p>
                            <p style="font-size: 12px; margin: 0; color: #6b7280; font-style: italic;">
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
    const { name, email, message } = await request.json();

    // Validate input
    if (!email || !message || !name) {
      return NextResponse.json(
        { error: 'Név, email és üzenet szükséges' },
        { status: 400 }
      );
    }

    // Create transporter - Mailpit for local development or production SMTP
    const isProduction = process.env.NODE_ENV === 'production';
    
    const transporter = nodemailer.createTransport({
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
    });

    // Email options
    const mailOptions = {
      from: isProduction ? process.env.EMAIL_USER : 'test@codexa.hu',
      to: isProduction ? 'info@codexa.hu' : 'info@codexa.hu',
      replyTo: email,
      subject: `[CODEXA] Új weboldal megrendelés - ${name} (${email})`,
      html: generateEmailHTML(message, email, name),
      text: `Új weboldal megrendelés érkezett!\n\nNév: ${name}\nEmail: ${email}\n\nÜzenet:\n${message}`,
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