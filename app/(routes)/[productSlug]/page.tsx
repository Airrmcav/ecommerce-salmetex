import { getProductBySlug } from "@/api/getProductBySlug";
import { Metadata } from "next";
import ProductClient from "./components/product-client";
import { ProductType } from "@/types/product";

interface Props {
  params: Promise<{
    productSlug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const productSlug = resolvedParams.productSlug;

  try {
    const productData = await getProductBySlug(productSlug);

    if (!productData || productData.length === 0) {
      return {
        title: "Producto no encontrado | Salmetexmed",
        description: "El producto que buscas no está disponible en Salmetexmed.",
        robots: { index: false, follow: false },
      };
    }

    const product: ProductType = productData[0];

    const fallbackDescription = `Compra ${product.productName} en Salmetexmed. Equipo médico de alta calidad con envío a todo México. Distribuidor autorizado con más de una década de experiencia.`;

    const rawDescription = product.textSeo || product.description || fallbackDescription;
    const description = rawDescription.length > 160
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

  let jsonLd = null;

  try {
    const productData = await getProductBySlug(resolvedParams.productSlug);
    const product: ProductType | undefined = productData?.[0];

    if (product) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.productName,
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
        // Si el producto pertenece a un programa (ej. IMSS Bienestar), lo incluimos
        ...(product.programa && {
          isRelatedTo: {
            "@type": "Thing",
            name: product.programa.namePrograma,
            description: product.programa.description,
          },
        }),
      };
    }
  } catch (error) {
    console.error("Error al generar JSON-LD:", error);
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductClient />
    </>
  );
}