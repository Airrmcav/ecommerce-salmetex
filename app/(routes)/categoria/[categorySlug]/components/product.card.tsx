"use client";

import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Heart,
  ShoppingCart,
  PhoneCall,
} from "lucide-react";
import IconButton from "@/components/icon-button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { FaWhatsapp } from "react-icons/fa";

type ProductCardProps = {
  product: ProductType;
  viewMode?: "grid" | "list";
};

const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  const hasPrice = product.price && product.price > 0;
  const isBuyable = product.purchaseType === "buy";

  const handleWhatsApp = (productName: string, type: "quote" | "info") => {
    const message =
      type === "quote"
        ? `Hola, me interesa solicitar una cotización para: ${productName}`
        : `Hola, quiero más información sobre: ${productName}`;
    const phone = "5215512345678"; // ⚠️ REEMPLAZA CON TU NÚMERO REAL
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div
      className="relative p-0 transition-all cursor-pointer"
      onClick={() => router.push(`/${product.slug}`)}
    >
      <div className="w-full">
        <div className="py-1 px-0">
          <div className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
            <div className="p-0 h-full flex flex-col">
              {/* Imagen */}
              <div className="relative overflow-hidden bg-white h-52 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={product.images[0].url}
                      alt={
                        product.images[0].alternativeText || product.productName
                      }
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-4xl" aria-hidden="true">
                      🏥
                    </span>
                  </div>
                )}

                {/* Badge disponibilidad */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={product.active ? "default" : "secondary"}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                      product.active
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {product.active ? (
                      <CheckCircle className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <XCircle className="w-3 h-3" aria-hidden="true" />
                    )}
                    {product.active ? "Disponible" : "No Disponible"}
                  </Badge>
                </div>

                <IconButton
                  onClick={(e) => {
                    e?.stopPropagation();
                    addLoveItems(product);
                  }}
                  icon={
                    <Heart
                      className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors"
                      aria-hidden="true"
                    />
                  }
                  className="absolute top-3 left-3 p-2 rounded-full bg-gray-300/5 backdrop-blur-sm hover:bg-white transition-all duration-200"
                  aria-label={`Agregar ${product.productName} a favoritos`}
                  title="Agregar a favoritos"
                />

                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {product?.category?.categoryName || "Categoría"}
                  </Badge>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                {/* h3 correcto dentro de una lista de productos */}
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start">
                  {product.productName}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                  {product.description ||
                    "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                </p>

                {/* Precio */}
                {hasPrice && (
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(product.price!)}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">MXN</span>
                  </div>
                )}

                <div className="flex gap-2 mt-auto">
                  {isBuyable ? (
                    <>
                      {/* 🛒 Comprar */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({ ...product, quantity: 1 });
                        }}
                        className="flex-1 py-2.5 px-3 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Agregar
                      </button>

                      {/* 💬 WhatsApp secundario */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsApp(`${product.productName}`, "info");
                        }}
                        className="py-2.5 px-3 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* 📞 Cotización */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsApp(`${product.productName}`, "quote");
                        }}
                        className="flex-1 py-2.5 px-3 rounded-lg font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
                        Cotizar
                      </button>

                      {/* 💬 WhatsApp principal */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsApp(`${product.productName}`, "quote");
                        }}
                        className="py-2.5 px-3 cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
