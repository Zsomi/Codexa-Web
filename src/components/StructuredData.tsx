'use client';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://codexa.hu/#website",
        "url": "https://codexa.hu",
        "name": "Codexa",
        "description": "Professzionális weboldal készítés és teljes körű karbantartás",
        "inLanguage": "hu-HU",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://codexa.hu/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://codexa.hu/#organization",
        "name": "Codexa",
        "url": "https://codexa.hu",
        "logo": {
          "@type": "ImageObject",
          "url": "https://codexa.hu/images/codexaweb.png"
        },
        "description": "Modern weboldal készítés és teljes körű karbantartási szolgáltatások vállalkozásoknak",
        "areaServed": "Hungary",
        "serviceType": [
          "Weboldal készítés",
          "Webshop fejlesztés", 
          "Weboldal karbantartás",
          "SEO optimalizálás",
          "Webfejlesztés"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@codexa.hu",
          "availableLanguage": ["Hungarian", "English"]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://codexa.hu/#localbusiness",
        "name": "Codexa",
        "image": "https://codexa.hu/images/codexaweb.png",
        "url": "https://codexa.hu",
        "telephone": "+36-XX-XXX-XXXX",
        "email": "info@codexa.hu",
        "areaServed": {
          "@type": "Country",
          "name": "Hungary"
        },
        "priceRange": "39000 HUF - 150000 HUF",
        "description": "Professzionális weboldal készítés és karbantartás. Modern, reszponzív weboldalak és webshopok készítése vállalkozásoknak.",
        "serviceArea": {
          "@type": "Country", 
          "name": "Hungary"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Webfejlesztési szolgáltatások",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Alap weboldal készítés",
                "description": "Bemutatkozó weboldal vállalkozások számára"
              },
              "price": "39000",
              "priceCurrency": "HUF"
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Webshop készítés",
                "description": "Online áruház komplett fizetési rendszerrel"
              },
              "price": "89000",
              "priceCurrency": "HUF"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Weboldal karbantartás",
                "description": "Rendszeres frissítések és technikai támogatás"
              },
              "price": "8900",
              "priceCurrency": "HUF",
              "billingIncrement": "P1M"
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}