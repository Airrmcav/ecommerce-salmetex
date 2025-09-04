'use client';
import { useGetCategories } from "@/api/getProducts";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { ArrowRight, Loader2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Router from "next/router";
import { useRouter } from "next/navigation";



const ChooseCategory = () => {
    const { result, loading, error }: ResponseType = useGetCategories();
    const router = useRouter();

    return (
        <div className="max-w-7xl py-12 mx-auto px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-800">Especialidades Médicas</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Encuentra el Equipo
                    <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Que Necesitas
                    </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Explora nuestra amplia gama de equipos médicos organizados por especialidad.
                    Cada categoría cuenta con tecnología de vanguardia certificada.
                </p>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                    <p className="text-lg text-gray-600">Cargando especialidades médicas...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-20">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                        <p className="text-red-600 font-medium mb-2">Error al cargar categorías</p>
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Categories Carousel */}
            {!loading && result && (
                <div className="relative">
                    {/* Carousel Instructions */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                            <div>
                                <p className="text-lg font-semibold text-gray-900">
                                    {result.length} Especialidades Disponibles
                                </p>
                                <p className="text-sm text-gray-600">
                                    Desliza para ver todas las categorías
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                            <span>Navegar</span>
                            <div className="flex gap-1">
                                <div className="w-6 h-4 border border-gray-300 rounded flex items-center justify-center">
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                                <span>o</span>
                                <div className="bg-gray-100 px-2 py-1 rounded text-xs">Arrastrar</div>
                            </div>
                        </div>
                    </div>

                    <Carousel className="w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {result.map((category: CategoryType) => (
                                <CarouselItem key={category.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pb-10">
                                    <div className="h-full">
                                        <Link href={`/categoria/${category.slug}`}>
                                            <Card className="group h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white rounded-3xl overflow-hidden relative cursor-pointer">
                                                <CardContent className="p-0 h-full flex flex-col relative">
                                                    {/* Decorative Elements */}
                                                    <div className="absolute top-4 right-4 z-10">
                                                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                                                            <ArrowRight className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                    </div>

                                                    {/* Image Container */}
                                                    <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                                                        {category.mainImage && category.mainImage.url ? (
                                                            <img
                                                                src={category.mainImage.url.startsWith('http') ? category.mainImage.url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`}
                                                                alt={category.categoryName}
                                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                                            />
                                                        ) : (
                                                            <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">🏥</div>
                                                        )}

                                                        {/* Animated Gradient Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>


                                                    </div>

                                                    {/* Content */}
                                                    <div className="px-3 py-2 flex-1 flex flex-col bg-gradient-to-br from-white to-blue-50/30">
                                                        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 text-center line-clamp-2 leading-tight">
                                                            {category.categoryName}
                                                        </h3>

                                                        {/* Description */}
                                                        {category.description && (
                                                            <p className="text-gray-600 text-sm text-center leading-relaxed line-clamp-3 mb-4 flex-1">
                                                                {category.description}
                                                            </p>
                                                        )}

                                                        {/* Decorative Line */}
                                                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto group-hover:w-20 transition-all duration-300"></div>
                                                    </div>

                                                    {/* Card Border Glow */}
                                                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent  group-hover:shadow-blue-400/25 transition-all duration-300"></div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Enhanced Navigation Arrows */}
                        <CarouselPrevious className="hidden md:flex -left-16 w-12 h-12 bg-white shadow-2xl border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-300 text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300" />
                        <CarouselNext className="hidden md:flex -right-16 w-12 h-12 bg-white shadow-2xl border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-300 text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300" />
                    </Carousel>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-8 gap-2">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.ceil(result.length / 4) }).map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-blue-200 hover:bg-blue-400 transition-colors cursor-pointer"></div>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-4">
                            {Math.ceil(result.length / 4)} páginas de categorías
                        </span>
                    </div>
                </div>
            )}

            {/* Bottom CTA */}
            {!loading && result && result.length > 0 && (
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            ¿No encuentras lo que buscas?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Nuestro equipo de especialistas está disponible para ayudarte a encontrar
                            el equipo médico perfecto para tus necesidades específicas.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="https://wa.me/5218445954660?text=Hola!%20Quiero%20más%20información%20sobre%20su%20servicio" // Reemplaza con tu número de WhatsApp
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Contáctanos por WhatsApp"
                                className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Consulta Personalizada
                            </Link>
                            <button
                                onClick={() => router.push('/categoria/todos')}
                                className="cursor-pointer border-2 border-blue-200 hover:border-blue-300 text-blue-600 hover:text-blue-700 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-blue-50">
                                Ver Todos los Productos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChooseCategory;