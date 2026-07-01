"use client";

import { Separator } from "@/components/ui/separator";
import Breadcrumb from "@/components/BreadCrumbs";
import SkeletonSchema from "@/components/skeletonSchema";




import { ProductType } from "@/types/product";

import {
  Filter,
  Grid3X3,
  List,
  Package,
  SlidersHorizontal,
} from "lucide-react";

import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ProductCard } from "@/components/ui/product-card";

interface ClinicaClientProps {
  initialProducts: ProductType[];
}

export default function ClinicaClient({
  initialProducts,
}: ClinicaClientProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL;

  /* =========================================================
     STATES
  ========================================================= */

  const [viewMode, setViewMode] = useState<
    "grid" | "list"
  >("grid");

  const [loading, setLoading] =
    useState(false);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const pageSize = 12;

  const [filterArea, setFilterAreaState] =
    useState(
      () => searchParams.get("area") ?? "",
    );

  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(initialProducts);

  /* =========================================================
     URL FILTERS
  ========================================================= */

  const setFilterArea = useCallback(
    (value: string) => {
      setFilterAreaState(value);

      const params = new URLSearchParams(
        searchParams.toString(),
      );

      if (value) {
        params.set("area", value);
      } else {
        params.delete("area");
      }

      const qs = params.toString();

      router.replace(
        qs ? `${pathname}?${qs}` : pathname,
        {
          scroll: false,
        },
      );
    },
    [router, pathname, searchParams],
  );

  /* =========================================================
     SYNC URL
  ========================================================= */

  useEffect(() => {
    const areaFromUrl =
      searchParams.get("area") ?? "";

    setFilterAreaState(areaFromUrl);
  }, [searchParams]);

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  const fetchProducts = useCallback(
    async (area: string) => {
      setLoading(true);

      try {
        const query =
          `fields[0]=productName` +
          `&fields[1]=slug` +
          `&fields[2]=price` +
          `&fields[3]=description` +
          `&fields[4]=purchaseType` +
          `&fields[5]=active` +
          `&populate[images][fields][0]=url` +
          `&populate[category][fields][0]=categoryName`;

        let url = "";

        if (area) {
          url =
            `${baseUrl}/api/products?${query}` +
            `&filters[area][$eq]=${area}` +
            `&filters[programa][$eq]=clinica`;
        } else {
          url =
            `${baseUrl}/api/products?${query}` +
            `&filters[programa][$eq]=clinica`;
        }

        const res = await fetch(url);

        const json = await res.json();

        setFilteredProducts(
          json?.data ?? [],
        );
      } catch (error) {
        console.error(
          "Error fetching products:",
          error,
        );

        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [baseUrl],
  );

  /* =========================================================
     FILTER EFFECT
  ========================================================= */

  useEffect(() => {
    if (!filterArea) {
      setFilteredProducts(
        initialProducts,
      );

      return;
    }

    fetchProducts(filterArea);
  }, [
    filterArea,
    fetchProducts,
    initialProducts,
  ]);

  /* =========================================================
     PAGINATION RESET
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [filterArea]);

  /* =========================================================
     SCROLL TOP
  ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  /* =========================================================
     SORT PRODUCTS
  ========================================================= */

const sortedProducts = useMemo(() => {
  if (!Array.isArray(filteredProducts)) return [];
  
  return [...filteredProducts].sort((a, b) => {
    const aName = a?.productName?.toLocaleLowerCase("es-MX") || "";
    const bName = b?.productName?.toLocaleLowerCase("es-MX") || "";
    return aName.localeCompare(bName);
  });
}, [filteredProducts]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalItems =
    sortedProducts.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize),
  );

  const startIndex =
    (currentPage - 1) * pageSize;

  const displayedProducts =
    sortedProducts.slice(
      startIndex,
      startIndex + pageSize,
    );

  const compactPages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1,
      );
    }

    const arr: (
      | number
      | string
    )[] = [1];

    const start = Math.max(
      2,
      currentPage - 1,
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1,
    );

    if (start > 2) {
      arr.push("...");
    }

    for (let i = start; i <= end; i++) {
      arr.push(i);
    }

    if (end < totalPages - 1) {
      arr.push("...");
    }

    arr.push(totalPages);

    return arr;
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-8">
    

      {/* HEADER WITH FILTERS */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            La Clínica es Nuestra
          </h1>
          <p className="text-muted-foreground">
            Productos especializados para el programa de la clínica
          </p>
        </div>

        <Separator />

        {/* FILTERS */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setMobileFiltersOpen(
                  !mobileFiltersOpen,
                )
              }
              className="lg:hidden p-2 border rounded-lg hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            
          </div>

          {/* VIEW MODE */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                setViewMode("grid")
              }
              className={`p-2 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-slate-100"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setViewMode("list")
              }
              className={`p-2 rounded-lg transition ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-slate-100"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

      
      </div>

      <Separator />

      {/* RESULTS COUNTER */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Package className="w-4 h-4" />
        <span>
          Mostrando {displayedProducts.length} de{" "}
          {totalItems} productos
        </span>
      </div>

      {/* PRODUCTS GRID / LIST */}
   {/* PRODUCTS GRID / LIST */}
{loading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <SkeletonSchema grid={4} />
  </div>
) : displayedProducts.length > 0 ? (
  <div
    className={
      viewMode === "grid"
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        : "space-y-4"
    }
  >
    {displayedProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
) : (
  <div className="text-center py-12">
    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
    <p className="text-muted-foreground">
      No hay productos disponibles con los filtros seleccionados.
    </p>
  </div>
)}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 flex-wrap py-8">
          {currentPage > 1 && (
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage - 1,
                )
              }
              className="px-3 py-2 border rounded-lg hover:bg-slate-50 transition"
            >
              ← Anterior
            </button>
          )}

          {compactPages.map(
            (page, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (
                    typeof page ===
                    "number"
                  ) {
                    setCurrentPage(
                      page,
                    );
                  }
                }}
                disabled={
                  page === "..."
                }
                className={`px-3 py-2 rounded-lg transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : page === "..."
                      ? "cursor-not-allowed"
                      : "border hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ),
          )}

          {currentPage < totalPages && (
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage + 1,
                )
              }
              className="px-3 py-2 border rounded-lg hover:bg-slate-50 transition"
            >
              Siguiente →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
