"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Stethoscope,
  Heart,
  Activity,
  Users,
  Bed,
  LampCeiling,
  Microwave,
  Package,
} from "lucide-react";

export const dataCarouselTop = [
  //   {
  //     id: 1,
  //     title: "Bienvenido a SALMETEXMED",
  //     description:
  //       "Descubre nuestra amplia gama de equipos médicos de alta calidad para profesionales de la salud.",
  //     link: "/productos",
  //     image: "/logo/logo.png",
  //     ctaText: "Ver Productos",
  //     badge: "Nuevo",
  //   },
  {
    id: 7,
    title: "IMSS Bienestar",
    description:
      "Productos y equipamiento médico para IMSS Bienestar, alineados a los requerimientos del programa.",
    link: "/imm-bienestar",
    image: "carousel/imss.png",
    ctaText: "Conocer Más",
    badge: "Programa Federal",
  },
  {
    id: 8,
    title: "La clínica es Nuestra",
    description:
      "Productos y suministros para La Clínica es Nuestra, enfocados en la mejora y equipamiento de clínicas.",
    link: "/la-clinica-es-nuestra",
    image: "carousel/clinica.png",
    ctaText: "Conocer Más",
    badge: "Programa Federal",
  },
  {
    id: 2,
    title: "Lámparas de Cirugía LED",
    description:
      "Iluminación de precisión para procedimientos quirúrgicos seguros y efectivos.",
    link: "/productos/lamparas",
    image: "carousel/lampara.png",
    ctaText: "Explorar ECG",
    badge: "Destacado",
  },
  {
    id: 3,
    title: "Mesas Quirúrgicas",
    description:
      "Diseño ergonómico y funcional para facilitar procedimientos médicos complejos.",
    link: "/productos/monitores",
    image: "carousel/mesa.png",
    ctaText: "Ver Monitores",
    badge: "Popular",
  },
  {
    id: 4,
    title: "Autoclaves",
    description:
      "Esterilización confiable y eficiente para equipos médicos y quirúrgicos.",
    link: "/productos/autoclaves",
    image: "carousel/autoclave.png",
    ctaText: "Conocer Más",
    badge: "Innovación",
  },
  {
    id: 5,
    title: "Incubadoras Neonatales",
    description: "Cuidado óptimo para recién nacidos con tecnología avanzada.",
    link: "/productos/incubadoras",
    image: "carousel/incubadora.png",
    ctaText: "Conocer Más",
    badge: "Esencial",
  },
  {
    id: 6,
    title: "Monitores de Signos Vitales",
    description: "Monitoreo preciso y continuo de la salud del paciente.",
    link: "/productos/montiores",
    image: "carousel/monitor.jpg",
    ctaText: "Conocer Más",
    badge: "Esencial",
  },
];

// Datos para los círculos de enlaces
const quickLinks = [
  {
    id: 1,
    title: "Mesas de cirugía",
    link: "/categoria/mesas-quirurgicas",
    image: "/carousel/mesa.png",
  },
  {
    id: 2,
    title: "Lámparas de cirugía",
    link: "/categoria/lamparas-de-cirugia",
    image: "/carousel/lampara.png",
  },
  {
    id: 3,
    title: "Monitores",
    link: "/categoria/equipos-de-signos-vitales",
    image: "/carousel/monitor.jpg",
  },
  {
    id: 4,
    title: "Autoclaves",
    link: "/categoria/autoclaves",
    image: "/carousel/autoclave.png",
  },
  {
    id: 5,
    title: "Insumos médicos",
    link: "/insumos-medicos",
    image: "/carousel/insumos2.png",
  },
  {
    id: 6,
    title: "IMSS Bienestar",
    link: "/imss-bienestar",
    image: "/carousel/imss.png",
  },
  {
    id: 7,
    title: "La clínica es Nuestra",
    link: "/la-clinica-es-nuestra",
    image: "/carousel/clinica.png",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dataCarouselTop.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dataCarouselTop.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + dataCarouselTop.length) % dataCarouselTop.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-linear-to-br from-blue-900 to-gray-900">
      {/* Background Slides */}
      <div className="relative w-full h-full">
        {dataCarouselTop.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-blue-800 to-gray-900"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-5"></div>

            <div className="relative z-10 h-full flex items-center pt-40 md:pt-18">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="mb-3">
                      <span className="inline-flex items-center px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-blue-500/50">
                        {slide.badge}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                      {slide.title}
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div className="relative">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full max-w-md p-5 rounded-full lg:max-w-lg h-auto max-h-[350px] object-contain 
                                                         filter drop-shadow-2xl transform hover:scale-105 
                                                         transition-transform duration-500"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      <div
                        className="absolute -inset-4 bg-linear-to-r from-blue-500/20 to-purple-500/20 
                                                          rounded-3xl blur-2xl -z-10 animate-pulse"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Círculos de Enlaces Fijos - Posicionados en la parte superior */}
      <div className="absolute top-6 left-0 right-0 z-30 lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 md:gap-4 justify-center items-center flex-wrap">
            {quickLinks.map((link) => {
              return (
                <a key={link.id} href={link.link} className="group relative">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full 
                            overflow-hidden shadow-2xl
                            transform transition-all duration-300 
                            group-hover:scale-110 group-hover:shadow-3xl
                            border-4 border-white/30 backdrop-blur-sm
                            relative"
                  >
                    <img
                      src={link.image}
                      alt={link.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
                  </div>

                  {/* Título debajo del círculo */}
                  <div className="mt-2 text-center">
                    <span
                      className="text-white font-semibold text-xs md:text-sm 
                                         group-hover:text-blue-200 transition-colors duration-300
                                         drop-shadow-lg"
                    >
                      {link.title}
                    </span>
                  </div>

                  {/* Efecto de pulso decorativo */}
                  <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 
                                     w-20 h-20 md:w-24 md:h-24 rounded-full 
                                     bg-linear-to-br opacity-0 
                                     group-hover:opacity-30 group-hover:scale-125
                                     transition-all duration-500 -z-10 blur-xl`}
                  ></div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div>
        <button
          onClick={prevSlide}
          className="hidden cursor-pointer md:block absolute left-18 top-1/2 transform -translate-y-1/2 z-20
                         p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full
                         text-white hover:text-blue-200 transition-all duration-300
                         border border-white/30 hover:scale-110"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden cursor-pointer md:block absolute right-18 top-1/2 transform -translate-y-1/2 z-20
        p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full
        text-white hover:text-blue-200 transition-all duration-300
        border border-white/30 hover:scale-110"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute top-6 right-4 z-20 p-2 bg-white/20 hover:bg-white/30 
                         backdrop-blur-sm rounded-full text-white transition-all duration-300
                         border border-white/30 hover:scale-110"
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        <Play size={16} className={isPlaying ? "opacity-60" : "opacity-100"} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-25 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="flex items-center space-x-3">
          {dataCarouselTop.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full border-2 ${
                index === currentSlide
                  ? "w-12 h-3 bg-blue-500 border-blue-400"
                  : "w-3 h-3 bg-gray-400 hover:bg-gray-600 border-gray-500"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-30 right-25 z-20 hidden md:block">
        <div className="px-4 py-2 bg-white backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium border border-gray-300">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(dataCarouselTop.length).padStart(2, "0")}
        </div>
      </div>
    </main>
  );
};

export default Carousel;
