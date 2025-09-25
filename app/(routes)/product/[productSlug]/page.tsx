import { getProductBySlug } from "@/api/getProductBySlug";
import { Metadata } from "next";
import ProductClient from "./components/product-client";

type Props = {
  params: {
    productSlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productSlug = params.productSlug;
  
  try {
    const productData = await getProductBySlug(productSlug);
    
    if (!productData || productData.length === 0) {
      return {
        title: "Producto no encontrado | Salmetexmed",
        description: "El producto que buscas no está disponible."
      };
    }
    
    const product = productData[0];
    
    return {
      title: `${product.productName} | Salmetexmed`,
      description: product.description || "Producto médico de alta calidad disponible en Salmetexmed",
      openGraph: {
        title: product.productName,
        description: product.description || "Producto médico de alta calidad",
        images: product.images && product.images.length > 0 ? [product.images[0].url] : [],
      },
    };
  } catch (error) {
    console.error("Error al generar metadatos:", error);
    return {
      title: "Detalles del Producto | Salmetexmed",
      description: "Explora nuestros productos médicos de alta calidad"
    };
  }
}

export default function Page({ params }: Props) {
  return <ProductClient />;
}