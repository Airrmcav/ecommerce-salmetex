import { Metadata } from "next";
import CategoryClient from "./components/category-client";
import { ProductType } from "@/types/product";

interface Props {
  params: Promise<{ categorySlug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Fetch inicial en el servidor — Google puede leer estos productos directamente
async function getInitialProducts(categorySlug: string): Promise<ProductType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url =
      categorySlug === "todos"
        ? `${baseUrl}/api/products?populate=*`
        : `${baseUrl}/api/products?populate=*&filters[category][slug][$eq]=${categorySlug}`;

    const res = await fetch(url, {
      next: { revalidate: 60 * 10 }, // revalida cada 10 minutos
    });

    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;

  if (categorySlug === "todos") {
    return {
      title: "Todos los Equipos Médicos | Salmetexmed México",
      description:
        "Explora todo nuestro catálogo de equipos médicos: sillas de ruedas, autoclaves, incubadoras, monitores de signos vitales e insumos médicos. Distribuidor autorizado en México.",
      alternates: {
        canonical: "https://salmetexmed.com.mx/categoria/todos",
      },
      openGraph: {
        title: "Todos los Equipos Médicos | Salmetexmed México",
        description:
          "Catálogo completo de equipos médicos certificados. Envío a todo México.",
        locale: "es_MX",
        type: "website",
        siteName: "Salmetexmed",
      },
    };
  }

  const products = await getInitialProducts(categorySlug);
  const categoryName = products[0]?.category?.categoryName ?? categorySlug;

  return {
    title: `${categoryName} | Equipo Médico en México - Salmetexmed`,
    description: `Compra equipos médicos de ${categoryName} en México. Tecnología certificada, calidad garantizada y soporte técnico especializado. Distribuidor autorizado Salmetexmed.`,
    keywords: [
      categoryName,
      `${categoryName} México`,
      `comprar ${categoryName}`,
      `equipo médico ${categoryName}`,
      "Salmetexmed",
      "equipo médico México",
    ],
    alternates: {
      canonical: `https://salmetexmed.com.mx/categoria/${categorySlug}`,
    },
    openGraph: {
      title: `${categoryName} | Salmetexmed México`,
      description: `Equipos médicos de ${categoryName} con envío a todo México.`,
      locale: "es_MX",
      type: "website",
      siteName: "Salmetexmed",
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const resolvedSearch = searchParams ? await searchParams : {};
  const initialAreaFilter = (resolvedSearch?.area as string) ?? "";

  const initialProducts = await getInitialProducts(categorySlug);
  const categoryName =
    categorySlug === "todos"
      ? "Todos los Equipos Médicos"
      : initialProducts[0]?.category?.categoryName ?? categorySlug;

  // JSON-LD: ItemList con los primeros productos para que Google los indexe
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryName,
    url: `https://salmetexmed.com.mx/categoria/${categorySlug}`,
    numberOfItems: initialProducts.length,
    itemListElement: initialProducts.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://salmetexmed.com.mx/productos/${product.slug}`,
      name: product.productName,
    })),
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://salmetexmed.com.mx" },
      { "@type": "ListItem", position: 2, name: "Categorías", item: "https://salmetexmed.com.mx/categoria/todos" },
      { "@type": "ListItem", position: 3, name: categoryName, item: `https://salmetexmed.com.mx/categoria/${categorySlug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* 
        CategoryClient recibe los productos iniciales ya renderizados por el servidor.
        Los filtros y paginación siguen funcionando en cliente.
      */}
      <CategoryClient
        categorySlug={categorySlug}
        initialProducts={initialProducts}
        categoryName={categoryName}
        initialAreaFilter={initialAreaFilter}
      />
    </>
  );
}