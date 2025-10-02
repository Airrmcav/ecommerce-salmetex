import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SocialMediaLinks from "@/components/socialMediaLinks";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";


const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venta y Distribución de Equipamiento Médico en México", 
  description: "Venta de equipamiento médico con más de una década de experiencia. Suministros médicos, instrumental quirúrgico y tecnología hospitalaria de alta calidad en México.",
  keywords: [
    "equipamiento médico",
    "instrumental quirúrgico",
    "suministros médicos",
    "tecnología hospitalaria",
    "equipo médico México",
    "dispositivos médicos",
    "material médico"
  ],
  authors: [{ name: "Salmetexmed" }],
  creator: "Salmetexmed",
  publisher: "Salmetexmed",
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://salmetexmed.com.mx',
    siteName: 'Salmetexmed',
    title: 'Salmetexmed - Equipamiento Médico',
    description: 'Líderes en equipamiento médico con más de una década de experiencia. Suministros médicos, instrumental quirúrgico y tecnología hospitalaria.',
  },
  category: 'healthcare',
  classification: 'Medical Equipment',
  other: {
    'contact:phone_number': '+52 1 844 595 4660',
    'contact:country_name': 'México',
    'DC.title': 'Salmetexmed - Equipamiento Médico',
    'DC.creator': 'Salmetexmed',
    'DC.subject': 'Equipamiento Médico, Instrumental Quirúrgico',
    'DC.description': 'Equipamiento médico profesional y suministros hospitalarios',
    'geo.region': 'MX',
    'geo.placename': 'México',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <head>
         {/* Google tag (gtag.js) */}
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16830523296"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-16830523296');
</script>
        {/* Preconnect para mejorar velocidad */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Canonical URL (agregar en cada página específica) */}
        <link rel="canonical" href="https://salmetex.com" />

        {/* Structured Data - Organización */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Salmetexmed",
              "description": "Líderes en equipamiento médico con más de una década de experiencia",
              "url": "https://salmetex.com.mx",
              "logo": "https://salmetexmed.com.mx/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+52 1 844 595 4660",
                "contactType": "customer service",
                "areaServed": "MX",
                "availableLanguage": "Spanish"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Sor Juana Inés de la Cruz s/n, Ricardo Flores Magón",
                "postalCode": "54607",
                "addressLocality": "Tepotzotlán",
                "addressRegion": "Estado de México",
                "addressCountry": "MX"
              },
              "sameAs": [
                "https://facebook.com/salmetexmed",
                "https://instagram.com/salmetexmed",
              ]
            })
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Salmetexmed",
              "url": "https://salmetexmed.com.mx",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://salmetexmed.com.mx/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <Navbar />
        <SocialMediaLinks />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
