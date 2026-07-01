import { cache } from "react";

export type CategorySummary = {
  categoryName: string;
  slug: string;
  description?: string;
};

const getCategoryFromProducts = cache(async (slug: string): Promise<CategorySummary | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseUrl) return null;

    if (slug === "todos") {
      return { categoryName: "Todos los Equipos Médicos", slug: "todos" };
    }
    if (slug === "la-clinica-es-nuestra") {
      return {
        categoryName: "La Clínica es Nuestra",
        slug: "la-clinica-es-nuestra",
        description: "Programa La Clínica es Nuestra - Equipamiento médico certificado",
      };
    }

    const query =
      `fields[0]=categoryName` +
      `&fields[1]=slug` +
      `&filters[category][slug][$eq]=${slug}` +
      `&pagination[pageSize]=1`;

    const res = await fetch(`${baseUrl}/api/products?${query}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const product = json?.data?.[0];
    if (!product) return null;

    return {
      categoryName: product.category?.categoryName ?? slug.replace(/-/g, " "),
      slug,
    };
  } catch {
    return null;
  }
});

export { getCategoryFromProducts };