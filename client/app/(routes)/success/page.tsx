"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Home, ShoppingBag } from "lucide-react";
import Script from "next/script"; // 👈 Importa Script

const PageSuccess = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br pt-10 from-blue-50 via-white to-green-50 flex items-center justify-center p-0">
      <div className="max-w-6xl w-full relative">
        {/* ✅ Script de conversión */}
        <Script id="conversion-event">
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-16830523296/PbBNCOqpj6kaEKDPtdk-'
            });
          `}
        </Script>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center transform animate-in fade-in-0 slide-in-from-bottom-8 duration-700">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-500 delay-200">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-20"></div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-in fade-in-0 duration-500 delay-300">
            ¡Compra Exitosa!
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-in fade-in-0 duration-500 delay-400">
            Tu pedido de equipo médico ha sido procesado correctamente
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 mb-8 text-white animate-in fade-in-0 duration-500 delay-700">
            <h3 className="font-semibold mb-2">Gracias por confiar en nosotros</h3>
            <p className="text-blue-100 text-sm">
              Tu salud y la de tus pacientes es nuestra prioridad. Esperamos seguir siendo tu aliado en el cuidado médico.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-0 duration-500 delay-800">
            <Button
              onClick={() => router.push("/")}
              size="lg"
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Volver al inicio
            </Button>

            <Button
              onClick={() => router.push("/categoria/todos")}
              variant="outline"
              size="lg"
              className="border-2 cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Seguir comprando
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">¿Necesitas ayuda? Contáctanos</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <span>📞 +52 1 55 7948 6805</span>
              <span>✉️ contacto@salmetexmed.com.mx</span>
            </div>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-blue-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
      </div>
    </div>
  );
};

export default PageSuccess;
