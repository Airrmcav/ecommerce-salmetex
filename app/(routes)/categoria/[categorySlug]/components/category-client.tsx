"use client";

import { Separator } from "@/components/ui/separator";
import Breadcrumb from "@/components/BreadCrumbs";
import { ProductCard } from "@/components/ui/product-card";
import FilterCategory from "./filter-category";
import FilterArea from "./filter-area";
import { B2BValueProps, B2BTrustBlock } from "@/components/ui/b2b-blocks";
import { B2BFAQ } from "@/components/ui/b2b-faq";
import { DecisionGuide } from "@/components/ui/decision-guide";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import ProductGrid from "./product-grid";
import PaginationControls from "./pagination-controls";
import { ProductType } from "@/types/product";

import {
  Filter,
  Package,
  Stethoscope,
  SlidersHorizontal,
  MessageSquare,
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

interface CategoryClientProps {
  categorySlug: string;
  initialProducts: ProductType[];
  categoryName: string;
  initialAreaFilter?: string;
}

export default function CategoryClient({
  categorySlug,
  initialProducts,
  categoryName,
}: CategoryClientProps) {
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

  const [
    filterCategory,
    setFilterCategoryState,
  ] = useState(
    () => searchParams.get("cat") ?? "",
  );

  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(initialProducts);

  /* =========================================================
     URL FILTERS
  ========================================================= */

  const setFilterArea = useCallback(
    (value: string) => {
      setFilterAreaState(value);

      setFilterCategoryState("");

      const params = new URLSearchParams(
        searchParams.toString(),
      );

      if (value) {
        params.set("area", value);
      } else {
        params.delete("area");
      }

      params.delete("cat");

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

  const setFilterCategory = useCallback(
    (value: string) => {
      setFilterCategoryState(value);

      const params = new URLSearchParams(
        searchParams.toString(),
      );

      if (value) {
        params.set("cat", value);
      } else {
        params.delete("cat");
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

    const catFromUrl =
      searchParams.get("cat") ?? "";

    setFilterAreaState(areaFromUrl);

    setFilterCategoryState(catFromUrl);
  }, [searchParams]);

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  const fetchProducts = useCallback(
    async (
      area: string,
      category: string,
    ) => {
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

        if (categorySlug === "la-clinica-es-nuestra") {
          if (area) {
            url =
              `${baseUrl}/api/products?${query}` +
              `&filters[area][$eq]=${area}` +
              `&filters[programa][slug][$eq]=la-clinica-es-nuestra`;
          } else {
            url =
              `${baseUrl}/api/products?${query}` +
              `&filters[programa][slug][$eq]=la-clinica-es-nuestra`;
          }
        } else if (area && category) {
          url =
            `${baseUrl}/api/products?${query}` +
            `&filters[area][$eq]=${area}` +
            `&filters[category][categoryName][$eq]=${category}`;
        } else if (area) {
          url =
            `${baseUrl}/api/products?${query}` +
            `&filters[area][$eq]=${area}`;
        } else if (category) {
          url =
            `${baseUrl}/api/products?${query}` +
            `&filters[category][categoryName][$eq]=${category}`;
        } else if (
          categorySlug !== "todos"
        ) {
          url =
            `${baseUrl}/api/products?${query}` +
            `&filters[category][slug][$eq]=${categorySlug}`;
        } else {
          url = `${baseUrl}/api/products?${query}`;
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
    [baseUrl, categorySlug],
  );

  /* =========================================================
     FILTER EFFECT
  ========================================================= */

  useEffect(() => {
    if (
      !filterArea &&
      !filterCategory
    ) {
      setFilteredProducts(
        initialProducts,
      );

      return;
    }

    fetchProducts(
      filterArea,
      filterCategory,
    );
  }, [
    filterArea,
    filterCategory,
    fetchProducts,
    initialProducts,
  ]);

  /* =========================================================
     PAGINATION RESET
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterArea,
    filterCategory,
    categorySlug,
  ]);

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
    return [...filteredProducts].sort(
      (a, b) => {
        const aName =
          a?.productName?.toLocaleLowerCase(
            "es-MX",
          ) || "";

        const bName =
          b?.productName?.toLocaleLowerCase(
            "es-MX",
          ) || "";

        return aName.localeCompare(bName);
      },
    );
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

    for (let p = start; p <= end; p++) {
      arr.push(p);
    }

    if (end < totalPages - 1) {
      arr.push("...");
    }

    arr.push(totalPages);

    return arr;
  }, [currentPage, totalPages]);

  /* =========================================================
     BREADCRUMB
  ========================================================= */

  const breadcrumbItems = [
    {
      label: "Inicio",
      href: "/",
    },

    {
      label: "Categorías",
      href: "/categoria/todos",
    },

    {
      label:
        categoryName || "Categoría",
      isActive: true,
    },
  ];

  /* =========================================================
     PRODUCT COUNT
  ========================================================= */

  const productCount =
    filteredProducts.length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* =========================================================
          BREADCRUMB
      ========================================================= */}

      <div className="px-4">
        <Breadcrumb
          items={breadcrumbItems}
          backButton={{
            show: true,
            label: "Regresar",
          }}
        />
      </div>

      {/* =========================================================
          CONTAINER
      ========================================================= */}

      <div className="max-w-7xl mx-auto px-4 lg:px-0 py-3">
        {/* =========================================================
            HERO
        ========================================================= */}

        <header className="mb-6">
          <div className="flex gap-4">
            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-blue-100 items-center justify-center shrink-0">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {categorySlug === "todos" ? (
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Todos los Equipos Médicos
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {categoryName}
                  </span>
                )}
              </h1>

              <p className="mt-4 text-gray-600 text-base lg:text-lg max-w-3xl leading-relaxed">
                {categorySlug === "todos"
                  ? "Explora nuestra selección completa de equipos médicos certificados y tecnología especializada."
                  : `Encuentra equipos médicos especializados en ${categoryName.toLowerCase()} con calidad certificada y soporte técnico.`}
              </p>

              <div className="flex flex-wrap items-center gap-5 mt-5">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />

                  <span className="text-sm font-medium text-gray-700">
                    {productCount} producto
                    {productCount !== 1
                      ? "s"
                      : ""}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                  <span className="text-sm text-gray-600">
                    Envío nacional
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />

                  <span className="text-sm text-gray-600">
                    Calidad certificada
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-28 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-6" />
        </header>

        <B2BValueProps categoryName={categoryName} className="mb-6" />

        <Separator className="mb-6" />

        {/* =========================================================
            MOBILE FILTER BUTTON
        ========================================================= */}

        <div className="lg:hidden mb-4">
          <button
            onClick={() =>
              setMobileFiltersOpen(
                !mobileFiltersOpen,
              )
            }
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white py-3 font-medium text-blue-700 shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* =========================================================
            LAYOUT
        ========================================================= */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* =========================================================
              SIDEBAR
          ========================================================= */}

          <aside
            className={`lg:w-80 shrink-0 ${
              mobileFiltersOpen
                ? "block"
                : "hidden lg:block"
            }`}
          >
            <div className="sticky top-28 space-y-4">
              <FilterArea
                setFilterArea={
                  setFilterArea
                }
                filterArea={filterArea}
                setFilterCategory={
                  setFilterCategory
                }
              />

              <FilterCategory
                setFilterCategory={
                  setFilterCategory
                }
                filterCategory={
                  filterCategory
                }
                setFilterArea={
                  setFilterArea
                }
                filterArea={filterArea}
              />
            </div>
          </aside>

          {/* =========================================================
              CONTENT
          ========================================================= */}

          <main className="flex-1">
            {/* =========================================================
                ACTIVE FILTERS
            ========================================================= */}

            {(filterArea ||
              filterCategory) && (
              <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex flex-wrap gap-2">
                  {filterArea && (
                    <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1 text-sm">
                      Área:
                      {filterArea}

                      <button
                        onClick={() =>
                          setFilterArea(
                            "",
                          )
                        }
                        className="text-blue-600"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {filterCategory && (
                    <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1 text-sm">
                      Categoría:
                      {filterCategory}

                      <button
                        onClick={() =>
                          setFilterCategory(
                            "",
                          )
                        }
                        className="text-blue-600"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setFilterArea("");

                      setFilterCategory("");
                    }}
                    className="ml-auto rounded-lg bg-blue-100 px-4 py-1 text-sm text-blue-700 hover:bg-blue-200"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================
                PRODUCT GRID
            ========================================================= */}

            <ProductGrid
              displayedProducts={displayedProducts}
              loading={loading}
              viewMode={viewMode}
              setViewMode={setViewMode}
              totalItems={totalItems}
            />

            {/* =========================================================
                PAGINATION
            ========================================================= */}

            {!loading && totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                compactPages={compactPages}
                setCurrentPage={setCurrentPage}
              />
            )}

            {/* =========================================================
                B2B TRUST BLOCK
            ========================================================= */}

            {!loading && productCount > 0 && (
              <div className="mt-12">
                <B2BTrustBlock />
              </div>
            )}

            {/* =========================================================
                B2B FAQ
            ========================================================= */}

            <div className="mt-12">
              <B2BFAQ categoryName={categoryName} />
            </div>

            {/* =========================================================
                DECISION GUIDE
            ========================================================= */}

            <div className="mt-12">
              <DecisionGuide categorySlug={categorySlug} categoryName={categoryName} />
            </div>

            {/* =========================================================
                BOTTOM CTA
            ========================================================= */}

            <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
              <MessageSquare className="w-10 h-10 text-white/80 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿No encontraste lo que necesitas?
              </h3>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                Contáctanos directamente por WhatsApp. Nuestro equipo de especialistas te ayuda a encontrar el equipo exacto para tu clínica u hospital.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <WhatsAppLink
                  productName={categoryName}
                  type="quote"
                  size="lg"
                  className="!bg-green-500 hover:!bg-green-600 !text-white"
                  ariaLabel={`Cotizar ${categoryName} por WhatsApp`}
                />
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  Formulario de contacto
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}