export async function getAllProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`;

  try {
    const res = await fetch(url, {
      cache: "no-store", 
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