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
      `${API_URL}/api/products?fields[0]=slug&fields[1]=updatedAt&populate[images][fields][0]=url&pagination[pageSize]=1000`,
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
        (product: any) => ({
          slug: product.slug,
          updatedAt: product.updatedAt,
          image: product.images?.[0]?.url,
        }),
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
    "/nosotros",
    "/contacto",
    "/carrito",
    "/productos-favoritos",
    "/productos-destacados",
    "/blog",
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
      (product: { slug: string; updatedAt?: string; image?: string }) => ({
        url: `${BASE_URL}/${product.slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        priority: 0.7,
        ...(product.image && {
          images: [{ url: product.image, title: "Imagen del producto" }],
        }),
      }),
    ),
  ];
}