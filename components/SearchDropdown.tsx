'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchProducts } from '@/api/searchProducts';
import { ProductType } from '@/types/product';
import { CategoryType } from '@/types/category';

interface SearchDropdownProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function SearchDropdown({ isMobile = false, onClose }: SearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Usar el hook de búsqueda
  const { result, loading, error } = useSearchProducts(searchTerm);
  
  // Depuración
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      console.log('SearchDropdown - Resultados:', result);
    }
  }, [result, searchTerm]);
  
  // Función para crear URLs amigables sin acentos
  const createSlug = (text: string | undefined) => {
    // Si el texto es undefined o null, devolver un valor por defecto
    if (!text) return 'producto';
    
    return text
      .trim() // Eliminar espacios al inicio y final
      .toLowerCase() // Convertir a minúsculas
      .normalize('NFD') // Normalizar caracteres Unicode
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos y diacríticos
      .replace(/[^a-z0-9\s-]/g, '') // Solo permitir letras, números, espacios y guiones
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
      .trim(); // Eliminar posibles espacios o guiones al inicio/final
  };

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Abrir el dropdown cuando hay resultados o cuando se está buscando
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      // Siempre mostrar el dropdown cuando hay un término de búsqueda
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);
  
  // Verificar si hay resultados para mostrar
  const hasProducts = Array.isArray(result.products) && result.products.length > 0;
  const hasCategories = Array.isArray(result.categories) && result.categories.length > 0;
  const hasResults = hasProducts || hasCategories;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      router.push(`/buscar?q=${searchTerm}`);
      setIsDropdownOpen(false);
      if (onClose) onClose();
    }
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
    setSearchTerm('');
    if (onClose) onClose();
  };
  // La variable hasResults ya está definida arriba

  return (
    <div className={`relative w-full ${isMobile ? '' : 'max-w-2xl'}`} ref={dropdownRef}>
      <div className="relative">
        <Search
          size={isMobile ? 18 : 20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Buscar equipos médicos..."
          className={`w-full ${isMobile ? 'pl-10 pr-4 py-2.5 text-sm' : 'pl-12 pr-4 py-3 text-sm lg:text-base'} 
            bg-gray-50/80 border border-gray-200 rounded-xl lg:rounded-2xl 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 
            focus:border-blue-500 focus:bg-white transition-all duration-300
            placeholder-gray-500 text-gray-700`}
        />
        {loading && searchTerm.trim() !== '' && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 animate-spin text-blue-500" />
        )}
      </div>

      {/* Dropdown de resultados */}
      {isDropdownOpen && searchTerm.trim() !== '' && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-h-[80vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
              <span className="text-gray-600 text-sm">Buscando...</span>
            </div>
          ) : hasResults ? (
            <div>
              {/* Categorías */}
              {hasCategories && (
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Categorías</h3>
                  <div className="space-y-1">
                    {Array.isArray(result.categories) && result.categories.slice(0, 3).map((category: CategoryType) => (
                      <Link 
                        href={`/categoria/${createSlug(category.categoryName)}`} 
                        key={category.id}
                        onClick={handleItemClick}
                        className="block px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2">
                          {/* {category.mainImage && category.mainImage.url && (
                            <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`} 
                                alt={category.mainImage.alternativeText || category.categoryName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )} */}
                          <div>
                            <div className="font-medium text-gray-800">{category.categoryName}</div>
                            {category.description && (
                              <div className="text-xs text-gray-500 truncate">
                                {category.description.substring(0, 60)}{category.description.length > 60 ? '...' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                    {/* {Array.isArray(result.categories) && result.categories.length > 3 && (
                      <div className="text-center pt-1">
                        <Link 
                          href={`/buscar?q=${searchTerm}`}
                          onClick={handleItemClick}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Ver todas las categorías ({result.categories.length})
                        </Link>
                      </div>
                    )} */}
                  </div>
                </div>
              )}

              {/* Productos */}
              {hasProducts && (
                <div className="p-3 border-t border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Productos</h3>
                  <div className="space-y-2">
                    {Array.isArray(result.products) && result.products.slice(0, 5).map((product: ProductType) => (
                      <Link 
                        href={`/product/${createSlug(product.productName || product.productName)}`} 
                        key={product.id}
                        onClick={handleItemClick}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                      >
                        {/* <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {product.images && product.images.length > 0 ? (
                            <Image 
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`} 
                              alt={product.productName || product.productName} 
                              width={40} 
                              height={40} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              Sin img
                            </div>
                          )}
                        </div> */}
                        <div>
                          <div className="font-medium text-gray-800 text-sm">
                            {product.productName || product.productName}
                          </div>
                          {product.description && (
                            <div className="text-xs text-gray-500 truncate">
                              {product.description.substring(0, 60)}{product.description.length > 60 ? '...' : ''}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                    {/* {Array.isArray(result.products) && result.products.length > 5 && (
                      <div className="text-center pt-1">
                        <Link 
                          href={`/buscar?q=${searchTerm}`}
                          onClick={handleItemClick}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Ver todos los productos ({result.products.length})
                        </Link>
                      </div>
                    )} */}
                  </div>
                </div>
              )}

              {/* Ver todos los resultados */}
              {/* <div className="bg-gray-50 p-3 border-t border-gray-100 text-center">
                <Link 
                  href={`/buscar?q=${searchTerm}`}
                  onClick={handleItemClick}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver todos los resultados
                </Link>
              </div> */}
            </div>
          ) : searchTerm.trim() !== '' && !loading ? (
            <div className="p-4 text-center text-gray-500">
              No se encontraron resultados para "{searchTerm}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}