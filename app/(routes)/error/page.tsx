"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { XCircle, RefreshCcw, Mail, ArrowRight, Home, ShoppingBag, Phone, HelpCircle } from "lucide-react";

const PagePaymentCancelled = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br pt-10 from-red-50 via-white to-orange-50 flex items-center justify-center p-0">
            <div className="max-w-6xl w-full">
                {/* Contenedor principal con animación de entrada */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center transform animate-in fade-in-0 slide-in-from-bottom-8 duration-700">
                    
                    {/* Icono de cancelación con animación */}
                    <div className="relative mb-8">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-500 delay-200">
                            <XCircle className="w-12 h-12 text-red-600" />
                        </div>
                        {/* Efecto de ondas */}
                        <div className="absolute inset-0 w-24 h-24 bg-red-200 rounded-full mx-auto animate-pulse opacity-20"></div>
                    </div>

                    {/* Título principal */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-in fade-in-0 duration-500 delay-300">
                        Pago Cancelado
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-in fade-in-0 duration-500 delay-400">
                        Tu proceso de pago ha sido cancelado o no pudo completarse
                    </p>

                    {/* Tarjetas de información */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 animate-in slide-in-from-left-4 duration-500 delay-500">
                            <div className="flex items-center justify-center mb-3">
                                <RefreshCcw className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">No se realizó ningún cargo</h3>
                            <p className="text-sm text-gray-600">
                                Tu método de pago no ha sido afectado. Puedes intentar nuevamente cuando gustes.
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-in slide-in-from-right-4 duration-500 delay-600">
                            <div className="flex items-center justify-center mb-3">
                                <HelpCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">¿Necesitas ayuda?</h3>
                            <p className="text-sm text-gray-600">
                                Nuestro equipo está disponible para asistirte con cualquier inconveniente
                            </p>
                        </div>
                    </div>

                    {/* Posibles razones */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left animate-in fade-in-0 duration-500 delay-700">
                        <h3 className="font-semibold text-gray-900 mb-4 text-center">Posibles razones:</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-start space-x-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Cancelación voluntaria del proceso</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Fondos insuficientes en la cuenta</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Datos de tarjeta incorrectos</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Restricción del banco emisor</span>
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción principales */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-in fade-in-0 duration-500 delay-800">
                        <Button 
                            onClick={() => router.push("/checkout")}
                            size="lg"
                            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <RefreshCcw className="w-5 h-5 mr-2" />
                            Intentar nuevamente
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

                    {/* Botones secundarios */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button 
                            onClick={() => router.push("/")}
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Volver al inicio
                        </Button>
                    </div>

                    {/* Mensaje de apoyo */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-8 text-white animate-in fade-in-0 duration-500 delay-900">
                        <h3 className="font-semibold mb-2">Estamos aquí para ayudarte</h3>
                        <p className="text-blue-100 text-sm">
                            Tu equipo médico sigue siendo importante para nosotros. No dudes en contactarnos si necesitas asistencia con tu compra.
                        </p>
                    </div>

                    {/* Footer con información de contacto */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-4 font-medium">
                            ¿Problemas con el pago? Te ayudamos
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span>+52 1 55 7948 6805</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span>contacto@salmetexmed.com.mx</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                            Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM
                        </p>
                    </div>
                </div>

                {/* Elementos decorativos de fondo */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-15 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-15 animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-5 w-12 h-12 bg-red-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
            </div>
        </div>
    );
};

export default PagePaymentCancelled;