import { Metadata } from "next";
import NotFoundClient from "./components/not-found-client";

export const metadata: Metadata = {
  title: "Página No Encontrada | Salmetexmed",
  description: "La página que buscas no existe o ha sido movida. Encuentra equipos médicos certificados en Salmetexmed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}