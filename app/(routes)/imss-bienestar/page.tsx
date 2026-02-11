import { Metadata } from "next";
import IMSSClient from "./components/imss-client";

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

export default function IMSSPage() {
  return <IMSSClient />;
}
