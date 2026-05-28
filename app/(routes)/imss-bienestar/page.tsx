import { Metadata } from "next";
import IMSSClient from "./components/imss-client";
import { ProductType } from "@/types/product";

export const metadata: Metadata = {
  title: "Productos y Equipamiento Médico para IMSS Bienestar | Salmetexmed",
  description:
    "Venta de productos y equipamiento médico para IMSS Bienestar. Soluciones para clínicas y unidades médicas conforme a los requerimientos del programa.",
  openGraph: {
    title: "Productos para IMSS Bienestar | Salmetexmed",
    description:
      "Equipamiento, insumos y productos médicos para clínicas del programa IMSS Bienestar.",
    images: ["/images/default-product.jpg"],
  },
};

async function getInitialProducts(): Promise<ProductType[]> {
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
      `&filters[programa][$eq]=imss` +
      `&pagination[pageSize]=1000` +
      `&populate[images][fields][0]=url` +
      `&populate[category][fields][0]=categoryName`;

    const res = await fetch(
      `${baseUrl}/api/products?${query}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!res.ok) {
      console.error(
        "Error fetching IMSS products:",
        res.status,
      );
      return [];
    }

    const json = await res.json();
    return json?.data ?? [];
  } catch (error) {
    console.error(
      "Error in getInitialProducts:",
      error,
    );
    return [];
  }
}

export default async function IMSSPage() {
  const initialProducts = await getInitialProducts();
  return <IMSSClient initialProducts={initialProducts} />;
}
