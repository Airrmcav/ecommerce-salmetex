'use client';

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useDeferredValue,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Search,
  Loader2,
} from 'lucide-react';

import { useSearchProducts } from '@/api/searchProduct/searchProducts';

import { ProductType } from '@/types/product';
import { CategoryType } from '@/types/category';

interface SearchDropdownProps {
  isMobile?: boolean;
  onClose?: () => void;
}

/* =========================================================
   SLUG
========================================================= */

const createSlug = (
  text: string | undefined,
) => {
  if (!text) return 'categoria';

  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/* =========================================================
   COMPONENT
========================================================= */

export default function SearchDropdown({
  isMobile = false,
  onClose,
}: SearchDropdownProps) {
  const router = useRouter();

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  /* =========================================================
     STATE
  ========================================================= */

  const [searchTerm, setSearchTerm] =
    useState('');

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  /* =========================================================
     OPTIMIZED SEARCH
  ========================================================= */

  const deferredSearch =
    useDeferredValue(searchTerm);

  const normalizedSearch =
    deferredSearch.trim();

  const {
    result,
    loading,
    error,
  } = useSearchProducts(
    normalizedSearch,
  );

  /* =========================================================
     MEMOS
  ========================================================= */

  const hasProducts = useMemo(
    () =>
      result.products.length > 0,
    [result.products],
  );

  const hasCategories = useMemo(
    () =>
      result.categories.length > 0,
    [result.categories],
  );

  const hasResults =
    hasProducts || hasCategories;

  const visibleProducts = useMemo(
    () =>
      result.products.slice(0, 5),
    [result.products],
  );

  const visibleCategories =
    useMemo(
      () =>
        result.categories.slice(
          0,
          3,
        ),
      [result.categories],
    );

  /* =========================================================
     CLICK OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, []);

  /* =========================================================
     OPEN DROPDOWN
  ========================================================= */

  useEffect(() => {
    if (
      normalizedSearch.length >= 2
    ) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [normalizedSearch]);

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleSearch =
    useCallback(
      (
        e: React.ChangeEvent<HTMLInputElement>,
      ) => {
        setSearchTerm(
          e.target.value,
        );
      },
      [],
    );

  const handleItemClick =
    useCallback(() => {
      setIsDropdownOpen(false);

      setSearchTerm('');

      onClose?.();
    }, [onClose]);

  const handleKeyDown =
    useCallback(
      (
        e: React.KeyboardEvent<HTMLInputElement>,
      ) => {
        if (
          e.key === 'Enter' &&
          normalizedSearch.length >= 2
        ) {
          router.push(
            `/buscar?q=${encodeURIComponent(
              normalizedSearch,
            )}`,
          );

          setIsDropdownOpen(false);

          onClose?.();
        }
      },
      [
        normalizedSearch,
        router,
        onClose,
      ],
    );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full ${
        isMobile
          ? ''
          : 'max-w-2xl'
      }`}
    >
      {/* =========================================================
          INPUT
      ========================================================= */}

      <div className="relative">
        <Search
          size={
            isMobile ? 18 : 20
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={
            handleSearch
          }
          onKeyDown={
            handleKeyDown
          }
          placeholder="Buscar equipos médicos..."
          className={`w-full ${
            isMobile
              ? 'pl-10 pr-4 py-2.5 text-sm'
              : 'pl-12 pr-4 py-3 text-sm lg:text-base'
          }
          bg-gray-50/80
          border border-gray-200
          rounded-xl lg:rounded-2xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500/50
          focus:border-blue-500
          focus:bg-white
          transition-all duration-300
          placeholder-gray-500
          text-gray-700`}
        />

        {loading &&
          normalizedSearch.length >=
            2 && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-blue-500" />
          )}
      </div>

      {/* =========================================================
          DROPDOWN
      ========================================================= */}

      {isDropdownOpen &&
        normalizedSearch.length >=
          2 && (
          <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-h-[80vh] overflow-y-auto">
            {/* =========================================================
                LOADING
            ========================================================= */}

            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />

                <span className="text-gray-600 text-sm">
                  Buscando...
                </span>
              </div>
            ) : hasResults ? (
              <div>
                {/* =========================================================
                    CATEGORIES
                ========================================================= */}

                {hasCategories && (
                  <div className="p-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                      Categorías
                    </h3>

                    <div className="space-y-1">
                      {visibleCategories.map(
                        (
                          category: CategoryType,
                        ) => (
                          <Link
                            key={
                              category.id
                            }
                            href={`/categoria/${createSlug(
                              category.categoryName,
                            )}`}
                            onClick={
                              handleItemClick
                            }
                            className="block px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          >
                            <div className="flex items-center gap-2">
                              {category.mainImage
                                ?.url && (
                                <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0 relative">
                                  <Image
                                    src={
                                      category
                                        .mainImage
                                        .url
                                    }
                                    alt={
                                      category
                                        .mainImage
                                        .alternativeText ||
                                      category.categoryName
                                    }
                                    fill
                                    sizes="32px"
                                    className="object-cover"
                                  />
                                </div>
                              )}

                              <div>
                                <div className="font-medium text-gray-800">
                                  {
                                    category.categoryName
                                  }
                                </div>

                                {category.description && (
                                  <div className="text-xs text-gray-500 truncate">
                                    {category.description.substring(
                                      0,
                                      60,
                                    )}

                                    {category
                                      .description
                                      .length >
                                      60 &&
                                      '...'}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* =========================================================
                    PRODUCTS
                ========================================================= */}

                {hasProducts && (
                  <div className="p-3 border-t border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                      Productos
                    </h3>

                    <div className="space-y-2">
                      {visibleProducts.map(
                        (
                          product: ProductType,
                        ) => (
                          <Link
                            key={
                              product.id
                            }
                            href={`/${product.slug}`}
                            onClick={
                              handleItemClick
                            }
                            className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden shrink-0 relative">
                              {product
                                .images?.[0]
                                ?.url ? (
                                <Image
                                  src={
                                    product
                                      .images[0]
                                      .url
                                  }
                                  alt={
                                    product.productName
                                  }
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  Sin img
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="font-medium text-gray-800 text-sm truncate">
                                {
                                  product.productName
                                }
                              </div>

                              {product.description && (
                                <div className="text-xs text-gray-500 truncate">
                                  {product.description.substring(
                                    0,
                                    60,
                                  )}

                                  {product
                                    .description
                                    .length >
                                    60 &&
                                    '...'}
                                </div>
                              )}
                            </div>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* =========================================================
                    VIEW ALL
                ========================================================= */}

                <div className="bg-gray-50 p-3 border-t border-gray-100 text-center">
                  <Link
                    href={`/buscar?q=${encodeURIComponent(
                      normalizedSearch,
                    )}`}
                    onClick={
                      handleItemClick
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver todos los resultados
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No se encontraron
                resultados para "
                {
                  normalizedSearch
                }
                "
              </div>
            )}

            {/* =========================================================
                ERROR
            ========================================================= */}

            {error && (
              <div className="p-3 text-center text-red-500 text-sm border-t border-gray-100">
                {error}
              </div>
            )}
          </div>
        )}
    </div>
  );
}