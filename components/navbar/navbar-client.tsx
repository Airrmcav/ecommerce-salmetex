"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import {
  ShoppingCart,
  Menu,
  X,
  BaggageClaim,
  Package2,
  Heart,
  CheckCircle,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

import SearchDropdown from "../SearchDropdown";

import { CategoryType } from "@/types/category";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavMobile from "./navMobile";

interface Props {
  categories: CategoryType[];
}

const FACEBOOK_GROUP = "https://www.facebook.com/groups/723178883718883";

const ALLOWED_CATEGORIES = [
  "insumos-medicos",
  "equipo-medico",
  "mobiliario-medico",
  "la-clinica-es-nuestra",
  "imss-bienestar",
];

const NavbarClient = ({ categories }: Props) => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cart = useCart();

  const { lovedItems } = useLovedProducts();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-0 py-1 mx-auto max-w-7xl">
          {/* Logo */}
          <Link
            href="/"
            className="cursor-pointer shrink-0 transition-transform hover:scale-105"
          >
            <Image
              src="/logo/logo-letras.png"
              alt="Logo SALMETEXMED"
              width={180}
              height={80}
              priority
              className="h-16 sm:h-18 md:h-20 lg:h-18 w-auto object-contain"
            />
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 mx-2 lg:mx-4 xl:mx-8 max-w-2xl">
            <SearchDropdown />
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.open(FACEBOOK_GROUP, "_blank")}
              className="cursor-pointer px-4 xl:px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 
             text-white font-medium rounded-xl shadow-md text-xs xl:text-sm
             hover:shadow-lg hover:from-blue-700 hover:to-blue-800 
             transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Suscríbete a nuestro grupo de <br />
              promociones
            </button>

            <Link
              href="/productos-favoritos"
              className="relative p-3 text-gray-600 hover:text-blue-600
             bg-gray-50/80 hover:bg-blue-50 rounded-xl
             shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Heart
                strokeWidth="1"
                className={`${lovedItems.length > 0 && "fill-red-300"}`}
              />
            </Link>

            <Link
              href="/carrito"
              className="relative p-3 text-gray-600 hover:text-blue-600 
             bg-gray-50/80 hover:bg-blue-50 rounded-xl
             shadow-sm hover:shadow-md transition-all duration-200"
            >
              {cart.items.length === 0 ? (
                <ShoppingCart size={24} strokeWidth={1.5} />
              ) : (
                <div className="flex gap-1 items-center">
                  <BaggageClaim strokeWidth={1} size={24} />
                  <span>{cart.items.length}</span>
                </div>
              )}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/carrito"
              className="relative p-3 text-gray-600 hover:text-blue-600 
             bg-gray-50/80 hover:bg-blue-50 rounded-xl"
            >
              {cart.items.length === 0 ? (
                <ShoppingCart size={24} strokeWidth={1.5} />
              ) : (
                <div className="flex gap-1 items-center">
                  <BaggageClaim strokeWidth={1} size={24} />
                  <span>{cart.items.length}</span>
                </div>
              )}
            </Link>

            <Link
              href="/productos-favoritos"
              className="relative p-3 text-gray-600 hover:text-blue-600
             bg-gray-50/80 hover:bg-blue-50 rounded-xl"
            >
              <Heart
                strokeWidth="1"
                className={`${lovedItems.length > 0 && "fill-red-300"}`}
              />
            </Link>

            <button
              onClick={toggleMenu}
              className="p-3 text-gray-600 hover:text-blue-600 
                     bg-gray-50/80 hover:bg-blue-50 rounded-xl"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3 mt-3">
          <SearchDropdown
            isMobile={true}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="uppercase bg-transparent">
                    Productos
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="w-[400px] lg:w-[500px] xl:w-[700px]">
                      <div className="grid lg:grid-cols-[.75fr_1fr] gap-4 p-2">
                        {/* LEFT SIDE */}
                        <div className="space-y-3 flex items-center">
                          <div>
                            <NavigationMenuLink
                              className="flex flex-col items-center text-center select-none space-y-3 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 hover:shadow-md"
                              href="/categoria/todos"
                            >
                              <div className="p-3 bg-linear-to-br from-blue-100 to-indigo-100 rounded-xl border border-blue-200">
                                <Package2 className="w-6 h-6 text-blue-600" />
                              </div>

                              <div className="space-y-1">
                                <div className="text-sm font-semibold leading-none text-blue-900">
                                  Ver Todos los Productos
                                </div>

                                <p className="line-clamp-2 text-xs leading-snug text-blue-700">
                                  Explora nuestra amplia gama de equipos médicos
                                  de alta calidad.
                                </p>
                              </div>
                            </NavigationMenuLink>

                            {/* Counter */}
                            <div className="flex items-center justify-center p-2 mt-2 bg-gray-50 rounded-lg border">
                              <div className="text-xs text-gray-600 font-medium">
                                {categories.length} categorías disponibles
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT SIDE */}
                        {/* RIGHT SIDE */}
                        <div className="space-y-1">
                          <div className="max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 pr-2">
                            <div className="space-y-1">
                              {[
                                {
                                  id: 1,
                                  name: "Insumos Médicos",
                                  slug: "todos?area=Insumos+médicos",
                                },
                                {
                                  id: 2,
                                  name: "Equipo Médico",
                                  slug: "todos?area=Equipo+Médico",
                                },
                                {
                                  id: 3,
                                  name: "Mobiliario Médico",
                                  slug: "todos?area=Mobiliario+médico",
                                },
                                {
                                  id: 4,
                                  name: "La Clínica es Nuestra",
                                  slug: "la-clinica-es-nuestra",
                                },
                                {
                                  id: 5,
                                  name: "IMSS Bienestar",
                                  slug: "imss-bienestar",
                                },
                              ].map((category) => (
                                <NavigationMenuLink key={category.id} asChild>
                                  <Link
                                    href={`/categoria/${category.slug}`}
                                    className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none 
              transition-colors border border-transparent group
              hover:bg-blue-50 hover:border-blue-100 hover:text-accent-foreground
              focus:bg-accent focus:text-accent-foreground
              [&_.icon-wrapper]:hover:bg-blue-200
              [&_.title]:hover:text-blue-900
              [&_.description]:hover:text-blue-700"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="icon-wrapper p-1 bg-blue-100 rounded-md transition-colors">
                                        <Package2 className="w-3 h-3 text-blue-600" />
                                      </div>
                                      <div className="title text-sm font-medium leading-none">
                                        {category.name}
                                      </div>
                                    </div>
                                    <p className="description line-clamp-2 text-xs leading-snug text-muted-foreground ml-6">
                                      Productos disponibles en esta categoría.
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>

                          {/* Bottom */}
                          <div className="text-center py-2 border-t border-gray-100 mt-2">
                            <p className="text-xs text-gray-400">
                              ↕ Desliza para ver más
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Links */}
            <nav className="flex items-center gap-4 text-sm uppercase">
              <Link href="/">Inicio</Link>

              <Link href="/nosotros">Nosotros</Link>

              {/* <Link
                href="/imss-bienestar"
                className="bg-emerald-800 p-1 rounded-2xl text-white"
              >
                IMSS Bienestar
              </Link>
              <Link
                href="/la-clinica-es-nuestra"
                className="bg-emerald-800 p-1 rounded-2xl text-white"
              >
                LA CLÍNICA ES NUESTRA
              </Link> */}
              <Link href="/categoria/todos?area=Insumos+médicos">
                INSUMOS MÉDICOS
              </Link>
              <Link href="/categoria/todos?area=Equipo+Médico">
                EQUIPO MÉDICO
              </Link>
              <Link href="/categoria/todos?area=Mobiliario+médico">
                MOBILIARIO MÉDICO
              </Link>

              <Link href="/blog">Blog</Link>

              <Link href="/contacto">Contacto</Link>
            </nav>
          </div>
        </div>
      </div>
      <NavMobile isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default NavbarClient;
