"use client";

import { Shield, Truck, CreditCard, Award, Clock, CheckCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { cn } from "@/lib/utils";

interface B2BValuePropsProps {
  categoryName?: string;
  className?: string;
}

const valueProps = [
  {
    icon: CreditCard,
    label: "MSI 12 meses",
    description: "Sin intereses en tarjetas participantes",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Truck,
    label: "Envío nacional",
    description: "Logística especializada para equipo médico",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Shield,
    label: "Garantía oficial",
    description: "1-2 años según fabricante",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Award,
    label: "COFEPRIS",
    description: "Registro sanitario incluido",
    color: "bg-amber-100 text-amber-700",
  },
];

export function B2BValueProps({ categoryName, className }: B2BValuePropsProps) {
  return (
    <section className={cn("bg-gradient-to-r from-slate-800 to-blue-900 rounded-2xl p-6", className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {valueProps.map((prop) => (
          <div key={prop.label} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${prop.color} shrink-0`}>
              <prop.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{prop.label}</p>
              <p className="text-blue-200 text-xs">{prop.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-blue-700/50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-blue-200">
          <Clock className="w-4 h-4" />
          <span>Entrega en 5-15 días hábiles</span>
        </div>
        <WhatsAppLink
          productName={categoryName ? `equipo de ${categoryName}` : "equipo médico"}
          type="quote"
          size="md"
          className="!bg-green-500 hover:!bg-green-600 !text-white"
          ariaLabel={`Cotizar ${categoryName || "equipo médico"} por WhatsApp`}
        />
      </div>
    </section>
  );
}

interface B2BTrustBlockProps {
  className?: string;
}

const trustStats = [
  { value: "+15 años", label: "de experiencia" },
  { value: "+500", label: "equipos disponibles" },
  { value: "+200", label: "clientes activos" },
];

const trustFeatures = [
  "Equipo certificado con registro COFEPRIS",
  "Facturación fiscal inmediata (CFDI)",
  "Soporte técnico y refacciones disponibles",
  "Capacitación gratuita en sitio",
  "Servicio de instalación profesional",
];

export function B2BTrustBlock({ className }: B2BTrustBlockProps) {
  return (
    <section className={cn("bg-white rounded-2xl border border-slate-200 p-6 shadow-lg", className)}>
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        ¿Por qué elegirnos para tu clínica u hospital?
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {trustStats.map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
      <ul className="space-y-2">
        {trustFeatures.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}