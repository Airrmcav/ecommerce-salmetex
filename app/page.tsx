import type { Metadata } from "next";
import Carousel from "@/components/carousel-text-banner";
import FeaturedProducts from "@/components/featured-products";
import Banner from "@/components/Banner";
import ChooseCategory from "@/components/choose-category";
import B2BTrustSection from "@/components/home/b2b-trust-section";

export const metadata: Metadata = {
  title: "Venta y Distribución de Equipamiento Médico en México | Salmetexmed",
  description:
    "Distribuidor autorizado B2B de equipo médico en México. Venta mayoreo y menudeo. Sillas de ruedas, autoclaves, monitores, incubadoras, ultrasonidos. Envío nacional COFEPRIS.",
  keywords: [
    "equipo médico México",
    "distribuidor equipo médico",
    "proveedor equipo médico B2B",
    "venta mayoreo equipo médico",
    "sillas de ruedas México",
    "autoclaves médicos",
    "monitores signos vitales",
    "incubadoras neonatales",
    "ultrasonidos portátil",
    "distribuidor autorizado COFEPRIS",
    "equipo médico hospitalario",
    "insumos médicos México",
    "Salmetexmed",
  ],
  authors: [{ name: "Salmetexmed" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://salmetexmed.com.mx",
  },
  openGraph: {
    title: "Salmetexmed — Equipamiento Médico en México",
    description:
      "Distribuidor autorizado de equipo médico B2B. Más de 1,000 productos certificados COFEPRIS con envío a todo México.",
    url: "https://salmetexmed.com.mx",
    siteName: "Salmetexmed",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://salmetexmed.com.mx/og-image.jpg",
        alt: "Salmetexmed — Equipamiento Médico Profesional en México",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salmetexmed — Equipamiento Médico en México",
    description:
      "Distribuidor autorizado B2B de equipo médico. Envío nacional COFEPRIS.",
    images: ["https://salmetexmed.com.mx/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <main>
      <Carousel />
      <FeaturedProducts />
      <Banner />
      <B2BTrustSection />
      <ChooseCategory />
    </main>
  );
}