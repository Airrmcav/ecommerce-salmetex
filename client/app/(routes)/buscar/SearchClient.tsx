"use client"
import Breadcrumb from "@/components/BreadCrumbs";
import { Separator } from "@/components/ui/separator";
import SkeletonSchema from "@/components/skeletonSchema";
import { useSearchProducts } from "@/api/searchProducts";
import { ProductType } from "@/types/product";
import ProductCard from "@/app/(routes)/categoria/[categorySlug]/components/product.card";
import { Filter, Grid3X3, List, Package } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function SearchClient({ q }: { q: string }) {
  const { result, loading, error } = useSearchProducts(q);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [q]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const products = useMemo(() => {
    const arr = Array.isArray(result?.products) ? result.products : [];
    return [...arr].sort((a: ProductType, b: ProductType) => {
      const an = a?.productName?.toLocaleLowerCase("es-MX") || "";
      const bn = b?.productName?.toLocaleLowerCase("es-MX") || "";
      return an.localeCompare(bn);
    });
  }, [result?.products]);

  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedProducts = products.slice(startIndex, endIndex);

  const compactPages = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const arr: (number | string)[] = [];
    arr.push(1);
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (start > 2) arr.push("...");
    for (let p = start; p <= end; p++) arr.push(p);
    if (end < totalPages - 1) arr.push("...");
    arr.push(totalPages);
    return arr;
  })();

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Buscar", isActive: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Breadcrumb
        items={breadcrumbItems}
        backButton={{
          show: true,
          label: "Regresar",
        }}
      />

      <div className="max-w-6xl py-8 mx-auto px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Resultados de búsqueda</h1>
          <p className="text-lg text-gray-600">
            {q ? (
              <>
                Mostrando coincidencias para <strong>"{q}"</strong>
              </>
            ) : (
              <>Ingresa un término de búsqueda para ver resultados</>
            )}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-6"></div>
        </header>

        <Separator className="my-6" />

        <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">Resultados</h2>
              <p className="text-sm text-gray-600">
                {totalItems} producto{totalItems !== 1 ? "s" : ""} encontrado{totalItems !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Vista:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className={`gap-3 ${
            viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3" : "flex flex-col space-y-4"
          }`}
        >
          {loading && (
            <div className="col-span-full">
              <SkeletonSchema grid={6} />
            </div>
          )}

          {!loading &&
            Array.isArray(displayedProducts) &&
            displayedProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}

          {!loading && Array.isArray(products) && products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No hay productos que coincidan con el término de búsqueda. Intenta con otra palabra clave.
              </p>
            </div>
          )}

          {error && (
            <div className="col-span-full text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Error al buscar productos</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`cursor-pointer px-3 py-1 rounded-lg border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              Anterior
            </button>
            {compactPages.map((item, idx) =>
              typeof item === "number" ? (
                <button
                  key={`p-${item}`}
                  onClick={() => setCurrentPage(item)}
                  className={`cursor-pointer px-3 py-1 rounded-lg border ${
                    currentPage === item
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span key={`e-${idx}`} className="px-2 text-gray-500">
                  …
                </span>
              )
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`cursor-pointer px-3 py-1 rounded-lg border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
