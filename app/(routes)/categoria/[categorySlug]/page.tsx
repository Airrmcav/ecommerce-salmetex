import { Metadata } from "next";
export const revalidate = 3600;
import CategoryClient from "./components/category-client";
import { ProductType } from "@/types/product";

interface Props {
  params: Promise<{
    categorySlug: string;
  }>;

  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

/* =========================================================
   FETCH PRODUCTOS OPTIMIZADO
========================================================= */

async function getInitialProducts(
  categorySlug: string,
): Promise<ProductType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!baseUrl) {
      console.error(
        "NEXT_PUBLIC_BACKEND_URL no está definida",
      );

      return [];
    }

    const query =
      `fields[0]=productName` +
      `&fields[1]=slug` +
      `&fields[2]=price` +
      `&fields[3]=description` +
      `&fields[4]=purchaseType` +
      `&fields[5]=active` +
      `&pagination[pageSize]=50` +
      `&populate[images][fields][0]=url` +
      `&populate[category][fields][0]=categoryName` +
      `&populate[category][fields][1]=slug` +
      `&populate[programa][fields][0]=namePrograma` +
      `&populate[programa][fields][1]=slug`;

    let url = "";
    if (categorySlug === "todos") {
      url = `${baseUrl}/api/products?${query}`;
    } else if (categorySlug === "la-clinica-es-nuestra") {
      url = `${baseUrl}/api/products?${query}&filters[programa][slug][$eq]=la-clinica-es-nuestra`;
    } else {
      url = `${baseUrl}/api/products?${query}&filters[category][slug][$eq]=${categorySlug}`;
    }

    const res = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      console.error(
        "Error al obtener productos:",
        res.status,
      );

      return [];
    }

    const json = await res.json();

    return json?.data ?? [];
  } catch (error) {
    console.error(
      "Error getInitialProducts:",
      error,
    );

    return [];
  }
}

/* =========================================================
   GENERATE METADATA
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { categorySlug } = await params;

  const products =
    await getInitialProducts(categorySlug);

  const categoryName =
    categorySlug === "todos"
      ? "Todos los Equipos Médicos"
      : categorySlug === "la-clinica-es-nuestra"
        ? "La Clínica es Nuestra"
        : products?.[0]?.category?.categoryName ??
          categorySlug.replace(/-/g, " ");

  const canonical =
    categorySlug === "todos"
      ? "https://salmetexmed.com.mx/categoria/todos"
      : `https://salmetexmed.com.mx/categoria/${categorySlug}`;

  return {
    title: `${categoryName} | Salmetexmed México`,

    description: `Compra equipos médicos de ${categoryName} en México. Equipos certificados, garantía y envío nacional.`,

    keywords: [
      categoryName,
      `${categoryName} México`,
      `comprar ${categoryName}`,
      `equipo médico ${categoryName}`,
      `distribuidor ${categoryName} México`,
      `proveedor B2B ${categoryName}`,
      `mayoreo ${categoryName}`,
      "Salmetexmed",
      "equipo médico México",
      "distribuidor equipo médico",
      "proveedor B2B equipo médico",
    ],

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${categoryName} | Salmetexmed México`,

      description: `Equipos médicos de ${categoryName} con envío a todo México.`,

      url: canonical,

      siteName: "Salmetexmed",

      locale: "es_MX",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title: `${categoryName} | Salmetexmed México`,

      description: `Compra equipos médicos de ${categoryName} en México.`,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function Page({
  params,
  searchParams,
}: Props) {
  const { categorySlug } = await params;

  const resolvedSearch = searchParams
    ? await searchParams
    : {};

  const initialAreaFilter =
    (resolvedSearch?.area as string) ?? "";

  const initialProducts =
    await getInitialProducts(categorySlug);

  const categoryName =
    categorySlug === "todos"
      ? "Todos los Equipos Médicos"
      : categorySlug === "la-clinica-es-nuestra"
        ? "La Clínica es Nuestra"
        : initialProducts?.[0]?.category?.categoryName ??
          categorySlug.replace(/-/g, " ");

  /* =========================================================
     JSON LD
  ========================================================= */

  const itemListJsonLd = {
    "@context": "https://schema.org",

    "@type": "ItemList",

    name: categoryName,

    url: `https://salmetexmed.com.mx/categoria/${categorySlug}`,

    numberOfItems: initialProducts.length,

    itemListElement: initialProducts
      .slice(0, 20)
      .map((product, index) => ({
        "@type": "ListItem",

        position: index + 1,

        url: `https://salmetexmed.com.mx/${product.slug}`,

        name: product.productName,
      })),
  };

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

        name: "Categorías",

        item: "https://salmetexmed.com.mx/categoria/todos",
      },

      {
        "@type": "ListItem",

        position: 3,

        name: categoryName,

        item: `https://salmetexmed.com.mx/categoria/${categorySlug}`,
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
          __html: JSON.stringify(itemListJsonLd),
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

      {/* =========================================================
          CLIENT COMPONENT
      ========================================================= */}

      <CategoryClient
        categorySlug={categorySlug}
        initialProducts={initialProducts}
        categoryName={categoryName}
        initialAreaFilter={initialAreaFilter}
      />
    </>
  );
}