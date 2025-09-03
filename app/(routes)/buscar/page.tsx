'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchProducts } from '@/api/searchProducts';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Search } from 'lucide-react';
import BreadCrumbs from '@/components/BreadCrumbs';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { result, loading, error } = useSearchProducts(query);
  const router = useRouter();
  
  // Función para crear URLs amigables sin acentos
  const createSlug = (text: string | undefined) => {
    // Si el texto es undefined o null, devolver un valor por defecto
    if (!text) return 'producto';
    
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Buscar Productos</h1>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="¿Qué estás buscando?"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl 
                  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                  focus:border-blue-500 transition-all duration-300
                  placeholder-gray-500 text-gray-700 text-base"
                  onChange={(e) => {
                    if (e.target.value) {
                      router.push(`/buscar?q=${e.target.value}`);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Resultados de búsqueda para: "{query}"</h1>
          <div className="relative max-w-xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              defaultValue={query}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl 
              shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 
              focus:border-blue-500 transition-all duration-300
              placeholder-gray-500 text-gray-700 text-base"
              onChange={(e) => {
                if (e.target.value) {
                  router.push(`/buscar?q=${e.target.value}`);
                } else {
                  router.push('/buscar');
                }
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Buscando...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Error al buscar productos: {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Categorías encontradas */}
            {Array.isArray(result.categories) && result.categories.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Categorías</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {result.categories.map((category) => (
                    <Link 
                      href={`/categoria/${createSlug(category.categoryName)}`} 
                      key={category.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 border border-gray-100 
                      transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50"
                    >
                      <div className="flex items-center gap-3">
                        {category.mainImage && category.mainImage.url && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`} 
                              alt={category.mainImage.alternativeText || category.categoryName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-800">{category.categoryName}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {category.description ? (
                              category.description.length > 100 
                                ? `${category.description.substring(0, 100)}...` 
                                : category.description
                            ) : 'Ver productos en esta categoría'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Productos encontrados */}
            {Array.isArray(result.products) && result.products.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {result.products.map((product) => (
                    <Link 
                      href={`/product/${createSlug(product.productName || product.productName)}`} 
                      key={product.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md 
                      border border-gray-100 transition-all duration-200 hover:border-blue-200 group"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <Image 
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`} 
                            alt={product.productName || product.productName} 
                            width={300} 
                            height={300} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            Sin imagen
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                          {product.productName || product.productName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {product.description ? (
                            product.description.length > 100 
                              ? `${product.description.substring(0, 100)}...` 
                              : product.description
                          ) : 'Sin descripción'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
                No se encontraron productos que coincidan con "{query}"
              </div>
            )}

            {(!Array.isArray(result.categories) || result.categories.length === 0) && (!Array.isArray(result.products) || result.products.length === 0) && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
                No se encontraron resultados para "{query}". Intenta con otra búsqueda.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}