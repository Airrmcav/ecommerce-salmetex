"use client";

import MainCarousel from "./index/MainCarousel";
import MiniCarousel from "./index/MiniCarousel";
import TopCircles from "./index/TopCircles";

export default function CarouselLayout() {
  return (
    <main className="flex flex-col mb-5 w-full h-[70vh] bg-linear-to-b from-blue-400 via-blue-100 to-white overflow-hidden relative">
      
      {/* Sección Superior */}
      <section className="flex-[0.4] w-full ">
        <TopCircles />
      </section>

      {/* Sección Central */}
      <section className="flex-[1.6] w-full pt-8 md:pt-0">
        <MainCarousel />
      </section>

      {/* Sección Inferior */}
      <section className="flex-[0.5] w-full">
        <MiniCarousel />
      </section>
    </main>
  );
}