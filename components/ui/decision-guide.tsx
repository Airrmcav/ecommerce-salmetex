"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle, XCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

interface DecisionGuideProps {
  categorySlug?: string;
  categoryName?: string;
  className?: string;
}

interface ComparisonItem {
  feature: string;
  optionA: string | boolean;
  optionB: string | boolean;
  optionC?: string | boolean;
}

interface GuideContent {
  title: string;
  intro: string;
  comparisons: {
    title: string;
    items: ComparisonItem[];
  }[];
  recommendations: {
    for: string;
    recommendation: string;
    idealProduct?: string;
  }[];
}

const guideContent: Record<string, GuideContent> = {
  colposcopios: {
    title: "Cómo elegir un colposcopio para tu consultorio",
    intro: "El colposcopio es fundamental para el diagnóstico temprano de lesiones cervicales. La elección entre LED y halógeno, los aumentos disponibles y la integración de cámara HDMI son factores clave que determinan la calidad diagnóstica y eficiencia de tu práctica.",
    comparisons: [
      {
        title: "Fuente de luz: LED vs Halógeno",
        items: [
          { feature: "Calidad de iluminación", optionA: "LED - Luz blanca uniforme, temperatura 6500K", optionB: "Halógeno - Luz cálida 3200K, puede requerir filtros" },
          { feature: "Vida útil", optionA: "LED - 50,000+ horas", optionB: "Halógeno - 1,000-2,000 horas" },
          { feature: "Calor generado", optionA: "Mínimo - No afecta muestra", optionB: "Moderado - Puede resecar mucosa" },
          { feature: "Consumo energético", optionA: "Bajo - 15W equivalente", optionB: "Alto - 50-100W" },
          { feature: "Costo de mantenimiento", optionA: "Bajo - Sin cambio de foco", optionB: "Alto - Cambio de foco periódicamente" },
        ],
      },
      {
        title: "Aumentos disponibles",
        items: [
          { feature: "Aumentos básicos", optionA: "4x a 40x - Suficiente para cribado", optionB: "4x a 25x - Limitado para detalle" },
          { feature: "Aumentos clínicos", optionA: "Hasta 60x - Para evaluación de mosaico", optionB: "Hasta 40x - Estándar" },
          { feature: "Zoom motorizado", optionA: "Disponible en gama alta", optionB: "Generalmente manual" },
        ],
      },
      {
        title: "Integración de cámara",
        items: [
          { feature: "Cámara HDMI integrada", optionA: "Sí - Captura y graba en tiempo real", optionB: "No - Solo visualización" },
          { feature: "Conexión a monitor", optionA: "Directa HDMI - Plug and play", optionB: "Adaptador requerido" },
          { feature: "Software de gestión", optionA: "Incluido - DICOM/tesis compatible", optionB: "No incluido - Opcional costoso" },
        ],
      },
    ],
    recommendations: [
      { for: "Consultorio pequeño / inicio de práctica", recommendation: "LED 40x con cámara básica", idealProduct: "Colposcopio LED Digital HD" },
      { for: "Clínica con alto volumen", recommendation: "LED 60x con zoom motorizado y software de gestión", idealProduct: "Colposcopio Digital Avanzado" },
      { for: "Hospital / servicio de colposcopia", recommendation: "Sistema completo con cámara 4K, software DICOM y documentación automática", idealProduct: "Colposcopio Profesional DICOM" },
    ],
  },
  autoclaves: {
    title: "Guía para seleccionar una autoclave para tu clínica",
    intro: "La esterilización es crítica en cualquier establecimiento de salud. La elección entre autoclave de vapor, óxido de etileno o plasma depende del tipo de instrumentos, volumen de carga y frecuencia de uso.",
    comparisons: [
      {
        title: "Tipo de autoclave",
        items: [
          { feature: "Tecnología", optionA: "Vapor (B/N/S)", optionB: "Óxido de etileno (EtO)", optionC: "Plasma (gas plasma)" },
          { feature: "Materiales compatibles", optionA: "Instrumental metálico y textiles", optionB: "Material termosensible (plásticos)", optionC: "Instrumental delicado" },
          { feature: "Tiempo de ciclo", optionA: "30-60 minutos", optionB: "2-4 horas", optionC: "45-90 minutos" },
          { feature: "Costo por ciclo", optionA: "Bajo - Solo agua y electricidad", optionB: "Alto - Gas EtO especializado", optionC: "Moderado - Cápsulas de peróxido" },
          { feature: "Toxicidad residual", optionA: "Ninguna", optionB: "Requiere desgasificación", optionC: "Ninguna" },
          { feature: "Capacidad típica", optionA: "18-200 litros", optionB: "100-300 litros", optionC: "20-100 litros" },
        ],
      },
      {
        title: "Clases de autoclave de vapor",
        items: [
          { feature: "Clase N (Naked)", optionA: "Sólidos sinenvoltura", optionB: "No apta para textiles ni productos huecos", optionC: false },
          { feature: "Clase S", optionA: "Sólidos y textiles sinenvoltura", optionB: " некоторых productos huecos", optionC: false },
          { feature: "Clase B (Benchmark)", optionA: "Todos: sólidos, textiles, huecos, productos embalados", optionB: "La más completa y recomendada", optionC: false },
        ],
      },
    ],
    recommendations: [
      { for: "Consultorio dental", recommendation: "Autoclave Clase B de 18-24 litros, ciclo rápido de 20 min", idealProduct: "Autoclave Dental Clase B" },
      { for: "Clínica de cirugía menor", recommendation: "Autoclave Clase B de 40-60 litros con secadora", idealProduct: "Autoclave Profesional B" },
      { for: "Hospital / clínica grande", recommendation: "Autoclave de gran capacidad con sistema de documentación y trazabilidad", idealProduct: "Autoclave Hospitalaria" },
    ],
  },
  ultrasonidos: {
    title: "Cómo elegir un equipo de ultrasonido para tu especialidad",
    intro: "El ultrasonido es la herramienta de diagnóstico por imagen más versátil. La elección depende fundamentalmente de la especialidad, el ambiente clínico y el presupuesto disponible.",
    comparisons: [
      {
        title: "Portabilidad",
        items: [
          { feature: "Ultrasonido portátil", optionA: "Equipos de mano (portátil real)", optionB: "Portable de escritorio (carro)" },
          { feature: "Peso", optionA: "1-3 kg", optionB: "8-15 kg (más funcional)" },
          { feature: "Batería", optionA: "2-4 horas autonomía", optionB: "1-2 horas o uso con cable" },
          { feature: "Pantalla", optionA: "Tableta 10-12\" integrada", optionB: "Monitor 15-21\" de alta resolución" },
          { feature: "Ideal para", optionA: "Visitas domiciliarias, urgenciología", optionB: "Consultorio, hospital (uso principal)" },
        ],
      },
      {
        title: "Transductores",
        items: [
          { feature: "Convex abdominal", optionA: "Incluido estándar", optionB: "3-5 MHz" },
          { feature: "Lineal vascular", optionA: "7-12 MHz", optionB: "Alta resolución superficial" },
          { feature: "Sectorial cardíaco", optionA: "2-4 MHz", optionB: "Sonda cardiaca" },
          { feature: "Endocavitario", optionA: "6-9 MHz", optionB: "Transvaginal/rectal" },
        ],
      },
    ],
    recommendations: [
      { for: "Medicina general / primer nivel", recommendation: "Portátil con sonda convex básica", idealProduct: "Ultrasonido Portátil económico" },
      { for: "Ginecología / obstetricia", recommendation: "Portátil con transductores convex, lineal y endocavitario", idealProduct: "Ultrasonido Portátil GO" },
      { for: "Cardiología", recommendation: "Sistema de escritorio con sonda sectorial y análisis cardíaco avanzado", idealProduct: "Ultrasonido Cardiológico" },
    ],
  },
};

export function DecisionGuide({ categorySlug, categoryName, className }: DecisionGuideProps) {
  const [openComparison, setOpenComparison] = useState<number | null>(0);
  const [openRecommendation, setOpenRecommendation] = useState<number | null>(null);

  const slugMap: Record<string, string> = {
    colposcopios: "colposcopios",
    colposcopio: "colposcopios",
    autoclaves: "autoclaves",
    autoclave: "autoclaves",
    ultrasonido: "ultrasonidos",
    ultrasonidos: "ultrasonidos",
    ecografia: "ultrasonidos",
  };

  const guideKey = categorySlug ? slugMap[categorySlug.toLowerCase()] || categorySlug.toLowerCase() : null;
  const guide = guideKey ? guideContent[guideKey] : null;

  if (!guide) return null;

  return (
    <section className={cn("bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden", className)}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-white" />
          <div>
            <h3 className="text-xl font-bold text-white">{guide.title}</h3>
            <p className="text-blue-100 text-sm mt-1">{guide.intro}</p>
          </div>
        </div>
      </div>

      {/* COMPARISONS */}
      <div className="divide-y divide-slate-200">
        {guide.comparisons.map((comparison, cIdx) => (
          <div key={cIdx}>
            <button
              onClick={() => setOpenComparison(openComparison === cIdx ? null : cIdx)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-800">{comparison.title}</span>
              <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", openComparison === cIdx && "rotate-180")} />
            </button>
            {openComparison === cIdx && (
              <div className="px-4 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-3 font-medium text-slate-600">Característica</th>
                      <th className="text-left p-3 font-medium text-blue-600">Opción A</th>
                      <th className="text-left p-3 font-medium text-slate-600">Opción B</th>
                      {comparison.items[0]?.optionC && (
                        <th className="text-left p-3 font-medium text-slate-600">Opción C</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparison.items.map((item, iIdx) => (
                      <tr key={iIdx}>
                        <td className="p-3 text-slate-700 font-medium">{item.feature}</td>
                        <td className="p-3 text-slate-600">
                          {typeof item.optionA === "boolean" ? (
                            item.optionA ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-400" />
                          ) : (
                            item.optionA
                          )}
                        </td>
                        <td className="p-3 text-slate-600">
                          {typeof item.optionB === "boolean" ? (
                            item.optionB ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-400" />
                          ) : (
                            item.optionB
                          )}
                        </td>
                        {item.optionC !== undefined && (
                          <td className="p-3 text-slate-600">
                            {typeof item.optionC === "boolean" ? (
                              item.optionC ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-400" />
                            ) : (
                              item.optionC
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RECOMMENDATIONS */}
      <div className="border-t border-slate-200 p-6 bg-slate-50">
        <h4 className="font-bold text-slate-800 mb-4">Recomendaciones por tipo de práctica</h4>
        <div className="space-y-3">
          {guide.recommendations.map((rec, rIdx) => (
            <div key={rIdx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenRecommendation(openRecommendation === rIdx ? null : rIdx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-800">{rec.for}</p>
                  <p className="text-sm text-blue-600 mt-1">{rec.recommendation}</p>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 shrink-0 transition-transform ml-4", openRecommendation === rIdx && "rotate-180")} />
              </button>
              {openRecommendation === rIdx && rec.idealProduct && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Producto sugerido:</p>
                    <p className="font-medium text-slate-700">{rec.idealProduct}</p>
                  </div>
                  <WhatsAppLink
                    productName={rec.idealProduct}
                    type="quote"
                    size="sm"
                    className="!bg-green-500 hover:!bg-green-600 !text-white"
                    ariaLabel={`Cotizar ${rec.idealProduct}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 bg-blue-50 border-t border-blue-100">
        <p className="text-sm text-blue-700 mb-3">
          ¿Necesitas ayuda para elegir el equipo correcto? Nuestro equipo te asesora sin compromiso.
        </p>
        <div className="flex flex-wrap gap-3">
          <WhatsAppLink
            productName={categoryName || "equipo médico"}
            type="quote"
            size="sm"
            ariaLabel="Asesoría para elegir equipo"
          />
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Formulario de contacto
          </Link>
        </div>
      </div>
    </section>
  );
}