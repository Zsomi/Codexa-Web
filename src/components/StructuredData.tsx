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
        "name": "Codexa - Weboldal Készítés és Karbantartás",
        "alternateName": "Codexa Webfejlesztés",
        "image": [
          "https://codexa.hu/images/codexaweb.png",
          "https://codexa.hu/images/codexatxt.png"
        ],
        "url": "https://codexa.hu",
        "telephone": "+36206621348",
        "email": "info@codexa.hu",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "HU",
          "addressRegion": "Hungary"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "addressCountry": "HU"
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "Hungary"
          },
          {
            "@type": "Country",
            "name": "Magyarország"
          }
        ],
        "priceRange": "39.000 Ft - 150.000 Ft",
        "paymentAccepted": "Átutalás, Online fizetés",
        "currenciesAccepted": "HUF",
        "description": "Professzionális weboldal készítés és teljes körű karbantartás Magyarországon. Modern, reszponzív weboldalak és webshopok készítése vállalkozásoknak. Laravel, Next.js, Angular fejlesztés.",
        "slogan": "Modern weboldalak vállalkozásoknak - Gyorsan • Elérhető áron • Professzionálisan",
        "serviceArea": {
          "@type": "Country", 
          "name": "Hungary"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "1"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "knowsAbout": [
          "Weboldal készítés",
          "Webfejlesztés",
          "Next.js",
          "React",
          "Laravel",
          "Angular",
          "SEO optimalizálás",
          "Webshop készítés",
          "Weboldal karbantartás",
          "Reszponzív webdesign",
          "Modern webfejlesztés"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Webfejlesztési szolgáltatások",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Alap weboldal készítés",
                "description": "Bemutatkozó weboldal vállalkozások számára. Reszponzív, gyors és SEO optimalizált.",
                "provider": {
                  "@type": "Organization",
                  "name": "Codexa"
                }
              },
              "price": "39000",
              "priceCurrency": "HUF",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Webshop készítés",
                "description": "Online áruház komplett fizetési és rendeléskezelő rendszerrel.",
                "provider": {
                  "@type": "Organization",
                  "name": "Codexa"
                }
              },
              "price": "89000",
              "priceCurrency": "HUF",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Weboldal karbantartás és támogatás",
                "description": "Rendszeres frissítések, biztonsági ellenőrzések és technikai támogatás.",
                "provider": {
                  "@type": "Organization",
                  "name": "Codexa"
                }
              },
              "price": "8900",
              "priceCurrency": "HUF",
              "billingIncrement": "P1M",
              "availability": "https://schema.org/InStock"
            }
          ]
        },
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61580476229331"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://codexa.hu/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://codexa.hu",
              "name": "Főoldal"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://codexa.hu#services",
              "name": "Szolgáltatások"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@id": "https://codexa.hu#portfolio",
              "name": "Portfólió"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@id": "https://codexa.hu#contact",
              "name": "Kapcsolat"
            }
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://codexa.hu/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Mennyi idő alatt készül el egy weboldal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Egy alap bemutatkozó weboldal elkészítése általában 1-2 hetet vesz igénybe. Webshop esetében 2-4 hét a fejlesztési idő. Az egyedi igények és a projekt komplexitása függvényében ez változhat."
            }
          },
          {
            "@type": "Question",
            "name": "Mennyibe kerül egy weboldal készítése?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Áraink 39.000 Ft-tól indulnak egy alap bemutatkozó weboldalért. Webshop készítés 89.000 Ft-tól érhető el. A végleges ár az igényektől, funkciók számától és a projekt komplexitásától függ. Kérjen egyedi ajánlatot!"
            }
          },
          {
            "@type": "Question",
            "name": "Milyen technológiákat használtok?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Modern és bevált technológiákat használunk: Next.js és React a frontend fejlesztéshez, Laravel PHP keretrendszert backend funkcionalitáshoz, valamint Angulart komplex alkalmazásokhoz. Mindegyik technológia gyors, biztonságos és skálázható megoldásokat biztosít."
            }
          },
          {
            "@type": "Question",
            "name": "Mit tartalmaz a weboldal karbantartási csomag?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Havonta 8.900 Ft-tól érhető el karbantartási szolgáltatásunk, amely tartalmazza: rendszeres biztonsági frissítéseket, tartalom módosítást, technikai támogatást, mentések készítését és a weboldal folyamatos felügyeletét. Így mindig naprakész és biztonságos marad az oldala."
            }
          },
          {
            "@type": "Question",
            "name": "Mobilbarát lesz a weboldalunk?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Igen, minden általunk készített weboldal teljes mértékben reszponzív, azaz tökéletesen működik és jól néz ki minden eszközön: mobiltelefonokon, táblagépeken és asztali számítógépeken egyaránt. Ez a Google keresési rangsorolás szempontjából is alapvető követelmény."
            }
          },
          {
            "@type": "Question",
            "name": "Segítetek a domain és tárhelyszolgáltató kiválasztásában?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Természetesen! Segítünk megtalálni a megfelelő szolgáltatót az igényeid alapján, és támogatást nyújtunk a beállításokban. Mi magát a tárhely szolgáltatást nem futtatjuk, de a weboldal karbantartását és frissítését teljes körűen vállaljuk."
            }
          },
          {
            "@type": "Question",
            "name": "SEO optimalizált lesz a weboldal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Igen, minden weboldalunkat alapszintű SEO optimalizálással készítjük el: megfelelő meta tagek, strukturált adatok (schema.org), gyors betöltési idő, mobilbarát megjelenés és tiszta kódstruktúra. Így jobban megtalálható lesz a Google keresésében."
            }
          }
        ]
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