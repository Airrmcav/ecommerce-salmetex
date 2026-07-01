import { Metadata } from "next";
import ErrorClient from "./components/error-client";

export const metadata: Metadata = {
  title: "Pago Cancelado | Salmetexmed",
  description: "Tu proceso de pago ha sido cancelado. No se realizó ningún cargo. Intenta nuevamente o contacta a nuestro equipo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PageError() {
  return <ErrorClient />;
}