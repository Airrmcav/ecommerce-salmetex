import { Metadata } from "next";
import { Suspense } from "react";
import ClinicaClient from "./components/clinica-client";
import { ProductType } from "@/types/product";
import SkeletonSchema from "@/components/skeletonSchema";

export const metadata: Metadata = {
  title: "Productos y Equipamiento Médico para La Clínica es Nuestra | Salmetexmed",
  description:
    "Venta de productos y equipamiento médico para el programa La Clínica es Nuestra. Soluciones para la mejora, rehabilitación y equipamiento de clínicas.",
  openGraph: {
    title: "Productos para La Clínica es Nuestra | Salmetexmed",
    description:
      "Equipamiento, insumos y productos médicos para clínicas del programa La Clínica es Nuestra.",
    images: ["/images/default-product.jpg"],
  },
};

async function getInitialProducts(): Promise<ProductType[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!baseUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL no está definida");
      return [];
    }

    const query =
      `fields[0]=productName` +
      `&fields[1]=slug` +
      `&fields[2]=price` +
      `&fields[3]=description` +
      `&fields[4]=purchaseType` +
      `&fields[5]=active` +
      `&filters[programa][$eq]=clinica` +
      `&pagination[pageSize]=1000` +
      `&populate[images][fields][0]=url` +
      `&populate[category][fields][0]=categoryName`;

    const res = await fetch(`${baseUrl}/api/products?${query}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Error fetching Clínica products:", res.status);
      return [];
    }

    const json = await res.json();
    return json?.data ?? [];
  } catch (error) {
    console.error("Error in getInitialProducts:", error);
    return [];
  }
}

export default async function ClinicaPage() {
  const initialProducts = await getInitialProducts();

  return (
    <Suspense fallback={<SkeletonSchema grid={12} />}>
      <ClinicaClient initialProducts={initialProducts} />
    </Suspense>
  );
}