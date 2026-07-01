"use client";

import { ProductCard } from "@/components/ui/product-card";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "@/types/product";
import { Package, Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  displayedProducts: ProductType[];
  loading: boolean;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  totalItems: number;
}

export default function ProductGrid({
  displayedProducts,
  loading,
  viewMode,
  setViewMode,
  totalItems,
}: ProductGridProps) {
  return (
    <>
      {/* Results Header */}
      {!loading && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-900">Resultados</p>
              <p className="text-sm text-gray-600">
                {totalItems} producto{totalItems !== 1 ? "s" : ""} encontrados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div
        className={cn(
          viewMode === "grid"
            ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            : "flex flex-col gap-4",
        )}
      >
        {loading && (
          <div className="col-span-full">
            <SkeletonSchema grid={6} />
          </div>
        )}

        {!loading && displayedProducts.length > 0 ? (
          displayedProducts.map((product: ProductType) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))
        ) : (
          !loading && (
            <div className="col-span-full py-16 text-center">
              <div className="mx-auto mb-5 flex w-24 h-24 items-center justify-center rounded-2xl bg-gray-100">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">
                No se encontraron productos
              </h2>
              <p className="mt-2 text-gray-500">
                Intenta modificar los filtros o explora otras categorías.
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}