// lib/get-featured-products.ts

export async function getFeaturedProducts() {
  const url =
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products` +
    `?filters[isFeatured][$eq]=true` +
    `&pagination[pageSize]=8` +
    `&fields[0]=productName` +
    `&fields[1]=slug` +
    `&fields[2]=description` +
    `&fields[3]=active` +
    `&fields[4]=price` +
    `&fields[5]=purchaseType` +
    `&populate[images][fields][0]=url` +
    `&populate[category][fields][0]=categoryName`;

  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos destacados");
  }

  const json = await res.json();

  return json.data;
}