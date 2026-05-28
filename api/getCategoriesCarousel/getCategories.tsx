// lib/get-categories.ts

export async function getCategories() {
  const url =
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories` +
    `?pagination[pageSize]=24` +
    `&fields[0]=categoryName` +
    `&fields[1]=slug` +
    `&fields[2]=description` +
    `&populate[mainImage][fields][0]=url`;

  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener categorías");
  }

  const json = await res.json();

  return json.data;
}