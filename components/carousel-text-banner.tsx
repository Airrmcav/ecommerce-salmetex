'use client'
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dataCarouselTop = [
    {
        id: 1,
        title: "Bienvenido a SALMETEXMED",
        description: "Descubre nuestra amplia gama de equipos médicos de alta calidad para profesionales de la salud.",
        link: "/productos",
        image: "/logo/logo.png",
        ctaText: "Ver Productos",
        badge: "Nuevo"
    },
    {
        id: 2,
        title: "Lámparas de Cirugía LED",
        description: "Iluminación de precisión para procedimientos quirúrgicos seguros y efectivos.",
        link: "/productos/lamparas",
        image: "carousel/lampara.png",
        ctaText: "Explorar ECG",
        badge: "Destacado"
    },
    {
        id: 3,
        title: "Mesas Quirúrgicas",
        description: "Diseño ergonómico y funcional para facilitar procedimientos médicos complejos.",
        link: "/productos/monitores",
        image: "carousel/mesa.png",
        ctaText: "Ver Monitores",
        badge: "Popular"
    },
    {
        id: 4,
        title: "Autoclaves",
        description: "Esterilización confiable y eficiente para equipos médicos y quirúrgicos.",
        link: "/productos/autoclaves",
        image: "carousel/autoclave.png",
        ctaText: "Conocer Más",
        badge: "Innovación"
    },
     {
        id: 5,
        title: "Incubadoras Neonatales",
        description: "Cuidado óptimo para recién nacidos con tecnología avanzada.",
        link: "/productos/incubadoras",
        image: "carousel/incubadora.png",
        ctaText: "Conocer Más",
        badge: "Esencial"
    },
    {
        id: 6,
        title: "Monitores de Signos Vitales",
        description: "Monitoreo preciso y continuo de la salud del paciente.",
        link: "/productos/montiores",
        image: "carousel/monitor.jpg",
        ctaText: "Conocer Más",
        badge: "Esencial"
    }
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % dataCarouselTop.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % dataCarouselTop.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + dataCarouselTop.length) % dataCarouselTop.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <main className="relative -top-20 w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 to-gray-900">
            {/* Background Slides */}
            <div className="relative w-full h-full">
                {dataCarouselTop.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            index === currentSlide 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                        }`}
                    >
                        {/* Background with Gradient Only */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900"></div>

                        {/* NUEVO: Degradado blanco en la parte inferior */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-5"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center ">
                            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                    {/* Text Content */}
                                    <div className="order-2 lg:order-1">
                                        {/* Badge */}
                                        <div className="mb-3">
                                            <span className="inline-flex items-center px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-blue-500/50">
                                                {slide.badge}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                            {slide.title}
                                        </h1>

                                        {/* Description */}
                                        <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                                            {slide.description}
                                        </p>

                                        
                                    </div>

                                    {/* Product Image */}
                                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                                        <div className="relative">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full max-w-md lg:max-w-lg h-auto max-h-[350px] object-contain 
                                                         filter drop-shadow-2xl transform hover:scale-105 
                                                         transition-transform duration-500"
                                                loading={index === 0 ? "eager" : "lazy"}
                                            />
                                            {/* Decorative Elements */}
                                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                                          rounded-3xl blur-2xl -z-10 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hidden md:block absolute left-15 top-1/2 transform -translate-y-1/2 z-20
                         p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full
                         text-white hover:text-blue-200 transition-all duration-300
                         border border-white/30 hover:scale-110"
                aria-label="Anterior"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="hidden md:block absolute right-15 top-1/2 transform -translate-y-1/2 z-20
                         p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full
                         text-white hover:text-blue-200 transition-all duration-300
                         border border-white/30 hover:scale-110"
                aria-label="Siguiente"
            >
                <ChevronRight size={24} />
            </button>

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                className="absolute top-30 right-4 z-20 p-2 bg-white/20 hover:bg-white/30 
                         backdrop-blur-sm rounded-full text-white transition-all duration-300
                         border border-white/30 hover:scale-110"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
                <Play size={16} className={isPlaying ? "opacity-60" : "opacity-100"} />
            </button>

            {/* Dots Indicator - Ajustado para estar sobre el degradado */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
                <div className="flex items-center space-x-3">
                    {dataCarouselTop.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full border-2 ${
                                index === currentSlide
                                    ? 'w-12 h-3 bg-blue-500 border-blue-400'
                                    : 'w-3 h-3 bg-gray-400 hover:bg-gray-600 border-gray-500'
                            }`}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Progress Bar - Mantiene su posición original */}
            <div className="absolute bottom-30 left-0 w-full h-1 bg-black/30 z-10">
                <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-linear"
                    style={{ 
                        width: isPlaying ? `${((currentSlide + 1) / dataCarouselTop.length) * 100}%` : '0%' 
                    }}
                />
            </div>

            {/* Slide Counter - Ajustado para estar sobre el degradado */}
            <div className="absolute bottom-40 right-8 z-20 hidden md:block">
                <div className="px-4 py-2 bg-white backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium border border-gray-300">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(dataCarouselTop.length).padStart(2, '0')}
                </div>
            </div>
        </main>
    );
};

export default Carousel;