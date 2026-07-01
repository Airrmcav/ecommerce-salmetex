import { Metadata } from "next";
import ContactoClient from "./components/contacto-client";

export const metadata: Metadata = {
  title: "Contacto Profesional | SALMETEXMED - Equipos Médicos México",
  description: "Contacto profesional para equipos médicos y supplies hospitalarios en México. Teléfono, email y ubicación de SALMETEXMED.",
  alternates: {
    canonical: "https://salmetexmed.com.mx/contacto",
  },
  openGraph: {
    title: "Contacto Profesional | SALMETEXMED",
    description: "Ponte en contacto con nuestro equipo de especialistas en equipos médicos. Tel: +52 1 844 595 4660",
    url: "https://salmetexmed.com.mx/contacto",
    type: "website",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto - SALMETEXMED",
  "description": "Contacto profesional para equipos médicos y supplies hospitalarios en México",
  "url": "https://salmetexmed.com.mx/contacto",
  "email": "contacto@salmetexmed.com.mx",
  "telephone": "+52 1 844 595 4660",
  "address": [{
    "@type": "PostalAddress",
    "streetAddress": "Calle Dolores s/n, local 10, Colonia Visitación",
    "addressLocality": "Melchor Ocampo",
    "addressRegion": "Estado de México",
    "postalCode": "54890",
    "addressCountry": "MX"
  }, {
    "@type": "PostalAddress",
    "addressLocality": "Saltillo",
    "addressRegion": "Coahuila",
    "addressCountry": "MX"
  }],
  "areaServed": "México",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "11:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ]
};

export default function PageContacto() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactoClient />
    </>
  );
}