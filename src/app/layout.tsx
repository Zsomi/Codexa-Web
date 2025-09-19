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
  title: "Codexa - Weboldal készítés és karbantartás | Modern weboldalak vállalkozásoknak",
  description: "Professzionális weboldal készítés és teljes körű karbantartás. Modern, reszponzív weboldalak és webshopok készítése. SEO optimalizálás, gyors betöltés, biztonságos működés. Magyarország.",
  keywords: [
    "weboldal készítés",
    "weboldal karbantartás", 
    "webshop készítés",
    "webfejlesztés",
    "SEO optimalizálás",
    "reszponzív weboldal",
    "modern weboldal",
    "vállalkozás weboldal",
    "Next.js weboldal",
    "Laravel webfejlesztés",
    "weboldal frissítés",
    "weboldal támogatás",
    "Magyarország webfejlesztés"
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
    title: "Codexa - Weboldal készítés és karbantartás",
    description: "Professzionális weboldal készítés és teljes körű karbantartás. Modern, reszponzív weboldalak és webshopok készítése vállalkozásoknak.",
    siteName: "Codexa",
    images: [
      {
        url: "/images/codexaweb.png",
        width: 1200,
        height: 630,
        alt: "Codexa - Modern weboldal készítés és karbantartás",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexa - Weboldal készítés és karbantartás",
    description: "Professzionális weboldal készítés és teljes körű karbantartás. Modern, reszponzív weboldalak és webshopok készítése vállalkozásoknak.",
    images: ["/images/codexaweb.png"],
  },
  verification: {
    google: "your-google-verification-code-here", // Replace with actual verification code
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
