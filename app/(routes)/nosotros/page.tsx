"use client";
import {
  Heart,
  Eye,
  Target,
  Shield,
  Lightbulb,
  User,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/BreadCrumbs";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Nosotros" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        items={breadcrumbItems}
        backButton={{
          show: true,
          label: "Regresar",
        }}
      />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Nosotros</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Líderes en equipamiento médico con más de una década de
              experiencia, comprometidos con la salud y el bienestar de las
              comunidades.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Target className="text-blue-600 w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Nuestra Misión
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Proporcionar equipamiento médico de la más alta calidad,
                  innovador y confiable, que permita a los profesionales de la
                  salud brindar la mejor atención posible a sus pacientes,
                  mejorando así la calidad de vida de las personas.
                </p>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Eye className="text-green-600 w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Nuestra Visión
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ser la empresa líder en la distribución de equipamiento médico
                  a nivel nacional, reconocida por nuestra excelencia en
                  servicio, innovación tecnológica y compromiso inquebrantable
                  con la salud pública.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada una de nuestras decisiones y
              acciones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-red-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Compromiso
              </h3>
              <p className="text-gray-600">
                Dedicados completamente a la satisfacción de nuestros clientes y
                al impacto positivo en la salud.
              </p>
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Calidad</h3>
              <p className="text-gray-600">
                Solo trabajamos with equipos médicos que cumplen los más altos
                estándares internacionales.
              </p>
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="text-purple-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Innovación
              </h3>
              <p className="text-gray-600">
                Constantemente buscamos las últimas tecnologías para ofrecer
                soluciones avanzadas.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div
            className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">12+</div>
                <p className="text-gray-600 font-medium">Años de Experiencia</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  500+
                </div>
                <p className="text-gray-600 font-medium">
                  Clientes Satisfechos
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  1000+
                </div>
                <p className="text-gray-600 font-medium">
                  Equipos Distribuidos
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                <p className="text-gray-600 font-medium">Soporte Técnico</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
