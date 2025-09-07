export interface EmailTemplateProps {
  project_description: string;
  client_email?: string;
  client_name?: string;
}

export function generateNewOrderEmailTemplate({ 
  project_description, 
  client_email, 
  client_name 
}: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Új weboldal megrendelés - Codexa</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0d1117;
      color: #f9fafb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: white;
      font-size: 24px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }
    .content {
      padding: 24px;
    }
    .alert-box {
      background-color: #1f2937;
      border: 1px solid #374151;
      border-left: 4px solid #60a5fa;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .alert-title {
      font-size: 18px;
      font-weight: 600;
      color: #60a5fa;
      margin: 0 0 8px 0;
      font-family: 'JetBrains Mono', monospace;
    }
    .project-description {
      background-color: #0d1117;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 16px;
      margin: 16px 0;
      white-space: pre-wrap;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      line-height: 1.5;
    }
    .client-info {
      background-color: #1f2937;
      border-radius: 6px;
      padding: 16px;
      margin: 16px 0;
    }
    .client-info h3 {
      margin: 0 0 12px 0;
      color: #60a5fa;
      font-size: 16px;
      font-family: 'JetBrains Mono', monospace;
    }
    .client-info p {
      margin: 4px 0;
      color: #d1d5db;
    }
    .footer {
      background-color: #0d1117;
      padding: 16px 24px;
      text-align: center;
      border-top: 1px solid #30363d;
    }
    .footer p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      margin: 16px 0;
      transition: all 0.3s ease;
    }
    .cta-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
    .terminal-style {
      background-color: #0d1117;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #7dd3fc;
    }
    .terminal-style::before {
      content: "$ ";
      color: #60a5fa;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚀 Codexa</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Alert Box -->
      <div class="alert-box">
        <h2 class="alert-title">⚡ Új weboldal megrendelés!</h2>
        <p style="margin: 0; color: #d1d5db;">Új projektjavaslat érkezett be a weboldalra.</p>
      </div>

      <!-- Project Description -->
      <h3 style="color: #60a5fa; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px;">
        📋 Projekt leírás:
      </h3>
      <div class="project-description">${project_description}</div>

      ${client_email || client_name ? `
      <!-- Client Information -->
      <div class="client-info">
        <h3>👤 Ügyfél információk:</h3>
        ${client_name ? `<p><strong>Név:</strong> ${client_name}</p>` : ''}
        ${client_email ? `<p><strong>Email:</strong> <a href="mailto:${client_email}" style="color: #60a5fa; text-decoration: none;">${client_email}</a></p>` : ''}
      </div>
      ` : ''}

      <!-- Action Required -->
      <div style="text-align: center; margin: 24px 0;">
        <a href="mailto:${client_email || 'info@codexa.hu'}" class="cta-button">
          📧 Válasz küldése
        </a>
      </div>

      <!-- Terminal Style Note -->
      <div class="terminal-style">
        echo "Új projekt feldolgozás alatt..." && sleep 1 && echo "Kapcsolatfelvétel szükséges!"
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2025 Codexa - Modern web development</p>
      <p style="font-size: 12px; margin-top: 8px;">
        Ez egy automatikusan generált email a weboldalról érkező megrendelés alapján.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Example usage for testing
export function getExampleEmailTemplate(): string {
  return generateNewOrderEmailTemplate({
    project_description: `Szeretnék egy modern e-commerce weboldalt készíttetni.

Követelmények:
- Responsive design
- Fizetési rendszer integráció
- Admin panel
- SEO optimalizáció
- Gyors betöltési idő

Határidő: 4-6 hét
Budget: 500-800k Ft`,
    client_email: "pelda.ugyfel@email.com",
    client_name: "Példa Ügyfél"
  });
}
