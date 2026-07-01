import { Metadata } from "next";
import { cache } from "react";

import ProductClient from "./components/product-client";
import RelatedProducts from "./components/related-products";

import { ProductType } from "@/types/product";

interface Props {
  params: Promise<{
    productSlug: string;
  }>;

  searchParams?: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
}

/* =========================================================
   ISR
========================================================= */

export const revalidate = 3600;

/* =========================================================
   FETCH PRODUCT OPTIMIZADO
========================================================= */

const getProduct = cache(
  async (
    slug: string,
  ): Promise<ProductType | null> => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!baseUrl) {
        console.error(
          "NEXT_PUBLIC_BACKEND_URL no definida",
        );

        return null;
      }

    const query =
  `populate[images][fields][0]=url` +
  `&populate[images][fields][1]=alternativeText` +
  `&populate[category][fields][0]=categoryName` +
  `&populate[category][fields][1]=slug` +
  `&populate[variants][fields][0]=name` +
  `&populate[variants][fields][1]=price` +
  `&populate[variants][fields][2]=stock` +
  `&populate[variants][fields][3]=isDefault` +
  `&filters[slug][$eq]=${slug}`;

      const url =
        `${baseUrl}/api/products?${query}`;

      const res = await fetch(url, {
        next: {
          revalidate: 3600,
        },
      });

      if (!res.ok) {
        console.error(
          "Error obteniendo producto:",
          res.status,
        );

        return null;
      }

      const json = await res.json();

      return json?.data?.[0] ?? null;
    } catch (error) {
      console.error(
        "Error getProduct:",
        error,
      );

      return null;
    }
  },
);

const getRelatedProducts = cache(
  async (
    categorySlug: string,
    excludeSlug: string,
  ): Promise<ProductType[]> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!baseUrl) return [];

      const query =
        `populate[images][fields][0]=url` +
        `&populate[images][fields][1]=alternativeText` +
        `&populate[category][fields][0]=categoryName` +
        `&populate[category][fields][1]=slug` +
        `&filters[category][slug][$eq]=${categorySlug}` +
        `&filters[slug][$ne]=${excludeSlug}` +
        `&filters[active][$eq]=true` +
        `&pagination[limit]=5` +
        `&sort=updatedAt:desc`;

      const url = `${baseUrl}/api/products?${query}`;
      const res = await fetch(url, { next: { revalidate: 3600 } });

      if (!res.ok) return [];

      const json = await res.json();
      return json?.data ?? [];
    } catch (error) {
      console.error("Error getRelatedProducts:", error);
      return [];
    }
  },
);

/* =========================================================
   SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const resolvedSearchParams = await searchParams;

  const product =
    await getProduct(productSlug);

  if (!product) {
    return {
      title:
        "Producto no encontrado | Salmetexmed",

      description:
        "El producto que buscas no está disponible.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const hasQueryParams = resolvedSearchParams && Object.keys(resolvedSearchParams).length > 0;
  const baseCanonical = `https://salmetexmed.com.mx/${productSlug}`;

  const fallbackDescription = `Compra ${product.productName} en Salmetexmed México. Equipo médico certificado con envío nacional.`;

  const rawDescription =
    product.textSeo ||
    product.description ||
    fallbackDescription;

  const description =
    rawDescription.length > 160
      ? rawDescription.slice(
          0,
          rawDescription.lastIndexOf(
            " ",
            155,
          ),
        ) + "..."
      : rawDescription;

  const image =
    product.images?.[0]?.url ||
    "https://salmetexmed.com.mx/og-image.jpg";

  const canonical = hasQueryParams ? baseCanonical : `https://salmetexmed.com.mx/${productSlug}`;

  return {
    title: `${product.productName} | Salmetexmed México`,

    description,

    keywords: [
      product.productName,
      `${product.productName} México`,
      `comprar ${product.productName}`,
      `${product.productName} precio`,
      product.category?.categoryName,
      product.area,
      product.programa?.namePrograma,
      "Salmetexmed",
      "equipo médico México",
    ].filter(Boolean) as string[],

    robots: {
      index: hasQueryParams ? false : product.active,
      follow: true,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${product.productName} | Salmetexmed`,

      description,

      url: canonical,

      siteName: "Salmetexmed",

      locale: "es_MX",

      type: "website",

      images: [
        {
          url: image,

          width: 1200,

          height: 630,

          alt:
            product.images?.[0]
              ?.alternativeText ||
            product.productName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: `${product.productName} | Salmetexmed`,

      description,

      images: [image],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function Page({
  params,
}: Props) {
  const { productSlug } = await params;

  const product =
    await getProduct(productSlug);

  /* =========================================================
     PRODUCTO NO ENCONTRADO
  ========================================================= */

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900 mb-3">
            Producto no encontrado
          </p>

          <p className="text-gray-600">
            El producto que buscas no existe o fue eliminado.
          </p>
        </div>
      </div>
    );
  }

  const relatedProducts = product.category?.slug
    ? await getRelatedProducts(product.category.slug, productSlug)
    : [];

  /* =========================================================
     PRODUCT JSON LD
  ========================================================= */

  const productJsonLd = {
    "@context": "https://schema.org",

    "@type": "Product",

    name: product.productName,

    sku: product.documentId,

    description:
      product.textSeo ||
      product.description ||
      `${product.productName} disponible en Salmetexmed.`,

    image:
      product.images?.map(
        (img) => img.url,
      ) || [],

    url: `https://salmetexmed.com.mx/${productSlug}`,

    category:
      product.category?.categoryName ||
      "Equipo Médico",

    offers: {
      "@type": "Offer",

      priceCurrency: "MXN",

      price: product.price ?? "0",

      availability:
        product.active &&
        (product.quantity ?? 1) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      seller: {
        "@type": "Organization",

        name: "Salmetexmed",

        url: "https://salmetexmed.com.mx",
      },

      url: `https://salmetexmed.com.mx/${productSlug}`,

      priceSpecification: {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "MXN",
        "price": product.price ?? "0",
        "unitText": "MXN",
        "description": "MSI 12 meses sin intereses en tarjetas participantes",
        "valueAddedTaxIncluded": "IVA INCLUIDO"
      },
    },
  }

  /* =========================================================
     FAQ PAGE JSON LD
  ========================================================= */

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿El equipo médico incluye garantía?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, todos nuestros equipos médicos incluyen garantía oficial del fabricante. El período de garantía varía según el producto, típicamente entre 1 y 2 años para equipos principales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Realizan envío a todo México?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, enviamos a cualquier estado de la República Mexicana. Contamos con logística especializada para equipo médico sensible.",
        },
      },
      {
        "@type": "Question",
        name: "¿Ofrecen precios para compras en mayoreo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, manejamos precios especiales para distribuidores, hospitales y compras en volumen. Contáctenos por WhatsApp para una cotización personalizada.",
        },
      },
      {
        "@type": "Question",
        name: "¿Los equipos cumplen con COFEPRIS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Todos nuestros equipos médicos cuentan con registro COFEPRIS y certificaciones internacionales de calidad.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo cotizar por WhatsApp?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, puede contactarnos directamente por WhatsApp al 844 595 4660 para solicitar cotización, especificaciones técnicas o asesoría.",
        },
      },
    ],
  };

  /* =========================================================
     BREADCRUMB JSON LD
  ========================================================= */

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "Inicio",

        item: "https://salmetexmed.com.mx",
      },

      {
        "@type": "ListItem",

        position: 2,

        name:
          product.category
            ?.categoryName ||
          "Productos",

        item: `https://salmetexmed.com.mx/categoria/${product.category?.slug}`,
      },

      {
        "@type": "ListItem",

        position: 3,

        name: product.productName,

        item: `https://salmetexmed.com.mx/${productSlug}`,
      },
    ],
  };

  return (
    <>
      {/* =========================================================
          JSON-LD SEO
      ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd,
          ),
        }}
      />

      {/* =========================================================
          CLIENT COMPONENT
      ========================================================= */}

      <ProductClient
        product={product}
      />

      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <RelatedProducts
            products={relatedProducts}
            currentProductSlug={productSlug}
          />
        </div>
      )}
    </>
  );
}