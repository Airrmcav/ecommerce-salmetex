import { Metadata } from "next";
import NosotrosClient from "./components/nosotros-client";

export const metadata: Metadata = {
  title: "Nosotros | SALMETEXMED - Líderes en Equipamiento Médico en México",
  description: "Con más de 12 años de experiencia, SALMETEXMED es líder en distribución de equipos médicos certificados COFEPRIS en México. Misión, visión y valores.",
  alternates: {
    canonical: "https://salmetexmed.com.mx/nosotros",
  },
  openGraph: {
    title: "Nosotros | SALMETEXMED",
    description: "Más de 12 años proporcionando equipamiento médico de alta calidad en México",
    url: "https://salmetexmed.com.mx/nosotros",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Salmetexmed",
  "url": "https://salmetexmed.com.mx",
  "logo": "https://salmetexmed.com.mx/logo.png",
  "description": "Distribuidor autorizado de equipo médico en México. Más de 1,000 productos certificados COFEPRIS para hospitales, clínicas y consultorios.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ciudad de México",
    "addressRegion": "CDMX",
    "addressCountry": "MX",
  },
  "telephone": "+52-844-595-4660",
  "email": "contacto@salmetexmed.com.mx",
  "sameAs": [
    "https://www.facebook.com/salmetexmed",
    "https://www.instagram.com/salmetexmed",
  ],
};

export default function PageNosotros() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <NosotrosClient />
    </>
  );
}