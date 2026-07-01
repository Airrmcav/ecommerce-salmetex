import Link from "next/link";
import {
  Shield,
  Truck,
  CreditCard,
  Award,
  CheckCircle,
  Users,
  FileText,
  Phone,
} from "lucide-react";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

export default function B2BTrustSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            ¿Por qué elegirnos como tu proveedor de equipo médico?
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Más de 15 años brindando soluciones integrales a hospitals, clínicas y laboratorios en todo México
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-slate-50 rounded-2xl">
            <p className="text-4xl font-bold text-blue-600">+15</p>
            <p className="text-slate-600 font-medium">Años de experiencia</p>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-2xl">
            <p className="text-4xl font-bold text-blue-600">+500</p>
            <p className="text-slate-600 font-medium">Equipos disponibles</p>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-2xl">
            <p className="text-4xl font-bold text-blue-600">+200</p>
            <p className="text-slate-600 font-medium">Clientes activos</p>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-2xl">
            <p className="text-4xl font-bold text-blue-600">98%</p>
            <p className="text-slate-600 font-medium">Satisfacción</p>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Certificación COFEPRIS</h3>
            <p className="text-slate-600 text-sm">Todos nuestros equipos cuentan con registro sanitario vigente y certificaciones internacionales.</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">MSI 12 Meses</h3>
            <p className="text-slate-600 text-sm">Financiamiento sin intereses en tarjetas participantes. Facilidades de pago para instituciones.</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Envío Nacional</h3>
            <p className="text-slate-600 text-sm">Logística especializada para equipo médico. Entrega en 5-15 días hábiles a cualquier estado.</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Garantía Oficial</h3>
            <p className="text-slate-600 text-sm">1-2 años de garantía según fabricante. Refacciones y servicio técnico disponible.</p>
          </div>
        </div>

        {/* Trust Features */}
        <div className="bg-gradient-to-r from-slate-800 to-blue-900 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Servicio especializado para instituciones
              </h3>
              <ul className="space-y-3">
                {[
                  "Facturación CFDI 4.0 para instituciones públicas y privadas",
                  "Procesos de procurement adaptados a licitaciones y pedidos abiertos",
                  "Capacitación gratuita en sitio para tu personal médico",
                  "Soporte técnico y refacciones con respuesta en 24 horas",
                  "Contratos de mantenimiento preventivo disponibles",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-200">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Users className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">¿Eres proveedor de gobierno?</h4>
                <p className="text-blue-200 text-sm mb-6">
                  Contamos con experiencia en IMSS, ISSSTE, Sedena y servicios estatales de salud.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <WhatsAppLink
                    productName="equipamiento médico para institución"
                    type="quote"
                    size="md"
                    className="!bg-green-500 hover:!bg-green-600 !text-white"
                    ariaLabel="Cotizar como institución por WhatsApp"
                  />
                  <a
                    href="/contacto"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Formulario formal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-600 mb-4">¿No encuentras lo que necesitas?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppLink
              productName="equipo médico"
              type="quote"
              size="lg"
              ariaLabel="Cotizar equipo por WhatsApp"
            />
            <a
              href="/categoria/todos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition-colors"
            >
              Explorar catálogo completo
            </a>
            <a
              href="tel:+5218445954660"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-5 h-5" />
              +52 1 844 595 4660
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}