// ─── MainCarousel.tsx ───────────────────────────────────────────────────────
"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Check,
  MessageCircle,
  CreditCard,
  Zap,
} from "lucide-react";

export const dataCarouselTop = [
  {
    id: 1,
    title: "Genera Ingresos con tu ultrasonido en tu consultorio",
    subtitle: "Recupera tu inversión en pocos meses",
    description: "ULTRASONIDO PORTÁTIL PARA USO HUMANO DP20 MARCA MINDRAY",
    features: [
      "Listo para trabajar desde el primer día",
      "Ideal para consultorios",
    ],
    link: "/la-clinica-es-nuestra",
    image: "miniCarousel/2.png",
    ctaText: "Cotiza por WhatsApp Ahora",
    badge: "EQUIPO MÉDICO",
    phone: "844 595 4660",
    website: "www.salmetexmed.com.mx",
  },
  {
    id: 2,
    title: "Equipa tu consultorio con tecnología médica",
    subtitle: "Recupera tu inversión en pocos meses",
    description: "MONITOR DE SIGNOS VITALES A COLOR DE 7' MARCA XIGNAL",
    features: [
      "Ideal para consultorios y clínicas",
      "Listo para uso inmediato",
      "Monitoreo rápido y preciso",
    ],
    link: "/la-clinica-es-nuestra",
    image: "carousel/monitor.webp",
    ctaText: "Cotiza por WhatsApp Ahora",
    badge: "EQUIPO MÉDICO",
    phone: "844 595 4660",
    website: "www.salmetexmed.com.mx",
  },
  {
    id: 3,
    title: "Iluminación Quirúrgica Profesional para quirófano",
    subtitle: "Stock Disponible",
    description: "Lampara de cirugía sin sombreado de 1 brazoL",
    features: [
      "Iluminación clara y precisa",
      "Uso médico profesional",
      "Calidad para uso clínico",
    ],
    link: "/la-clinica-es-nuestra",
    image: "carousel/lampara.png",
    ctaText: "Cotiza por WhatsApp Ahora",
    badge: "EQUIPO MÉDICO",
    phone: "844 595 4660",
    website: "www.salmetexmed.com.mx",
  },
];

export default function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dataCarouselTop.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % dataCarouselTop.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + dataCarouselTop.length) % dataCarouselTop.length,
    );
  const goToSlide = (index: number) => setCurrentSlide(index);

  const slide = dataCarouselTop[currentSlide];

  return (
    // FIX 1: Altura mínima explícita para que absolute inset-0 funcione correctamente
    <div className="relative w-full min-h-[480px] md:min-h-[410px] overflow-hidden">
      {dataCarouselTop.map((slide, index) => (
        <div
          key={slide.id}
          // FIX 2: pointer-events-none en slides ocultos para evitar clicks fantasma
          className={`absolute inset-0 max-w-7xl mx-auto transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          {/* Contenido principal */}
          <div className="relative z-10 h-full flex flex-col px-2 ">
            {/* Header con título */}
            <div className="shrink-0 text-center">
              <div className="inline-block">
                {/* FIX 3: border-1 no es clase Tailwind válida → cambiado a border */}
                <div className="max-w-3xl mx-auto px-4 py-2 md:px-6 md:py-3 rounded-2xl border border-blue-600 backdrop-blur-sm">
                  <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-blue-900 uppercase tracking-wide leading-tight">
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className="text-xs md:text-sm text-blue-700 mt-1 md:mt-2 font-semibold">
                      💰 {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contenido central */}
            <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-2 md:gap-6 min-h-0">
              <div className="hidden lg:flex flex-col justify-center space-y-1 md:space-y-2 w-1/4 px-2">
                <p className="text-blue-800 font-semibold text-xs md:text-sm uppercase tracking-wide mb-3 md:mb-6">
                  {slide.description}
                </p>
                {slide.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1 md:gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-blue-800 text-xs md:text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Columna central - Imagen */}
              <div className="flex-1 flex items-center justify-center relative min-h-0 px-2">
                <div className="relative z-10 w-full flex items-center justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full"
                    // FIX 4: Reducida altura máx para que no tape el footer
                    style={{ maxHeight: "320px", objectFit: "contain" }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>

              {/* Columna derecha - MSI + Disponibilidad */}
              <div className="hidden lg:flex flex-col items-center justify-center w-1/4 px-2 space-y-3">
                <div className="group perspective-1000 w-full max-w-[160px]">
                  <div className="relative transform-gpu transition-all duration-700 transform-style-preserve-3d group-hover:rotate-y-12 group-hover:rotate-x-6">
                    <div className="text-blue-900 font-bold text-xs md:text-sm mb-1">
                      MESES
                    </div>
                    <div className="text-blue-700 font-bold text-sm md:text-lg mb-2">
                      SIN INTERESES
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-blue-600 rounded-lg md:rounded-xl p-2 md:p-3 text-center text-white shadow-lg">
                      <div className="flex items-center">
                        <CreditCard
                          size={24}
                          className="mx-auto mb-1 md:mb-2"
                        />
                        <div className="text-[10px] md:text-sm uppercase tracking-wider mb-0 md:mb-1">
                          Credit Card
                        </div>
                      </div>
                      <div className="text-xl md:text-2xl font-bold">MSI</div>
                      <span className="text-[10px]">0000 0000 0000 0000</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl -z-10 rounded-2xl transform translate-y-2" />
                  </div>
                </div>

                <div className="p-1 text-center w-full max-w-[160px] flex gap-1 items-center">
                  <div className="flex items-center justify-center gap-1 md:gap-2 text-orange-600">
                    <Zap size={16} className="md:w-5 md:h-5 fill-orange-500" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-wide">
                      Disponibilidad
                    </span>
                  </div>
                  <span className="text-orange-700 font-bold text-sm md:text-base">
                    INMEDIATA
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 mt-2 md:mt-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 px-2">
              <a
                href={`https://wa.me/${slide.phone.replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle size={16} className="md:w-5 md:h-5" />
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-xs uppercase font-semibold leading-tight">
                    Cotiza por WhatsApp
                  </span>
                  <span className="text-xs md:text-sm font-bold leading-tight">
                    {slide.phone}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-2 md:left-30 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm text-blue-900 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-2 md:right-20 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm text-blue-900 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Play/Pause */}
      {/* FIX 7: Icono correcto según estado — Pause cuando reproduce, Play cuando está pausado */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-2 right-2 md:top-4 md:right-4 z-20 p-1.5 md:p-2 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm text-blue-900 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>

      {/* Dots */}
      {/* FIX 8: bottom-3 en lugar de bottom-16/20 para que queden al fondo */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {dataCarouselTop.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-2 md:w-5 md:h-1 bg-blue-600"
                : "w-2 h-2 md:w-1 md:h-1 bg-blue-400/60 hover:bg-blue-500/80"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Estilos para efecto 3D */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .rotate-x-6 {
          transform: rotateX(17deg);
        }
      `}</style>
    </div>
  );
}
