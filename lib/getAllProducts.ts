export async function getAllProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?` +
    `fields[0]=productName` +
    `&fields[1]=slug` +
    `&fields[2]=description` +
    `&fields[3]=price` +
    `&fields[4]=active` +
    `&fields[5]=purchaseType` +
    `&populate[images][fields][0]=url` +
    `&populate[category][fields][0]=categoryName` +
    `&pagination[pageSize]=100`;

  try {
    const res = await fetch(url, {
      next: {
        revalidate: 3600, // 1 hora
      },
    });

    if (!res.ok) {
      throw new Error("Error fetching products");
    }

    const json = await res.json();

    return json.data;
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    return [];
  }
}