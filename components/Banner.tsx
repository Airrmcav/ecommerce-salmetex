'use client';

import { ArrowRight, Heart, Shield, Zap, Phone, Mail, MapPin, Star, } from "lucide-react";
import {

    Stethoscope,
    Scale,
    Baby,
    Monitor,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Banner = () => {
    const router = useRouter();

    return (
        <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            {/* Animated Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-20 h-20 bg-indigo-300/10 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16">

                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium">Equipos Médicos Certificados</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </div>

                        {/* Main Headlines */}
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Equipos Médicos de
                                <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    Última Generación
                                </span>
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                                Tecnología avanzada para profesionales de la salud. Calidad certificada,
                                soporte especializado y envío inmediato.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <Heart className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Calidad Premium</p>
                                    <p className="text-xs text-blue-200">FDA Aprobados</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Zap className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Envío Express</p>
                                    <p className="text-xs text-blue-200">24-48 horas</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Shield className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Garantía</p>
                                    <p className="text-xs text-blue-200">1 año</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.push('/categoria/todos')}
                                aria-label="Ver catálogo completo de productos médicos"
                                className="cursor-pointer group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                                Ver Catálogo Completo
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => (window.location.href = "tel:+5218445954660")}
                                aria-label="Llamar para consulta especializada al +52 1 844 595 4660"
                                className="cursor-pointer group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <Phone className="w-5 h-5" />
                                Consulta Especializada
                            </button>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-6 text-sm text-blue-200">
                            <a href="tel:+5218445954660" aria-label="Llamar al teléfono +52 1 844 595 4660" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+52 1 844 595 4660</span>
                            </a>
                            <a href="mailto:ventas@salmetexmed.com.mx" aria-label="Enviar correo a ventas@salmetexmed.com.mx" className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>ventas@salmetexmed.com.mx</span>
                            </a>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Ciudad de México | Estado de México | Saltillo</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual Content */}
                    <div className="relative hidden md:block">
                        {/* Main Image Container */}
                        <div className="relative z-10">
                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                                {/* Medical Equipment Visualization */}
                                <div className="aspect-square bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl flex items-center justify-center relative overflow-hidden" role="img" aria-label="Visualización de equipos médicos disponibles">
                                    <div className="text-center space-y-6">
                                        {/* Equipment Icons */}
                                        <div className="grid grid-cols-3 gap-6 mb-8">
                                            <div className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                                                <Heart className="w-8 h-8 text-red-400 mx-auto" />
                                                <p className="text-xs mt-2 text-white/80">Cardiología</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                                                <Zap className="w-8 h-8 text-yellow-400 mx-auto" />
                                                <p className="text-xs mt-2 text-white/80">Electro</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                                                <Stethoscope className="w-8 h-8 text-blue-400 mx-auto" />
                                                <p className="text-xs mt-2 text-white/80">Diagnóstico</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                                                <Scale className="w-8 h-8 text-purple-400 mx-auto" />
                                                <p className="text-xs mt-2 text-white/80">Cirugía</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                                                <Baby className="w-8 h-8 text-pink-400 mx-auto" />
                                                <p className="text-xs mt-2 text-white/80">Incubadoras</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition-colors">
                                                <Monitor className="w-8 h-8 text-green-400 mx-auto" />
                                                <p className="text-xs mt-2 text-white/80">Monitores</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold text-white">+500</h3>
                                            <p className="text-blue-200">Equipos Disponibles</p>
                                            <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-sm font-semibold py-2 px-4 rounded-full inline-block">
                                                Stock Disponible
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Elements */}
                                    <div className="absolute top-4 right-4 bg-green-400 text-white text-xs font-bold py-1 px-3 rounded-full animate-pulse">
                                        En Línea
                                    </div>
                                    
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">100%</p>
                                        <p className="text-xs text-blue-200">Satisfacción</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">5+</p>
                                        <p className="text-xs text-blue-200">Años De Experiencia.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decorations */}
                        <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl"></div>
                    </div>
                </div>

                {/* Bottom CTA Strip */}
                <div className="border-t border-white/10 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-sm text-blue-200">
                            <span>🏥 Hospitales</span>
                            <span>👨‍⚕️ Clínicas</span>
                            <span>🔬 Laboratorios</span>
                            <span>🚑 Emergencias</span>
                        </div>
                        <div className="text-sm text-blue-200">
                            <span className="text-green-400 font-semibold">● En línea</span> - Cotización inmediata
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;