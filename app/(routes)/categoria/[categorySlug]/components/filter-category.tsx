// components/filter-category.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import { getCategories } from "@/api/getCategoriesCarousel/getCategories";


import { CategoryType } from "@/types/category";

import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import {
  ChevronDown,
  Loader2,
  Package2,
  Grid3X3,
} from "lucide-react";
import { useGetCategoriesByArea } from "@/api/getProductByArea/useGetCategoriesByArea";

type FiltersCategoryProps = {
  setFilterCategory: (
    category: string,
  ) => void;

  filterCategory: string;

  setFilterArea: (
    area: string,
  ) => void;

  filterArea: string;
};

const FilterCategory = ({
  setFilterCategory,
  filterCategory,
  filterArea,
}: FiltersCategoryProps) => {
  /* =========================================================
     STATES
  ========================================================= */

  const [categories, setCategories] =
    useState<CategoryType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [isExpanded, setIsExpanded] =
    useState(true);

  /* =========================================================
     LOAD ALL CATEGORIES (OPTIMIZED)
  ========================================================= */

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);

        const data =
          await getCategories();

        setCategories(data || []);
      } catch (err) {
        console.error(err);

        setError(
          "Error al cargar categorías",
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  /* =========================================================
     GET CATEGORIES BY AREA
     (NO PRODUCTS, ONLY CATEGORY NAMES)
  ========================================================= */

  const {
    categoriesByArea,
    loading: areaLoading,
  } = useGetCategoriesByArea(
    filterArea,
  );

  /* =========================================================
     AUTO EXPAND
  ========================================================= */

  useEffect(() => {
    if (
      filterArea &&
      filterArea !==
        "Mobiliario médico"
    ) {
      setIsExpanded(true);
    }
  }, [filterArea]);

  /* =========================================================
     FILTERED + SORTED CATEGORIES
  ========================================================= */

  const filteredCategories =
    useMemo(() => {
      if (
        !categories ||
        !Array.isArray(categories)
      ) {
        return [];
      }

      let filtered = categories.filter(
        (category) =>
          category?.categoryName,
      );

      // Filter by area
      if (
        filterArea &&
        filterArea !==
          "Mobiliario médico" &&
        categoriesByArea.length > 0
      ) {
        filtered = filtered.filter(
          (category) =>
            categoriesByArea.includes(
              category.categoryName,
            ),
        );
      }

      return filtered;
    }, [
      categories,
      filterArea,
      categoriesByArea,
    ]);

  /* =========================================================
     SELECTED CATEGORY
  ========================================================= */

  const selectedCategory =
    useMemo(() => {
      return filteredCategories.find(
        (category) =>
          category.categoryName ===
          filterCategory,
      );
    }, [
      filteredCategories,
      filterCategory,
    ]);

  /* =========================================================
     HIDE FOR MOBILIARIO
  ========================================================= */

  if (
    filterArea ===
    "Mobiliario médico"
  ) {
    return null;
  }

  /* =========================================================
     HANDLE SELECT
  ========================================================= */

  const handleCategorySelect = (
    value: string,
  ) => {
    setFilterCategory(value);

    setIsExpanded(true);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <button
        type="button"
        onClick={() =>
          setIsExpanded(
            !isExpanded,
          )
        }
        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="p-2 rounded-xl bg-blue-100">
          <Grid3X3 className="w-4 h-4 text-blue-600" />
        </div>

        <div className="flex-1 text-left">
          <h3 className="text-sm font-semibold text-gray-900">
            {selectedCategory
              ? selectedCategory.categoryName
              : "Filtrar por Categoría"}
          </h3>

          {!selectedCategory && (
            <p className="text-xs text-gray-500">
              Selecciona una
              categoría
            </p>
          )}
        </div>

        {!loading && (
          <div className="px-2 py-1 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-xs font-semibold text-blue-600">
              {
                filteredCategories.length
              }
            </span>
          </div>
        )}

        {loading ||
        areaLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
        ) : (
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
              isExpanded
                ? "rotate-180"
                : ""
            }`}
          />
        )}
      </button>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* ERROR */}

          {error && (
            <div className="p-5 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-red-100 flex items-center justify-center mb-3">
                <Package2 className="w-6 h-6 text-red-500" />
              </div>

              <p className="text-sm font-semibold text-red-600">
                Error al cargar
                categorías
              </p>
            </div>
          )}

          {/* LOADING */}

          {(loading ||
            areaLoading) && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !areaLoading &&
            filteredCategories.length ===
              0 && (
              <div className="p-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                  <Package2 className="w-6 h-6 text-gray-400" />
                </div>

                <p className="text-sm text-gray-600">
                  No hay categorías
                  disponibles
                </p>
              </div>
            )}

          {/* CATEGORIES */}

          {!loading &&
            !areaLoading &&
            filteredCategories.length >
              0 && (
              <div className="max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100">
                <div className="p-4">
                  <RadioGroup
                    value={
                      filterCategory
                    }
                    onValueChange={
                      handleCategorySelect
                    }
                    className="space-y-2"
                  >
                    {filteredCategories.map(
                      (
                        category,
                      ) => (
                        <div
                          key={
                            category.id
                          }
                          className={`flex items-center gap-3 rounded-xl border p-3 transition-all cursor-pointer ${
                            filterCategory ===
                            category.categoryName
                              ? "border-blue-300 bg-blue-50"
                              : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                          }`}
                        >
                          <RadioGroupItem
                            value={
                              category.categoryName
                            }
                            id={
                              category.categoryName
                            }
                          />

                          <div
                            className={`p-2 rounded-lg ${
                              filterCategory ===
                              category.categoryName
                                ? "bg-blue-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <Package2 className="w-4 h-4 text-blue-600" />
                          </div>

                          <Label
                            htmlFor={
                              category.categoryName
                            }
                            className="flex-1 cursor-pointer text-sm font-medium text-gray-700"
                          >
                            {
                              category.categoryName
                            }
                          </Label>

                          {filterCategory ===
                            category.categoryName && (
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                          )}
                        </div>
                      ),
                    )}
                  </RadioGroup>
                </div>
              </div>
            )}

          {/* FOOTER */}

          {filteredCategories.length >
            5 && (
            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
              <p className="text-xs text-center text-gray-500">
                ↕ Desliza para
                ver más
                categorías
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          SELECTED CATEGORY
      ========================================================= */}

      {!isExpanded &&
        selectedCategory && (
          <div className="border-t border-blue-100 bg-blue-50 px-4 py-2">
            <p className="text-xs text-center text-blue-600 font-medium">
              ✓{" "}
              {
                selectedCategory.categoryName
              }{" "}
              seleccionada
            </p>
          </div>
        )}
    </div>
  );
};

export default FilterCategory;