// components/featured-products-carousel.tsx

"use client";

import { ProductType } from "@/types/product";

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

import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import IconButton from "../icon-button";
import { Badge } from "../ui/badge";

interface Props {
  products: ProductType[];
}

const FeaturedProductsCarousel = ({ products }: Props) => {
  const router = useRouter();

  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  const handleWhatsApp = (productName: string, type: "quote" | "info") => {
    const message =
      type === "quote"
        ? `Hola, me interesa solicitar una cotización para: ${productName}`
        : `Hola, quiero más información sobre: ${productName}`;

    const phone = "5215512345678";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="max-w-7xl mb-20 mx-auto sm:py-0 sm:px-6 lg:px-8">
      {/* Header */}
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
          Descubre nuestra selección de equipos médicos certificados
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {products?.map((product: ProductType) => {
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
                  <Link
                    href={
                      product.slug === "productos-destacados"
                        ? "/productos-destacados"
                        : `/${product.slug}`
                    }
                    className="block h-full"
                  >
                    <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Imagen */}
                        <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={productName}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <span className="text-4xl">🏥</span>
                            </div>
                          )}

                          {/* Status */}
                          <div className="absolute top-4 right-4">
                            <Badge
                              className={`flex items-center ${
                                active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {active ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              {active ? "Disponible" : "No Disponible"}
                            </Badge>
                          </div>

                          {/* Favorite */}
                          <IconButton
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              addLoveItems(product);
                            }}
                            icon={
                              <Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />
                            }
                            className="absolute top-3 left-3 p-2 rounded-full bg-white/80"
                            aria-label="Favoritos"
                          />

                          {/* Category */}
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-blue-600 text-white">
                              {category?.categoryName || "Categoría"}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                          <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 h-15">
                            {productName}
                          </h2>

                          <p className="text-gray-600 text-sm line-clamp-3 min-h-16">
                            {description}
                          </p>

                          {/* Price */}
                          {price > 0 && (
                            <div className="mb-4 mt-3">
                              <span className="text-2xl font-bold text-blue-600">
                                $
                                {price.toLocaleString("es-MX", {
                                  minimumFractionDigits: 2,
                                })}
                              </span>

                              <span className="text-sm text-gray-500 ml-1">
                                MXN
                              </span>
                            </div>
                          )}

                          {/* Buttons */}
                          <div className="flex gap-2 mt-auto">
                            {isBuyable ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();

                                  addItem({
                                    ...product,
                                    quantity: 1,
                                  });
                                }}
                                className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Carrito
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();

                                  handleWhatsApp(productName, "quote");
                                }}
                                className="flex-1 py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2"
                              >
                                <PhoneCall className="w-4 h-4" />
                                Cotizar
                              </button>
                            )}

                            <button
                              onClick={(e) => {
                                e.preventDefault();

                                handleWhatsApp(productName, "quote");
                              }}
                              className="py-2 px-3 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                            >
                              <FaWhatsapp className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex -left-12" />

          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>

      {/* CTA */}
      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/categoria/todos")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          Ver Todos los Productos
        </button>
      </div>
    </div>
  );
};

export default FeaturedProductsCarousel;
