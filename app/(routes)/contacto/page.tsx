"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

export default function Page() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    asunto: "Cotización", // Asunto predeterminado
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    success: false,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: false, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Limpiar el formulario después del envío exitoso
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          asunto: "Cotización",
          mensaje: "",
        });

        setSubmitResult({
          success: true,
          message:
            "Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.",
        });
      } else {
        setSubmitResult({
          success: false,
          message:
            data.error ||
            "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitResult({
        success: false,
        message:
          "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Contacto Profesional
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Ponte en contacto con nuestro equipo de especialistas en equipos
              médicos
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Información de Contacto
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <p className="text-slate-600">
                      contacto@salmetexmed.com.mx
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Teléfono</h3>
                    <p className="text-slate-600">+52 1 844 595 4660</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Dirección</h3>
                    <p className="text-slate-600">
                      Calle Dolores s/n, local 10, Colonia Visitación, Melchor
                      Ocampo, Estado de México C.P. 54890.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Dirección</h3>
                    <p className="text-slate-600">Saltillo, Coahuila, México</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Horarios</h3>
                    <p className="text-slate-600">
                      Lunes - Viernes: 8:00 - 11:00
                    </p>
                    <p className="text-slate-600">Sábado: 9:00 - 1:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Soporte Técnico 24/7
                </h4>
                <p className="text-blue-700 text-sm">
                  Para emergencias médicas y soporte técnico urgente,
                  contáctanos las 24 horas del día.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Envíanos tu Consulta
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nombre
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="+52 (55) 1234-5678"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subject and Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Cotización"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mensaje *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none min-h-[120px]"
                      placeholder="Describe tu consulta, especificaciones técnicas requeridas, cantidad aproximada, presupuesto estimado, etc."
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {isSubmitting ? (
                    <button
                      type="button"
                      disabled
                      className="w-full bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold text-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Enviando...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Enviar Consulta
                    </button>
                  )}
                </div>

                {submitResult.message && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${submitResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {submitResult.message}
                  </div>
                )}

                <div className="text-center text-sm text-slate-600">
                  Al enviar este formulario aceptas nuestros términos de
                  privacidad y tratamiento de datos.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d469.49627482615165!2d-99.14842721672714!3d19.713892890136204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f540db0851b5%3A0xba91906720ae0e4!2sSALMETEXMED!5e0!3m2!1ses-419!2smx!4v1772040323890!5m2!1ses-419!2smx"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
