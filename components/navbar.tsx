'use client'
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, X, BaggageClaim, Package2, Loader2, Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link"
import SearchDropdown from "./SearchDropdown";

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
import { useGetCategories } from "@/api/getProducts";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { useLovedProducts } from "@/hooks/use-loved-products";
import NavMobile from "./navMobile";

const Navbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cart = useCart();
    const { lovedItems } = useLovedProducts();

    // Hook para obtener categorías
    const { result: categories, loading: categoriesLoading, error }: ResponseType = useGetCategories();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Función para crear URLs amigables sin acentos
    const createSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
            .trim();
    };

    // Ordenar categorías alfabéticamente
    const sortedCategories = categories ? [...categories].sort((a, b) =>
        a.categoryName.localeCompare(b.categoryName)
    ) : [];

    return (
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="flex items-center justify-between px-2 py-1 mx-auto max-w-7xl">

                {/* Logo Section */}
                <div
                    className="cursor-pointer flex-shrink-0 transition-transform hover:scale-105"
                    onClick={() => router.push("/")}
                >
                    <img
                        src="/logo/logo-letras.png"
                        alt="Logo SALMETEXMED"
                        className="h-16 sm:h-18 md:h-20 lg:h-18 w-auto object-contain filter"
                    />
                </div>

                {/* Search Section - Hidden on mobile */}
                <div className="hidden md:flex flex-1 mx-2 lg:mx-4 xl:mx-8 max-w-2xl">
                    <SearchDropdown />
                </div>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                    <button
                        onClick={() => window.open("https://www.facebook.com/groups/723178883718883", "_blank")}
                        className="cursor-pointer px-4 xl:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 
             text-white font-medium rounded-xl shadow-md text-xs xl:text-sm
             hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
             transform hover:-translate-y-0.5 transition-all duration-200
             border border-blue-600/20"
             aria-label="Suscríbete a nuestro grupo de promociones"
                    >
                        Suscríbete a nuestro grupo de <br /> promociones
                    </button>

                    <button
                        onClick={() => router.push("/productos-favoritos")}
                        className="relative p-3 text-gray-600 hover:text-blue-600  cursor-pointer
             bg-gray-50/80 hover:bg-blue-50 rounded-xl
             shadow-sm hover:shadow-md transition-all duration-200
             border border-gray-200/50 hover:border-blue-200"
             aria-label="Productos Favoritos"
                    >

                        <Heart strokeWidth="1" className={`cursor-pointer ${lovedItems.length > 0 && 'fill-red-300 '}`} />
                    </button>

                    <button
                        onClick={() => router.push("/carrito")}
                        className="relative p-3 text-gray-600 hover:text-blue-600 
             bg-gray-50/80 hover:bg-blue-50 rounded-xl
             shadow-sm hover:shadow-md transition-all duration-200
             border border-gray-200/50 hover:border-blue-200 cursor-pointer"
             aria-label="Carrito de Compras"
                    >
                        {cart.items.length === 0 ? (
                            <ShoppingCart size={24} strokeWidth={1.5} />
                        ) : (
                            <div className="flex gap-1">
                                <BaggageClaim strokeWidth={1} size={24} />
                                <span>{cart.items.length}</span>
                            </div>
                        )}
                    </button>
                </div>

                {/* Mobile Actions */}
                <div className="flex lg:hidden items-center gap-2">
                    <button
                        onClick={() => router.push("/carrito")}
                        className="relative p-3 text-gray-600 hover:text-blue-600 
             bg-gray-50/80 hover:bg-blue-50 rounded-xl
             shadow-sm hover:shadow-md transition-all duration-200
             border border-gray-200/50 hover:border-blue-200 cursor-pointer"
             aria-label="Carrito de Compras"
                    >
                        {cart.items.length === 0 ? (
                            <ShoppingCart size={24} strokeWidth={1.5} />
                        ) : (
                            <div className="flex gap-1">
                                <BaggageClaim strokeWidth={1} size={24} />
                                <span>{cart.items.length}</span>
                            </div>
                        )}
                    </button>

                    <button
                        onClick={() => router.push("/productos-favoritos")}
                        className="relative p-3 text-gray-600 hover:text-blue-600  cursor-pointer
             bg-gray-50/80 hover:bg-blue-50 rounded-xl
             shadow-sm hover:shadow-md transition-all duration-200
             border border-gray-200/50 hover:border-blue-200"
             aria-label="Productos Favoritos"
                    >

                        <Heart strokeWidth="1" className={`cursor-pointer ${lovedItems.length > 0 && 'fill-red-300 '}`} />
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="p-3 text-gray-600 hover:text-blue-600 
                     bg-gray-50/80 hover:bg-blue-50 rounded-xl
                     shadow-sm transition-all duration-200"
                     aria-label="Menú de Navegación"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden px-4 pb-3 mt-3">
                <SearchDropdown isMobile={true} onClose={() => setIsMenuOpen(false)} />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block border-t border-gray-100 ">
                <div className="flex items-center justify-between px-4 py-1 mx-auto max-w-7xl ">
                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuItem className="list-none">
                                <NavigationMenuTrigger className="uppercase cursor-pointer bg-transparent">Productos</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-[400px] lg:w-[500px] xl:w-[600px]">
                                        <div className="grid lg:grid-cols-[.75fr_1fr] gap-4 p-4">
                                            {/* Sección principal - lado izquierdo */}
                                            <div className="space-y-3 flex items-center ">
                                                <div>
                                                    <NavigationMenuLink
                                                        className="flex flex-col items-center text-center select-none space-y-3 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 hover:shadow-md"
                                                        href="/categoria/todos"
                                                    >
                                                            {/* Icono central */}
                                                            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border border-blue-200">
                                                                <Package2 className="w-6 h-6 text-blue-600" />
                                                            </div>

                                                            <div className="space-y-1">
                                                                <div className="text-sm font-semibold leading-none text-blue-900">
                                                                    Ver Todos los Productos
                                                                </div>
                                                                <p className="line-clamp-2 text-xs leading-snug text-blue-700">
                                                                    Explora nuestra amplia gama de equipos médicos de alta calidad.
                                                                </p>
                                                            </div>
                                                    </NavigationMenuLink>

                                                    {/* Contador de categorías */}
                                                    <div className="flex items-center justify-center p-2 mt-2 bg-gray-50 rounded-lg border">
                                                        {categoriesLoading ? (
                                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                                Cargando...
                                                            </div>
                                                        ) : (
                                                            <div className="text-xs text-gray-600 font-medium">
                                                                {sortedCategories.length} categorías disponibles
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Lista de categorías - lado derecho, scrollable */}
                                            <div className="space-y-1">
                                                {categoriesLoading ? (
                                                    <div className="flex items-center justify-center p-8">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                                                            <span className="text-xs text-gray-500">Cargando categorías...</span>
                                                        </div>
                                                    </div>
                                                ) : error ? (
                                                    <div className="text-center p-4">
                                                        <p className="text-xs text-red-600">Error al cargar categorías</p>
                                                    </div>
                                                ) : sortedCategories.length === 0 ? (
                                                    <div className="text-center p-4">
                                                        <p className="text-xs text-gray-500">No hay categorías disponibles</p>
                                                    </div>
                                                ) : (
                                                    <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100 pr-2">
                                                        <div className="space-y-1">
                                                            {sortedCategories.map((category: CategoryType) => (
                                                                <NavigationMenuLink key={category.id} asChild>
                                                                    <Link
                                                                        href={`/categoria/${createSlug(category.categoryName)}`}
                                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-blue-50 border border-transparent hover:border-blue-100 group"
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="p-1 bg-blue-100 group-hover:bg-blue-200 rounded-md transition-colors">
                                                                                <Package2 className="w-3 h-3 text-blue-600" />
                                                                            </div>
                                                                            <div className="text-sm font-medium leading-none group-hover:text-blue-900">
                                                                                {category.categoryName}
                                                                            </div>
                                                                        </div>
                                                                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-blue-700 ml-6">
                                                                            Productos de {category.categoryName.toLowerCase()} disponibles para equipos médicos profesionales.
                                                                        </p>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            ))}
                                                        </div>

                                                        {/* Indicador de scroll si hay muchas categorías */}
                                                        {sortedCategories.length > 5 && (
                                                            <div className="text-center py-2 border-t border-gray-100 mt-2">
                                                                <p className="text-xs text-gray-400">
                                                                    ↕ Desliza para ver más
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenu>
                    </div>

                    <nav className="flex items-center gap-4 xl:gap-6">
                        <button
                            onClick={() => router.push("/")}
                            className="text-gray-700 hover:text-blue-600 font-medium
                       transition-colors duration-200 hover:underline
                       decoration-blue-600 underline-offset-4 text-sm lg:text-base uppercase cursor-pointer"
                       aria-label="Ir a la página de Inicio"
                        >
                            Inicio
                        </button>

                        <button
                            onClick={() => router.push("/nosotros")}
                            className="text-gray-700 hover:text-blue-600 font-medium
                       transition-colors duration-200 hover:underline
                       decoration-blue-600 underline-offset-4 text-sm lg:text-base uppercase cursor-pointer"
                       aria-label="Ir a la página de Nosotros"
                        >
                            Nosotros
                        </button>

                        <button
                            onClick={() => {
                                // Usar replace en lugar de push para evitar problemas de historial
                                router.replace("/productos-destacados");
                            }}
                            className="text-gray-700 hover:text-blue-600 font-medium
                       transition-colors duration-200 hover:underline
                       decoration-blue-600 underline-offset-4 text-sm lg:text-base uppercase cursor-pointer"
                       aria-label="Ir a la página de Productos Destacados"
                        >
                            Productos Destacados
                        </button>

                        <button
                            onClick={() => router.push("/productos-top")}
                            className="text-gray-700 hover:text-blue-600 font-medium
                       transition-colors duration-200 hover:underline
                       decoration-blue-600 underline-offset-4 text-sm lg:text-base uppercase cursor-pointer"
                       aria-label="Ir a la página de Productos Top"
                        >
                            Productos Top
                        </button>
                        <button
                            onClick={() => router.push("/blog")}
                            className="text-gray-700 hover:text-blue-600 font-medium
                       transition-colors duration-200 hover:underline
                       decoration-blue-600 underline-offset-4 text-sm lg:text-base uppercase cursor-pointer"
                       aria-label="Ir a la página de Blog"
                        >
                            Blog
                        </button>

                        <button
                            onClick={() => router.push("/contacto")}
                            className="text-gray-700 hover:text-blue-600 font-medium
                       transition-colors duration-200 hover:underline
                       decoration-blue-600 underline-offset-4 text-sm lg:text-base uppercase cursor-pointer"
                       aria-label="Ir a la página de Contacto"
                        >
                            Contacto
                        </button>
                    </nav>
                </div>
            </div>

            <NavMobile isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
    );
};

export default Navbar;