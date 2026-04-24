"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  CheckCircle,
  XCircle,
  Star,
  Heart,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  PhoneCall,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  // ✅ Función WhatsApp (personaliza el número)
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
    <div className="max-w-7xl mb-20 mx-auto sm:py-0 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-1">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
          <Star className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Casos de Éxito
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Equipos Médicos de Alta Calidad
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra selección de equipos médicos certificados, diseñados
          para brindar la mejor atención sanitaria
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        {/* Mobile swipe hint */}
        <div className="md:hidden mb-4 flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 shadow-sm">
            <ChevronLeft className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-800">
              Desliza para ver más
            </span>
            <ChevronRight className="w-4 h-4 text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Desktop hint */}
        <div className="hidden md:block mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
            <ChevronLeft className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">
              Usa las flechas o desliza para navegar
            </span>
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading && <SkeletonSchema grid={4} />}
            {result !== null &&
              result.map((product: ProductType) => {
                const {
                  id,
                  images,
                  productName,
                  category,
                  description,
                  active,
                  price,
                  purchaseType,
                } = product;
                const imageUrl = images?.[0]?.url;
                const isBuyable = purchaseType === "buy";

                return (
                  <CarouselItem
                    key={id}
                    className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-10"
                  >
                    <div
                      className="h-full cursor-pointer"
                      onClick={() => {
                        router.push(
                          product.slug === "productos-destacados"
                            ? `/productos-destacados`
                            : `/${product.slug}`,
                        );
                      }}
                    >
                      <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
                        <CardContent className="p-0 h-full flex flex-col px-10 md:px-0">
                          {/* Image Container */}
                          <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={productName}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <span className="text-4xl">🏥</span>
                              </div>
                            )}

                            {/* Availability Badge */}
                            <div className="absolute top-4 right-4">
                              <Badge
                                variant={active ? "default" : "secondary"}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                                  active
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                                }`}
                              >
                                {active ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <XCircle className="w-3 h-3" />
                                )}
                                {active ? "Disponible" : "No Disponible"}
                              </Badge>
                            </div>

                            {/* Favorite Button */}
                            <IconButton
                              onClick={(e) => {
                                e?.stopPropagation();
                                addLoveItems(product);
                              }}
                              icon={
                                <Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />
                              }
                              className="absolute top-3 left-3 p-2 rounded-full bg-gray-300/5 backdrop-blur-sm hover:bg-white transition-all duration-200 group-hover:opacity-100"
                              aria-label="Agregar a favoritos"
                              title="Agregar a favoritos"
                            />

                            {/* Category Badge */}
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                                {category?.categoryName || "Categoría"}
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex-1 flex flex-col min-h-[140px]">
                            <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-14 flex items-start">
                              {productName}
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-10">
                              {description ||
                                "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                            </p>

                            {/* Price */}
                            {price && price > 0.0 && (
                              <div className="mb-4">
                                <span className="text-2xl font-bold text-blue-600">
                                  $
                                  {price.toLocaleString("es-MX", {
                                    minimumFractionDigits: 2,
                                  })}
                                </span>
                                <span className="text-gray-500 text-sm ml-1">
                                  MXN
                                </span>
                              </div>
                            )}
                            <div className="flex gap-2 mt-auto">
                              {isBuyable ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addItem({ ...product, quantity: 1 });
                                  }}
                                  className="flex-1 py-2.5 px-3 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  Agregar al carrito
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleWhatsApp(productName, "quote");
                                  }}
                                  className="flex-1 py-2.5 px-3 rounded-lg font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                  <PhoneCall className="w-4 h-4" />
                                  Solicitar cotización
                                </button>
                              )}

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleWhatsApp(productName, "quote");
                                }}
                                className=" py-2.5 px-3 rounded-lg font-medium text-sm bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                              >
                                <FaWhatsapp className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>

          {/* Navigation Arrows - Desktop */}
          <CarouselPrevious className="cursor-pointer hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />
          <CarouselNext className="cursor-pointer hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />

          {/* Navigation Arrows - Mobile */}
          <CarouselPrevious className="cursor-pointer md:hidden left-2 bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600 w-10 h-10" />
          <CarouselNext className="cursor-pointer md:hidden right-2 bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600 w-10 h-10" />
        </Carousel>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-1">
        <button
          onClick={() => router.push("/categoria/todos")}
          aria-label="Ver catálogo completo de productos médicos"
          className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Ver Todos los Productos
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
