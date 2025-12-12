'use client'

import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, XCircle, Star, Heart, ShoppingCart, Award, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useGetTopProducts } from "@/api/getTopProducts";
import { useLovedProducts } from "@/hooks/use-loved-products";

const TopProducts = () => {
  const { loading, result }: ResponseType = useGetTopProducts();
  const router = useRouter();
  const {addItem, items} = useCart();
  const { addLoveItems } = useLovedProducts();

  // console.log(items);
  // console.log(result);

  return (
    <section className="max-w-7xl py-8 mx-auto sm:py-1 sm:px-6 lg:px-8" role="main" aria-labelledby="top-products-heading">
      {/* Header Section */}
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full mb-4 border border-amber-200">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-800">Productos TOP</span>
        </div>
        <h2 id="top-products-heading" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Equipos Médicos en México
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Los productos más <strong> recomendados y certificados</strong> por especialistas del sector médico. Calidad garantizada y respaldo de nuestra trayectoria en el cuidado de la salud.
        </p>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Certificación COFEPRIS</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>Productos con vida útil prolongada</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Soporte técnico 24/7</span>
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <div className="relative" role="region" aria-label="Carrusel de productos más vendidos">
        {/* Mobile swipe hint */}
        <div className="md:hidden mb-4 flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 shadow-sm">
            <ChevronLeft className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-800">Desliza para ver más</span>
            <ChevronRight className="w-4 h-4 text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Desktop hint */}
        <div className="hidden md:block mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
            <ChevronLeft className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">Usa las flechas o desliza para navegar</span>
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading && (
              <SkeletonSchema grid={4} />
            )}
            {result !== null && (
              result.map((product: ProductType, index: number) => {
                const { id, images, productName, category, description, active, price } = product;
                const imageUrl = images?.[0]?.url;

                return (
                  <CarouselItem key={id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-1" role="listitem">
                    <article className="h-full" itemScope itemType="https://schema.org/Product">
                      <Card className="group h-full border-0 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
                        <CardContent className="p-0 h-full flex flex-col">
                         
                          {/* Image Container */}
                          <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={`${productName} - Equipo médico profesional más vendido`}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                itemProp="image"
                                loading={index < 4 ? "eager" : "lazy"}
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
                                {active ? "Disponible" : "Agotado"}
                              </Badge>
                            </div>

                            {/* Favorite Button */}
                            <IconButton 
                              onClick={() => addLoveItems(product)} 
                              icon={<Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />} 
                              className="absolute top-3 left-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 "
                              aria-label={`Agregar ${productName} a favoritos`}
                            />

                            {/* Category Badge */}
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                                {category && category.categoryName ? category.categoryName : "Categoría"}
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                            <h2 
                              className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start"
                              itemProp="name"
                            >
                              {productName}
                            </h2>

                            <p 
                              className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-3 min-h-[30px]"
                              itemProp="description"
                            >
                              {description || `${productName} - Equipo médico certificado de alta precisión, ideal para consultorios y hospitales. Garantía oficial y soporte técnico incluido.`}
                            </p>

                            {/* Price */}
                            {price && price > 0.00 && (
                              <div className="mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                <span className="text-2xl font-bold text-blue-600" itemProp="price">
                                  ${price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-gray-500 text-sm ml-1" itemProp="priceCurrency">MXN</span>
                                <meta itemProp="availability" content={active ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                                
                              </div>
                            )}

                           

                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-auto">
                              <button
                                onClick={() => router.push(`product/${product.slug}`)}
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
                                aria-label={`Agregar ${productName} al carrito`}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </article>
                  </CarouselItem>
                )
              })
            )}
          </CarouselContent>

          {/* Navigation Arrows - Desktop */}
          <CarouselPrevious 
            className="cursor-pointer hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" 
            aria-label="Ver productos anteriores"
          />
          <CarouselNext 
            className="cursor-pointer hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" 
            aria-label="Ver productos siguientes"
          />
          
          {/* Navigation Arrows - Mobile */}
          <CarouselPrevious className="cursor-pointer md:hidden left-2 bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600 w-10 h-10" />
          <CarouselNext className="cursor-pointer md:hidden right-2 bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600 w-10 h-10" />
        </Carousel>
      </div>

      {/* CTA Section */}
      <footer className="text-center mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¿Buscas un equipo específico?
          </h3>
          <p className="text-gray-600 mb-4">
            Explora nuestro catálogo completo con más de 1,000 productos médicos certificados
          </p>
          <button
            onClick={() => router.push('/categoria/todos')}
            className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Ver catálogo completo de equipos médicos"
          >
            Ver Catálogo Completo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Garantía oficial en todos los productos</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Más de 15,000 reseñas positivas</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-blue-500" />
            <span>Distribuidor autorizado oficial</span>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default TopProducts;