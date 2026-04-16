"use client";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const miniCarouselItems = [
  {
    id: 1,
    title: "Mesas quirúrgicas",
    image: "/miniCarousel/1.jpeg",
  },
  {
    id: 2,
    title: "Lámparas de cirugía",
    image: "/miniCarousel/2.jpeg",
  },
  {
    id: 3,
    title: "Monitores",
    image: "/miniCarousel/3.jpeg",
  },
  {
    id: 4,
    title: "Autoclaves",
    image: "/miniCarousel/4.jpeg",
  },
];

const glassStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(0, 30, 90, 0.85), rgba(0, 60, 150, 0.65))",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const ITEM_WIDTH = 140;

export default function MiniCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Solo posiciona una vez, sin lógica de movimiento
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(0px)`;
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative z-20 ">
      <div
        className="inline-flex rounded-2xl overflow-hidden"
        style={{
          ...glassStyle,
          boxShadow:
            "0 8px 15px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div className="relative flex items-center h-full px-2">
          {/* Botón izquierda (decorativo) */}
          <button
            disabled
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full opacity-40 cursor-default"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <ChevronLeft size={16} className="text-white" />
          </button>

          {/* Track estático */}
          <div
            className="relative overflow-hidden mx-1"
            style={{ width: ITEM_WIDTH * miniCarouselItems.length }}
          >
            <div ref={trackRef} className="flex">
              {miniCarouselItems.map((item) => (
                <div
                  key={item.id}
                  style={{ width: ITEM_WIDTH, flexShrink: 0 }}
                  className="flex flex-col items-center justify-center gap-2 py-2 px-2
                             border-r border-transparent last:border-r-0
                             hover:bg-tra transition-colors duration-200 group"
                >
                  <div
                    className="object-contain h-22 overflow-hidden shrink-0 transition-all duration-200"
                    style={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón derecha (decorativo) */}
          <button
            disabled
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full opacity-40 cursor-default"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}