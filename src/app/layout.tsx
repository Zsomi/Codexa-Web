import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ToastWrapper from '../components/ToastWrapper';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codexa - Weboldal készítés és karbantartás Budapest | Modern weboldalak vállalkozásoknak",
  description: "Professzionális weboldal készítés és teljes körű karbantartás Magyarországon. Modern, reszponzív weboldalak és webshopok vállalkozásoknak. Laravel, Next.js, Angular fejlesztés. SEO optimalizálás, gyors betöltés, biztonságos működés. Kérjen ajánlatot még ma!",
  keywords: [
    "weboldal készítés Budapest",
    "weboldal készítés Magyarország",
    "weboldal karbantartás", 
    "webshop készítés",
    "webfejlesztés Budapest",
    "SEO optimalizálás",
    "reszponzív weboldal",
    "modern weboldal készítés",
    "vállalkozás weboldal",
    "Next.js weboldal",
    "Laravel webfejlesztés",
    "Angular fejlesztés",
    "weboldal frissítés",
    "weboldal támogatás",
    "professzionális webfejlesztés",
    "webdesign Magyarország",
    "online jelenlét",
    "weboldal készítés ár"
  ],
  authors: [{ name: "Codexa" }],
  creator: "Codexa",
  publisher: "Codexa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://codexa.hu",
    title: "Codexa - Weboldal készítés és karbantartás Budapest | Modern weboldalak",
    description: "Professzionális weboldal készítés és teljes körű karbantartás Magyarországon. Modern, reszponzív weboldalak és webshopok vállalkozásoknak. Laravel, Next.js, Angular fejlesztés. Kérjen ajánlatot!",
    siteName: "Codexa Webfejlesztés",
    images: [
      {
        url: "https://codexa.hu/images/codexaweb.png",
        width: 1200,
        height: 630,
        alt: "Codexa - Modern weboldal készítés és karbantartás Magyarországon",
        type: "image/png"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexa - Weboldal készítés és karbantartás Budapest",
    description: "Professzionális weboldal készítés és teljes körű karbantartás Magyarországon. Modern, reszponzív weboldalak és webshopok vállalkozásoknak.",
    images: ["https://codexa.hu/images/codexaweb.png"],
  },
  verification: {
    google: "eadc2d2de068f2c3",
  },
  alternates: {
    canonical: "https://codexa.hu",
    languages: {
      'hu': 'https://codexa.hu',
      'en': 'https://codexa.hu/en',
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://codexa.hu" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <ToastWrapper />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
