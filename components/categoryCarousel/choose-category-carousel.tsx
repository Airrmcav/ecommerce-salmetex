"use client";

import Link from "next/link";
import Image from "next/image";

import { CategoryType } from "@/types/category";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
} from "lucide-react";




import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

interface Props {
  categories: CategoryType[];
}

const ChooseCategoryCarousel = ({ categories }: Props) => {
  const router = useRouter();

  return (
    <div className="max-w-7xl py-12 mx-auto px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
          <Grid3x3 className="w-4 h-4 text-blue-600" />

          <span className="text-sm font-medium text-blue-800">
            Especialidades Médicas
          </span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Encuentra el Equipo Que Necesitas
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explora nuestra amplia gama de equipos médicos organizados por
          especialidad
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Top info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>

            <div>
              <p className="text-lg font-semibold text-gray-900">
                {categories.length} Especialidades Disponibles
              </p>

              <p className="text-sm text-gray-600 hidden sm:block">
                Desliza para ver todas las categorías
              </p>
            </div>
          </div>

          {/* Desktop hint */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
            <ChevronLeft className="w-4 h-4 text-blue-600" />

            <span className="text-sm text-blue-700 font-medium">
              Usa las flechas o desliza
            </span>

            <ChevronRight className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        {/* Mobile hint */}
        <div className="md:hidden mb-4 flex justify-center items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 shadow-sm">
            <ChevronLeft className="w-4 h-4 text-blue-600 animate-pulse" />

            <span className="text-sm font-medium text-blue-800">
              Desliza para explorar
            </span>

            <ChevronRight className="w-4 h-4 text-blue-600 animate-pulse" />
          </div>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category: CategoryType) => (
              <CarouselItem
                key={category.id}
                className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-10"
              >
                <Link
                  href={`/categoria/${category.slug}`}
                  className="block h-full"
                >
                  <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden cursor-pointer">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                        {category.mainImage?.url ? (
                          <Image
                            src={category.mainImage.url}
                            alt={category.categoryName}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-4xl">🏥</span>
                          </div>
                        )}

                        {/* Hover Arrow */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <ArrowRight className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>

                        {/* Hover text */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                            Haz clic para explorar
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col min-h-[140px]">
                        <h2 className="font-bold text-lg text-gray-900 mb-2 text-center line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-center justify-center">
                          {category.categoryName}
                        </h2>

                        {category.description && (
                          <p className="text-gray-600 text-sm text-center leading-relaxed line-clamp-2 flex-1">
                            {category.description}
                          </p>
                        )}

                        {/* Decorative line */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mt-3 group-hover:w-20 transition-all duration-300"></div>

                        {/* Button */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-full py-2 px-3 rounded-lg font-medium text-sm text-center bg-blue-600 text-white shadow-md">
                            Ver Categoría
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop */}
          <CarouselPrevious className="cursor-pointer hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />

          <CarouselNext className="cursor-pointer hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />

          {/* Mobile */}
          <CarouselPrevious className="cursor-pointer md:hidden left-2 bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600 w-10 h-10" />

          <CarouselNext className="cursor-pointer md:hidden right-2 bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600 w-10 h-10" />
        </Carousel>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="flex items-center gap-1">
            {Array.from({
              length: Math.ceil(categories.length / 4),
            }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-200"
              ></div>
            ))}
          </div>

          <span className="text-xs text-gray-500 ml-4">
            {Math.ceil(categories.length / 4)} páginas de categorías
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encuentras lo que buscas?
          </h3>

          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de especialistas está disponible para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/5218445954660"
              target="_blank"
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Consulta Personalizada
            </Link>

            <button
              onClick={() => router.push("/categoria/todos")}
              className="cursor-pointer border-2 border-blue-200 hover:border-blue-300 text-blue-600 hover:text-blue-700 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-blue-50"
            >
              Ver Todos los Productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCategoryCarousel;