import { Metadata } from "next";
import ClinicaClient from "./components/clinica-client";

export const metadata: Metadata = {
  title:
    "Productos y Equipamiento Médico para La Clínica es Nuestra | Salmetexmed",
  description:
    "Venta de productos y equipamiento médico para el programa La Clínica es Nuestra. Soluciones para la mejora, rehabilitación y equipamiento de clínicas.",
  openGraph: {
    title: "Productos para La Clínica es Nuestra | Salmetexmed",
    description:
      "Equipamiento, insumos y productos médicos para clínicas del programa La Clínica es Nuestra.",
    images: ["/images/default-product.jpg"],
  },
};

export default function ClinicaPage() {
  return <ClinicaClient />;
}
