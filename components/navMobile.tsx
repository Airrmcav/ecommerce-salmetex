'use client'
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, X, BaggageClaim, Package2, Loader2, Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useCart } from "@/hooks/use-cart";
import { useGetCategories } from "@/api/getProducts"; // Asumiendo que esta es la API correcta
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { useLovedProducts } from "@/hooks/use-loved-products";

interface NavMobileProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const NavMobile = ({ isMenuOpen, toggleMenu }: NavMobileProps) => {
    const router = useRouter();
    const cart = useCart();
    const { lovedItems } = useLovedProducts();

    return (
        <div>
            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                <div className="px-4 py-3 space-y-2">
                    <button
                        onClick={() => {
                            router.push("/categoria/todos");
                            toggleMenu();
                        }}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 font-medium
                       hover:bg-blue-50 rounded-lg transition-all duration-200
                       border border-transparent hover:border-blue-100"
                        aria-label="Ver todos los productos"
                    >
                        Productos
                    </button>

                    <button
                        onClick={() => {
                            router.push("/");
                            toggleMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 
                       hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                        Inicio
                    </button>

                    <button
                        onClick={() => {
                            router.push("/nosotros");
                            toggleMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 
                       hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                        Nosotros
                    </button>

                    <button
                        onClick={() => {
                            router.push("/productos-destacados");
                            toggleMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 
                       hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                        Productos Destacados
                    </button>

                    <button
                        onClick={() => {
                            router.push("/insumos-medicos");
                            toggleMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 
                       hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                        Insumos Médicos
                    </button>

                    <button
                        onClick={() => {
                            router.push("/productos-top");
                            toggleMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 
                       hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                        Productos Top
                    </button>
                    <button
                        onClick={() => {
                            router.push("/blog");
                            toggleMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 
                       hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                        Blog
                    </button>

                    <button
                        onClick={() => {
                            router.push("/contacto");
                            toggleMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 
                       hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                        Contacto
                    </button>

                    {/* Mobile Subscribe Button */}
                    <button
                        onClick={() => {
                            router.push("/contacto");
                            toggleMenu();
                        }}
                        className="w-full mt-0 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                     text-white font-medium rounded-xl shadow-md text-sm
                     hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
                     transition-all duration-200 border border-blue-600/20"
                        aria-label="Suscríbete a nuestras promociones"
                    >
                        Suscríbete a promociones
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavMobile;
