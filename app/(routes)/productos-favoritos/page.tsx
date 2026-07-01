import { Metadata } from "next";
import ProductosFavoritosClient from "./components/productos-favoritos-client";

export const metadata: Metadata = {
  title: "Productos Favoritos | SALMETEXMED",
  description: "Tu lista personalizada de equipos médicos de interés para futura cotización.",
  alternates: {
    canonical: "https://salmetexmed.com.mx/productos-favoritos",
  },
};

export default function PageProductosFavoritos() {
  return <ProductosFavoritosClient />;
}