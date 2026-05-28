import { MetadataRoute } from "next";

export const revalidate = 86400; // 24h

const BASE_URL =
  "https://salmetexmed.com.mx";

const API_URL =
  process.env
    .NEXT_PUBLIC_BACKEND_URL ||
  "https://backend-ecommerce-production-fb02.up.railway.app";

async function getProducts() {
  try {
    const res = await fetch(
      `${API_URL}/api/products?fields[0]=slug&pagination[pageSize]=1000`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    return (
      json?.data?.map(
        (product: any) =>
          product.slug,
      ) || []
    );
  } catch (error) {
    console.error(
      "Error sitemap productos:",
      error,
    );

    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(
      `${API_URL}/api/categories?fields[0]=slug&pagination[pageSize]=500`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    return (
      json?.data?.map(
        (category: any) =>
          category.slug,
      ) || []
    );
  } catch (error) {
    console.error(
      "Error sitemap categorías:",
      error,
    );

    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] =
    await Promise.all([
      getProducts(),
      getCategories(),
    ]);

  /*
  =========================================
  FECHA FIJA PARA EVITAR
  REINDEXACIONES INNECESARIAS
  =========================================
  */
  const lastModified =
    "2026-05-28";

  const staticPages = [
    "",
    "/productos-destacados",
    "/blog",
    "/imss-bienestar",
    "/la-clinica-es-nuestra",
  ];

  return [
    /*
    =========================================
    HOME + ESTÁTICAS
    =========================================
    */
    ...staticPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified,
      priority:
        path === ""
          ? 1
          : 0.8,
    })),

    /*
    =========================================
    CATEGORÍAS
    =========================================
    */
    ...categories.map(
      (slug: string) => ({
        url: `${BASE_URL}/categoria/${slug}`,
        lastModified,
        priority: 0.8,
      }),
    ),

    /*
    =========================================
    PRODUCTOS
    =========================================
    */
    ...products.map(
      (slug: string) => ({
        url: `${BASE_URL}/${slug}`,
        lastModified,
        priority: 0.7,
      }),
    ),
  ];
}