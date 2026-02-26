"use client";

import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./product.card";
import { ProductType } from "@/types/product";
import { Filter, Grid3X3, List, Package, Stethoscope } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Breadcrumb from "@/components/BreadCrumbs";
import FilterCategory from "./filter-category";
import FilterArea from "./filter-area";

interface CategoryClientProps {
  categorySlug: string;
  initialProducts: ProductType[];
  categoryName: string;
  initialAreaFilter: string;
}

export default function CategoryClient({
  categorySlug,
  initialProducts,
  categoryName,
  initialAreaFilter,
}: CategoryClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterArea, setFilterArea] = useState(initialAreaFilter);
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch con filtros en cliente
  const fetchProducts = useCallback(async (area: string, category: string) => {
    setLoading(true);
    try {
      let url = "";

      if (area && category) {
        url = `${baseUrl}/api/products?populate=*&filters[area][$eq]=${area}&filters[category][categoryName][$eq]=${category}`;
      } else if (area) {
        url = `${baseUrl}/api/products?populate=*&filters[area][$eq]=${area}`;
      } else if (category) {
        url = `${baseUrl}/api/products?populate=*&filters[category][categoryName][$eq]=${category}`;
      } else if (categorySlug !== "todos") {
        url = `${baseUrl}/api/products?populate=*&filters[category][slug][$eq]=${categorySlug}`;
      } else {
        url = `${baseUrl}/api/products?populate=*`;
      }

      const res = await fetch(url);
      const json = await res.json();
      setFilteredProducts(json.data ?? []);
    } catch {
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, categorySlug]);

  // Re-fetch cuando cambian los filtros
  useEffect(() => {
    // Si no hay filtros activos y tenemos los productos iniciales, usarlos directamente
    if (!filterArea && !filterCategory) {
      setFilteredProducts(initialProducts);
      return;
    }
    fetchProducts(filterArea, filterCategory);
  }, [filterArea, filterCategory, fetchProducts, initialProducts]);

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filterArea, filterCategory, categorySlug]);

  // Scroll al top al cambiar página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Ordenar alfabéticamente
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aName = a?.productName?.toLocaleLowerCase("es-MX") || "";
    const bName = b?.productName?.toLocaleLowerCase("es-MX") || "";
    return aName.localeCompare(bName);
  });

  const totalItems = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const displayedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);

  const compactPages = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr: (number | string)[] = [1];
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
    { label: "Categorías", href: "/categoria/todos" },
    { label: categoryName || "Cargando...", isActive: true },
  ];

  const productCount =
    categorySlug === "todos" ? filteredProducts.length : initialProducts.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      <Breadcrumb items={breadcrumbItems} backButton={{ show: true, label: "Regresar" }} />

      <div className="max-w-7xl py-2 mx-auto px-6 lg:px-8">
        {/* Header — visible para Google gracias al SSR del page.tsx */}
        <header className="mb-3">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-linear-to-r from-blue-100 to-indigo-100 rounded-2xl hidden md:block">
              <Stethoscope className="w-8 h-8 text-blue-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {categorySlug === "todos" ? (
                  <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Todos los Equipos Médicos
                  </span>
                ) : (
                  <>
                    <span className="block">Equipos Médicos de</span>
                    <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {categoryName}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                {categorySlug === "todos" ? (
                  <>Descubre nuestra completa selección de equipos médicos de alta calidad. Tecnología certificada, calidad garantizada y soporte técnico especializado.</>
                ) : (
                  <>Descubre nuestra selección de equipos médicos especializados en{" "}
                    <strong>{categoryName.toLowerCase()}</strong>.
                    Tecnología certificada, calidad garantizada y soporte técnico especializado.
                  </>
                )}
              </p>

              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700">
                    {productCount} producto{productCount !== 1 ? "s" : ""} disponible{productCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">Envío disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm text-gray-600">Certificado médico</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full mt-[15px]" />
        </header>

        <Separator className="my-2" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filtros */}
          <aside className="lg:w-80 shrink-0">
            <FilterArea
              setFilterArea={setFilterArea}
              filterArea={filterArea}
              setFilterCategory={setFilterCategory}
            />
            <FilterCategory
              setFilterCategory={setFilterCategory}
              filterCategory={filterCategory}
              setFilterArea={setFilterArea}
              filterArea={filterArea}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Filtros activos */}
            {(filterArea || filterCategory) && (
              <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-700 mb-1">Filtros activos:</p>
                    <div className="flex flex-wrap gap-2">
                      {filterArea && (
                        <div className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 flex items-center gap-2">
                          <span>Área: {filterArea}</span>
                          <button
                            onClick={() => setFilterArea("")}
                            aria-label="Quitar filtro de área"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      {filterCategory && (
                        <div className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 flex items-center gap-2">
                          <span>Categoría: {filterCategory}</span>
                          <button
                            onClick={() => setFilterCategory("")}
                            aria-label="Quitar filtro de categoría"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => { setFilterArea(""); setFilterCategory(""); }}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm transition-colors duration-200"
                  >
                    Limpiar todos
                  </button>
                </div>
              </div>
            )}

            {/* Results Header */}
            {!loading && (
              <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-gray-900">Resultados de búsqueda</p>
                    <p className="text-sm text-gray-600">
                      {totalItems} producto{totalItems !== 1 ? "s" : ""} encontrado{totalItems !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 mr-2">Vista:</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Vista en cuadrícula"
                    className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="Vista en lista"
                    className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <List className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className={`gap-3 ${
              viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3" : "flex flex-col space-y-4"
            }`}>
              {loading && (
                <div className="col-span-full">
                  <SkeletonSchema grid={6} />
                </div>
              )}

              {!loading && displayedProducts.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}

              {!loading && displayedProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <Package className="w-12 h-12 text-gray-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    No se encontraron productos
                  </h2>
                  <p className="text-gray-500 max-w-md mx-auto">
                    No hay productos disponibles en esta categoría. Intenta ajustar los filtros o revisa otras categorías.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <nav aria-label="Paginación de productos" className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`cursor-pointer px-3 py-1 rounded-lg border ${
                    currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  Anterior
                </button>
                {compactPages.map((item, idx) =>
                  typeof item === "number" ? (
                    <button
                      key={`p-${item}`}
                      onClick={() => setCurrentPage(item)}
                      aria-label={`Página ${item}`}
                      aria-current={currentPage === item ? "page" : undefined}
                      className={`cursor-pointer px-3 py-1 rounded-lg border ${
                        currentPage === item ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {item}
                    </button>
                  ) : (
                    <span key={`e-${idx}`} className="px-2 text-gray-500">…</span>
                  )
                )}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`cursor-pointer px-3 py-1 rounded-lg border ${
                    currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  Siguiente
                </button>
              </nav>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}