"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface B2BFAQProps {
  categoryName?: string;
  className?: string;
}

const faqItems = [
  {
    question: "¿Cuáles son los tiempos de entrega?",
    answer: "Los tiempos de entrega varían entre 5 y 15 días hábiles dependiendo de la disponibilidad del producto y tu ubicación. Para equipos de alta demanda o pedidos especiales, el tiempo puede extenderse a 20-30 días. Te enviamos un número de seguimiento una vez despachado tu pedido.",
  },
  {
    question: "¿Cómo funciona la facturación (CFDI)?",
    answer: "Emitimos factura fiscal CFDI 4.0 con todos los requisitos fiscales. Solo necesitas proporcionarnos tus datos fiscales (RFC, razón social, dirección fiscal, uso de CFDI) al momento de la compra o hasta 48 horas después. La factura se envía por correo electrónico en formato PDF y XML.",
  },
  {
    question: "¿Qué incluye la garantía?",
    answer: "Todos nuestros equipos incluyen garantía oficial del fabricante, típicamente entre 1 y 2 años. La garantía cubre defectos de fabricación y funcionamiento. No cubre daños por uso indebido, mala instalación o mantenimiento inadecuado. Las refacciones y mano de obra están incluidas.",
  },
  {
    question: "¿Cómo consigo refacciones y servicio técnico?",
    answer: "Contamos con servicio técnico propio y refacciones originales de todos los fabricantes que representamos. Para servicio técnico, contáctanos por WhatsApp o correo con el número de serie del equipo. Ofrecemos contratos de mantenimiento preventivo anuales para equipos de alta demanda.",
  },
  {
    question: "¿Ofrecen capacitación para el uso del equipo?",
    answer: "Sí, incluye capacitación gratuita en sitio para tu personal médico y administrativo. La capacitación cubre操作 del equipo, mantenimiento básico preventivo y solución de problemas comunes. Para equipos especializados complejos,.programamos sesiones de formación adicionales.",
  },
  {
    question: "¿Manejan precios para gobierno e IMSS Bienestar?",
    answer: "Sí, tenemos experiencia comprobable con instituciones de gobierno, IMSS, ISSSTE, Servicios Estatales de Salud e IMSS Bienestar. Manejamos procesos de licitación, pedidos abiertos y adjudicaciones directas. Contáctanos para revisar los requisitos específicos de tu institución.",
  },
];

export function B2BFAQ({ categoryName, className }: B2BFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: categoryName ? `Preguntas Frecuentes - ${categoryName}` : "Preguntas Frecuentes B2B",
    description: "Respuestas a las preguntas más comunes sobre compra de equipo médico en Salmetexmed",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className={cn("bg-slate-50 rounded-2xl p-6", className)}>
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-800">
            Preguntas Frecuentes para Compras Corporativas
          </h3>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="font-medium text-slate-800 pr-4">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}