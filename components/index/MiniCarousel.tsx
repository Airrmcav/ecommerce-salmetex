"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export const miniCarouselItems = [
  { id: 1, title: "Mesas quirúrgicas", image: "/miniCarousel/1.jpeg" },
  { id: 2, title: "Lámparas de cirugía", image: "/miniCarousel/2.jpeg" },
  { id: 3, title: "Monitores", image: "/miniCarousel/3.jpeg" },
  { id: 4, title: "Autoclaves", image: "/miniCarousel/4.jpeg" },
];

const glassStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(0, 30, 90, 0.85), rgba(0, 60, 150, 0.65))",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const ITEM_WIDTH = 190;

type CarouselItem = (typeof miniCarouselItems)[number];

export default function MiniCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<CarouselItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  const openModal = useCallback((item: CarouselItem) => {
    setImgSize(null);
    setActiveItem(item);
    setIsClosing(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveItem(null);
      setIsClosing(false);
      setImgSize(null);
    }, 350);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeItem) closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeItem, closeModal]);

  useEffect(() => {
    document.body.style.overflow = activeItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  // Calcula width/height respetando el aspecto real de la imagen
  const getModalSize = () => {
    if (!imgSize)
      return {
        width: undefined as number | undefined,
        height: undefined as number | undefined,
      };
    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.85;
    const ratio = imgSize.w / imgSize.h;
    let w = imgSize.w;
    let h = imgSize.h;
    if (w > maxW) {
      w = maxW;
      h = w / ratio;
    }
    if (h > maxH) {
      h = maxH;
      w = h * ratio;
    }
    return { width: Math.round(w), height: Math.round(h) };
  };

  const modalSize = getModalSize();

  return (
    <>
      {/* ── Carrusel ── */}
      <div className="w-full h-full hidden md:flex items-center justify-center relative z-20 ">
        <div
          className="inline-flex rounded-2xl overflow-hidden"
          style={{
            ...glassStyle,
            boxShadow:
              "0 8px 15px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <div className="relative flex items-center h-full px-2">
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

            <div
              className="relative overflow-hidden mx-1"
              style={{ width: ITEM_WIDTH * miniCarouselItems.length }}
            >
              <div ref={trackRef} className="flex">
                {miniCarouselItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openModal(item)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      width: ITEM_WIDTH,
                      flexShrink: 0,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    className="flex flex-col items-center justify-center gap-2 py-2 px-2 transition-colors duration-200 group relative"
                  >
                    <div
                      className="relative overflow-hidden transition-all duration-300"
                      // Dentro del map de miniCarouselItems, en el div que envuelve la imagen:
                      style={{
                        border:
                          hoveredId === item.id
                            ? "1px solid rgba(147, 197, 253, 0.6)"
                            : "1px solid rgba(255,255,255,0.3)",
                        boxShadow:
                          hoveredId === item.id
                            ? "0 4px 20px rgba(59,130,246,0.6), 0 0 0 2px rgba(147,197,253,0.2)"
                            : "0 2px 8px rgba(0,0,0,0.25)",
                        transform:
                          hoveredId === item.id ? "scale(1.04)" : "scale(1)",
                        height: 150, // ← aquí
                        width: "100%",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{
                          transform:
                            hoveredId === item.id ? "scale(1.12)" : "scale(1)",
                        }}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                        style={{
                          background:
                            hoveredId === item.id
                              ? "rgba(0,20,70,0.45)"
                              : "rgba(0,0,0,0)",
                          opacity: hoveredId === item.id ? 1 : 0,
                        }}
                      >
                        <ZoomIn
                          size={22}
                          className="text-white drop-shadow-lg"
                          style={{
                            transform:
                              hoveredId === item.id ? "scale(1)" : "scale(0.6)",
                            transition: "transform 0.25s ease",
                          }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full opacity-40 cursor-default"
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

      {/* ── Modal ── */}
      {activeItem && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isClosing
              ? "rgba(0, 8, 30, 0)"
              : "rgba(0, 8, 30, 0.88)",
            backdropFilter: isClosing ? "blur(0px)" : "blur(24px)",
            WebkitBackdropFilter: isClosing ? "blur(0px)" : "blur(24px)",
            transition: "background 0.35s ease, backdrop-filter 0.35s ease",
          }}
        >
          {/* Tarjeta que se ajusta al tamaño real de la imagen */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              // Ocultar hasta que sepamos el tamaño real para evitar flash
              visibility: imgSize ? "visible" : "hidden",
              width: modalSize.width,
              background:
                "linear-gradient(160deg, rgba(0, 25, 80, 0.95) 0%, rgba(0, 50, 130, 0.9) 100%)",
              border: "1px solid rgba(147, 197, 253, 0.25)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(147,197,253,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
              transform: isClosing
                ? "scale(0.88) translateY(20px)"
                : "scale(1) translateY(0)",
              opacity: isClosing ? 0 : 1,
              transition:
                "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
              animation: isClosing
                ? "none"
                : "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            {/* Imagen con dimensiones exactas calculadas */}
            <div style={{ position: "relative", lineHeight: 0 }}>
              <img
                src={activeItem.image}
                alt={activeItem.title}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
                }}
                style={{
                  display: "block",
                  width: modalSize.width ?? "auto",
                  height: modalSize.height ?? "auto",
                  objectFit: "contain",
                  maxWidth: "90vw",
                  maxHeight: "85vh",
                }}
              />

              {/* Gradiente inferior */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,20,70,0.75) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />

              {/* Acento azul */}
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 20,
                  width: 36,
                  height: 3,
                  borderRadius: 99,
                  background: "linear-gradient(90deg, #60a5fa, #93c5fd)",
                  boxShadow: "0 0 10px rgba(96,165,250,0.8)",
                }}
              />
            </div>

            {/* Footer — dots de navegación */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 20px",
              }}
            >
              {miniCarouselItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openModal(item)}
                  style={{
                    width: item.id === activeItem.id ? 28 : 8,
                    height: 8,
                    borderRadius: 99,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    background:
                      item.id === activeItem.id
                        ? "linear-gradient(90deg, #3b82f6, #93c5fd)"
                        : "rgba(147,197,253,0.3)",
                    boxShadow:
                      item.id === activeItem.id
                        ? "0 0 12px rgba(59,130,246,0.7)"
                        : "none",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(147,197,253,0.3)",
              background: "rgba(0,20,70,0.7)",
              backdropFilter: "blur(8px)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              transition: "background 0.2s ease, transform 0.2s ease",
              opacity: isClosing ? 0 : 1,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(59,130,246,0.6)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,20,70,0.7)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
            }}
          >
            <X size={20} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.82) translateY(32px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
    </>
  );
}
