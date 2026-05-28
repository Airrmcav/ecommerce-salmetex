export async function getCategories() {
  const url =
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories` +
    `?fields[0]=categoryName` +
    `&sort[0]=categoryName:asc`;

  const res = await fetch(url, {
    next: {
      revalidate: 86400,
    },
  });

  if (!res.ok) {
    throw new Error("Error obteniendo categorías");
  }

  const json = await res.json();

  return json.data;
}