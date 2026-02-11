import {
  Heart,
  CheckCircle,
  XCircle,
  ShoppingCart,
  Filter,
  X,
} from "lucide-react";
import { Activity, ShieldPlus } from "lucide-react";

export default function Header() {
  return (
    <div className="relative mb-8 pb-8 border-b border-gray-200">
      {/* Elemento decorativo de fondo */}
      <div className="absolute inset-0 bg-linear-to-r" />
      <div className="relative flex items-center gap-8 px-6">
        <div className="flex flex-col items-center gap-4 min-w-fit">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
            <ShieldPlus className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                Cobertura Nacional
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
              <span className="text-xs font-medium text-gray-700">
                ✓ Certificados
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                Entregas Oportunas
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Proveedor de Equipamiento Médico
            <span className="block text-blue-600 mt-1">
              para IMSS Bienestar
            </span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Suministramos equipo médico de alta calidad, mobiliario hospitalario
            e insumos especializados para unidades médicas del programa IMSS
            Bienestar en todo el territorio nacional.
          </p>
        </div>
      </div>
    </div>
  );
}
