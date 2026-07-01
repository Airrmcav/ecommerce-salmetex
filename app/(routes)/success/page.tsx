import { Metadata } from "next";
import SuccessClient from "./components/success-client";

export const metadata: Metadata = {
  title: "Compra Exitosa | Salmetexmed",
  description: "Tu pedido ha sido procesado correctamente. Gracias por confiar en Salmetexmed para tus equipos médicos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PageSuccess() {
  return <SuccessClient />;
}