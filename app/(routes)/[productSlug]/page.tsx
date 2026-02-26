import { getProductBySlug } from "@/api/getProductBySlug";
import { Metadata } from "next";
import { cache } from "react";
import ProductClient from "./components/product-client";
import { ProductType } from "@/types/product";

interface Props {
  params: Promise<{
    productSlug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}
const getProduct = cache(async (slug: string): Promise<ProductType | null> => {
  const data = await getProductBySlug(slug);
  return data?.[0] ?? null;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const productSlug = resolvedParams.productSlug;

  try {
    const product = await getProduct(productSlug);

    if (!product) {
      return {
        title: "Producto no encontrado | Salmetexmed",
        description: "El producto que buscas no está disponible en Salmetexmed.",
        robots: { index: false, follow: false },
      };
    }

    const fallbackDescription = `Compra ${product.productName} en Salmetexmed. Equipo médico de alta calidad con envío a todo México. Distribuidor autorizado con más de una década de experiencia.`;

    const rawDescription = product.textSeo || product.description || fallbackDescription;
    const description =
      rawDescription.length > 160
        ? rawDescription.slice(0, rawDescription.lastIndexOf(" ", 155)) + "..."
        : rawDescription;

    const keywords = [
      product.productName,
      `comprar ${product.productName}`,
      `${product.productName} precio`,
      `${product.productName} México`,
      product.category?.categoryName || "equipo médico",
      product.programa?.namePrograma || null,
      product.area || null,
      "Salmetexmed",
      "equipo médico México",
      "insumos médicos",
    ].filter(Boolean) as string[];

    return {
      title: `${product.productName} | ${product.category?.categoryName} - Salmetexmed`,
      description,
      keywords,
      // No indexar productos inactivos
      robots: {
        index: product.active,
        follow: true,
      },
      alternates: {
        canonical: `https://salmetexmed.com.mx/productos/${productSlug}`,
      },
      openGraph: {
        title: `${product.productName} | Salmetexmed México`,
        description,
        images:
          product.images && product.images.length > 0
            ? [
                {
                  url: product.images[0].url,
                  width: 800,
                  height: 600,
                  alt: product.images[0].alternativeText || product.productName,
                },
              ]
            : [
                {
                  url: "https://salmetexmed.com.mx/og-image.jpg",
                  width: 1200,
                  height: 630,
                  alt: "Salmetexmed - Equipo Médico",
                },
              ],
        type: "website",
        locale: "es_MX",
        siteName: "Salmetexmed",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.productName} | Salmetexmed México`,
        description,
        images:
          product.images && product.images.length > 0
            ? [product.images[0].url]
            : ["https://salmetexmed.com.mx/og-image.jpg"],
      },
    };
  } catch (error) {
    console.error("Error al generar metadatos:", error);
    return {
      title: "Detalles del Producto | Salmetexmed",
      description:
        "Explora nuestros productos médicos de alta calidad. Sillas de ruedas, autoclaves, incubadoras, monitores de signos vitales e insumos médicos en México.",
    };
  }
}

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params;
  if (searchParams) await searchParams;

  let productJsonLd = null;
  let breadcrumbJsonLd = null;

  try {
    // Gracias al cache, no hace una segunda llamada a la API
    const product = await getProduct(resolvedParams.productSlug);

    if (product) {
      // Schema de Producto
      productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.productName,
        sku: product.documentId,
        description:
          product.textSeo ||
          product.description ||
          `${product.productName} disponible en Salmetexmed México.`,
        image: product.images?.map((img) => img.url) || [],
        url: `https://salmetexmed.com.mx/productos/${resolvedParams.productSlug}`,
        category: product.category?.categoryName || "Equipo Médico",
        offers: {
          "@type": "Offer",
          priceCurrency: "MXN",
          ...(product.price && { price: product.price }),
          availability:
            product.active && (product.quantity ?? 1) > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: `https://salmetexmed.com.mx/productos/${resolvedParams.productSlug}`,
          seller: {
            "@type": "Organization",
            name: "Salmetexmed",
            url: "https://salmetexmed.com.mx",
          },
        },
        ...(product.programa && {
          isRelatedTo: {
            "@type": "Thing",
            name: product.programa.namePrograma,
            description: product.programa.description,
          },
        }),
      };

      // Schema de Breadcrumb — aparece en Google como:
      // salmetexmed.com.mx > [Categoría] > [Producto]
      breadcrumbJsonLd = {
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
            name: product.category?.categoryName || "Productos",
            item: `https://salmetexmed.com.mx/categorias/${product.category?.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.productName,
            item: `https://salmetexmed.com.mx/productos/${resolvedParams.productSlug}`,
          },
        ],
      };
    }
  } catch (error) {
    console.error("Error al generar JSON-LD:", error);
  }

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <ProductClient />
    </>
  );
}