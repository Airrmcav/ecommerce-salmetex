'use client'
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const TikTokIcon = ({ className = "" }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);

const socialLinks = [

    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@salmetexmed',
        icon: TikTokIcon,
        bgColor: 'bg-black',
        hoverColor: 'hover:bg-gray-800',
        ariaLabel: 'Síguenos en TikTok'
    }
];


const Footer = () => {
    return (
        <footer className="bg-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="mb-6 flex flex-col items-center">
                            <img
                                src="/logo/logo-letras.webp"
                                alt="SALMETEXMED"
                                className="h-22 w-auto object-contain mb-4"
                                loading="lazy"
                            />
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Equipos médicos de alta calidad para profesionales de la salud.
                                Comprometidos con la excelencia y la innovación en tecnología médica.
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className="flex space-x-4 justify-center">
                            <Link
                                href="https://www.facebook.com/salmetexmed?locale=es_LA"
                                target="_blank"
                                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-110 text-white"
                                aria-label="Síguenos en Facebook"
                            >
                                <Facebook size={18} />
                            </Link>
                            <Link
                                href="https://www.instagram.com/salmetexmed/"
                                target="_blank"
                                className="p-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-all duration-300 hover:scale-110 text-white"
                                aria-label="Síguenos en Instagram"
                            >
                                <Instagram size={18} />
                            </Link>
                            <Link
                                href="https://www.tiktok.com/@salmetexmed"
                                target="_blank"
                                className="p-2 bg-black hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 text-white"
                                aria-label="Síguenos en TikTok"
                            >
                                <TikTokIcon className="w-5 h-5 text-white" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-900">Enlaces Rápidos</h3>
                        <ul className="space-y-3" role="list" aria-label="Enlaces rápidos de navegación">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nosotros"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/productos"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Todos los Productos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/productos-destacados"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Productos Destacados
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/productos-top"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Productos Top
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacto"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Products Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-900">Categorías</h3>
                        <ul className="space-y-3" role="list" aria-label="Categorías de productos">
                            <li>
                                <Link
                                    href="/categoria/autoclaves"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Autoclaves
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/mesas-quirurgicas"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Mesas de Cirugía
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/equipos-de-signos-vitales"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Equipos de Signos Vitales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/lamparas-de-cirugia"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Lámparas de Cirugía
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/incubadoras"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Incubadoras
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/camillas-portatiles"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
                                >
                                    Camillas Portátiles
                                </Link>
                            </li>
                            <li className="flex justify-center mt-2">
                                <Link
                                    href="/categoria/todos"
                                    className="text-white p-2 inline w-100 bg-blue-600 rounded-2xl transition-colors duration-200 text-sm hover:underline underline-offset-4 text-center"
                                    aria-label="Ver más categorías de productos"
                                >
                                    Más Productos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-900">Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-800 text-sm">
                                        Saltillo, México.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                                <Link
                                    href="tel:+5218445954660"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm"
                                    aria-label="Llamar al teléfono +52 1 844 595 4660"
                                >
                                    +52 1 844 595 4660
                                </Link>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                                <Link
                                    href="mailto:contacto@salmetex.com.mx"
                                    className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm"
                                    aria-label="Enviar correo a contacto@salmetex.com.mx"
                                >
                                    contacto@salmetex.com.mx
                                </Link>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Clock size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-800 text-sm">
                                        Lun - Vie: 8:00 AM - 6:00 PM<br />
                                        Sáb: 9:00 AM - 1:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Suscríbete a nuestro boletín
                            </h4>
                            <p className="text-gray-800 text-sm">
                                Recibe las últimas novedades y promociones exclusivas
                            </p>
                        </div>

                        <div className="flex w-full md:w-auto ">
                            <Link
                                href={"https://www.facebook.com/groups/723178883718883"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Suscribirse al grupo de Facebook para recibir promociones"
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 
                                             text-white font-medium rounded-2xl hover:from-blue-700 
                                             hover:to-blue-800 transition-all duration-200 text-sm">
                                Suscribirse a grupo de Promociones
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-700 text-sm">
                                © 2025 SALMETEXMED. Todos los derechos reservados.
                            </p>
                        </div>

                        {/* <div className="flex flex-wrap items-center gap-6 text-sm">
                            <Link
                                href="https://www.facebook.com/groups/723178883718883"

                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                            >
                                Política de Privacidad
                            </Link>
                            <Link
                                href="/terminos-condiciones"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                            >
                                Términos y Condiciones
                            </Link>
                            <Link
                                href="/politica-cookies"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                            >
                                Política de Cookies
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;