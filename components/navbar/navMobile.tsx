// components/navbar/navMobile.tsx

"use client";

import Link from "next/link";

import {
  X,
  Heart,
  ShoppingCart,
  BaggageClaim,
  Home,
  Users,
  FileText,
  Phone,
  Package2,
  Building2,
  Stethoscope,
} from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const NavMobile = ({
  isMenuOpen,
  toggleMenu,
}: Props) => {
  const cart = useCart();

  const { lovedItems } = useLovedProducts();

  if (!isMenuOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={toggleMenu}
      />

      {/* Menu */}
      <div
        className="absolute right-0 top-0 h-full w-[85%] max-w-sm
        bg-white shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Menú
            </h2>

            <p className="text-sm text-gray-500">
              Navegación principal
            </p>
          </div>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 p-5 border-b border-gray-100">
          <Link
            href="/carrito"
            onClick={toggleMenu}
            className="flex items-center justify-between p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-blue-900">
                Carrito
              </p>

              <p className="text-xs text-blue-600">
                {cart.items.length} productos
              </p>
            </div>

            {cart.items.length === 0 ? (
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            ) : (
              <BaggageClaim className="w-5 h-5 text-blue-600" />
            )}
          </Link>

          <Link
            href="/productos-favoritos"
            onClick={toggleMenu}
            className="flex items-center justify-between p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-red-900">
                Favoritos
              </p>

              <p className="text-xs text-red-600">
                {lovedItems.length} guardados
              </p>
            </div>

            <Heart
              className={`w-5 h-5 text-red-600 ${
                lovedItems.length > 0
                  ? "fill-red-400"
                  : ""
              }`}
            />
          </Link>
        </div>

        {/* Main navigation */}
        <div className="p-5">
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
            Navegación
          </p>

          <div className="space-y-2">
            <Link
              href="/"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5 text-blue-600" />

              <span className="font-medium text-gray-700">
                Inicio
              </span>
            </Link>

            <Link
              href="/nosotros"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Users className="w-5 h-5 text-blue-600" />

              <span className="font-medium text-gray-700">
                Nosotros
              </span>
            </Link>

            <Link
              href="/blog"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-600" />

              <span className="font-medium text-gray-700">
                Blog
              </span>
            </Link>

            <Link
              href="/contacto"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5 text-blue-600" />

              <span className="font-medium text-gray-700">
                Contacto
              </span>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="p-5 border-t border-gray-100">
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
            Categorías
          </p>

          <div className="space-y-2">
            <Link
              href="/categoria/todos?area=Equipo+Médico"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Stethoscope className="w-5 h-5 text-blue-600" />

              <span className="font-medium text-blue-900">
                Equipo Médico
              </span>
            </Link>

            <Link
              href="/categoria/todos?area=Insumos+médicos"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Package2 className="w-5 h-5 text-emerald-600" />

              <span className="font-medium text-emerald-900">
                Insumos Médicos
              </span>
            </Link>

            <Link
              href="/categoria/todos?area=Mobiliario+médico"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <Building2 className="w-5 h-5 text-orange-600" />

              <span className="font-medium text-orange-900">
                Mobiliario Médico
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100">
          <Link
            href="/categoria/todos"
            onClick={toggleMenu}
            className="w-full flex items-center justify-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white font-medium rounded-xl
            py-4 transition-colors"
          >
            <Package2 className="w-5 h-5" />

            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavMobile;