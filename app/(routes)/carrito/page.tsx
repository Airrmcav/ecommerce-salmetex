import { Metadata } from "next";
import CarritoClient from "./components/carrito-client";

export const metadata: Metadata = {
  title: "Carrito de Compras | SALMETEXMED",
  description: "Revisa tu carrito de compras de equipos médicos.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://salmetexmed.com.mx/carrito",
  },
};

export default function PageCarrito() {
  return <CarritoClient />;
}