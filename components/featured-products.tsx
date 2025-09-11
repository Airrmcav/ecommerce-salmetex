'use client'

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, XCircle, Star, Heart, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const {addItem, items} = useCart();
   const { addLoveItems } = useLovedProducts();
  // console.log(items);

  // console.log(result);

  return (
    <div className="max-w-7xl mb-20 mx-auto sm:py-0 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-1">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
          <Star className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Productos Destacados</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Equipos Médicos de Alta Calidad
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra selección de equipos médicos certificados, diseñados para brindar la mejor atención sanitaria
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading && (
              <SkeletonSchema grid={4} />
            )}
            {result !== null && (
              result.map((product: ProductType) => {
                const { id, images, productName, category, description, active, price } = product;
                const imageUrl = images?.[0]?.url;

                return (
                  <CarouselItem key={id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-10">
                    <div className="h-full">
                      <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
                        <CardContent className="p-0 h-full flex flex-col">
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
                                className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${active
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
                            {/* <button className="absolute top-3 left-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 group-hover:opacity-100">
                                                            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                                                        </button> */}
                            <IconButton onClick={() => addLoveItems(product)} icon={<Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />} className="absolute top-3 left-3 p-2 rounded-full bg-gray-300/5 backdrop-blur-sm hover:bg-white transition-all duration-200 group-hover:opacity-100" aria-label="Agregar a favoritos" title="Agregar a favoritos" />

                            {/* Category Badge */}
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                                {category && category.categoryName ? category.categoryName : "Categoría"}
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start">
                              {productName}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                              {description || "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                            </p>

                            {/* Price */}
                            {price && price > 0.00 && (
                              <div className="mb-4">
                                <span className="text-2xl font-bold text-blue-600">
                                  ${price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-gray-500 text-sm ml-1">MXN</span>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-auto">
                              <button
                                onClick={() => {
                                  // Verificar si el slug es "productos-destacados" y redirigir a la ruta correcta
                                  if (product.slug === "productos-destacados") {
                                    router.push(`/productos-destacados`);
                                  } else {
                                    router.push(`/product/${product.slug}`);
                                  }
                                }}
                                className={`cursor-pointer flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${active
                                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  }`}
                                disabled={!active}
                                aria-label={`Ver detalles de ${productName}`}
                              >
                                Ver Detalles
                              </button>
                              <IconButton 
                                onClick={() => {
                                  const productWithQuantity = { ...product, quantity: 1 };
                                  addItem(productWithQuantity);
                                }} 
                                icon={<ShoppingCart size={20} />} 
                                className={`${(!product.price || product.price <= 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white shadow-md hover:shadow-lg`} 
                                disabled={!product.price || product.price <= 0}
                                title={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : "Agregar al carrito"}
                                aria-label={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : `Agregar ${productName} al carrito`}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              })
            )}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="cursor-pointer hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />
          <CarouselNext className="cursor-pointer hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />
        </Carousel>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-1">
        <button
        onClick={() => router.push('/categoria/todos')}
        aria-label="Ver catálogo completo de productos médicos"
        className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          Ver Todos los Productos
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FeaturedProducts;