import { useState, useEffect } from 'react';
import { ProductType } from '@/types/product';
import { CategoryType } from '@/types/category';

interface SearchResult {
  products: ProductType[];
  categories: CategoryType[];
}

export function useSearchProducts(searchTerm: string) {
  const [result, setResult] = useState<SearchResult>({ products: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Si no hay término de búsqueda, no hacemos nada
    if (!searchTerm || searchTerm.trim() === '') {
      setResult({ products: [], categories: [] });
      setLoading(false);
      return;
    }

    // Función para normalizar texto (eliminar acentos, espacios extras y convertir a minúsculas)
    const normalizeText = (text: string): string => {
      return text
        .trim() // Eliminar espacios al inicio y final
        .toLowerCase() // Convertir a minúsculas
        .normalize('NFD') // Normalizar caracteres Unicode
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos y diacríticos
        .replace(/\s+/g, ' '); // Reemplazar múltiples espacios con uno solo
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        // Normalizar el término de búsqueda para mejorar coincidencias
        const normalizedSearchTerm = normalizeText(searchTerm);
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const encodedNormalizedSearchTerm = encodeURIComponent(normalizedSearchTerm);
        
        // Construir URLs con formato más simple para evitar problemas de codificación
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        
        // Buscar productos con el término normalizado (siempre usar el normalizado)
        let productsJson = { data: [] };
        try {
          // Construir la URL manualmente para asegurar compatibilidad con Strapi
          const productsUrl = `${baseUrl}/api/products?populate=*&filters[productName][$containsi]=${encodedNormalizedSearchTerm}`;
          const productsRes = await fetch(productsUrl);
          productsJson = await productsRes.json();
        } catch (err) {
          console.error('Error fetching products:', err);
        }
        
        // Buscar productos por descripción también (usando término normalizado)
        let productsDescriptionJson = { data: [] };
        try {
          const productsDescUrl = `${baseUrl}/api/products?populate=*&filters[description][$containsi]=${encodedNormalizedSearchTerm}`;
          const productsDescRes = await fetch(productsDescUrl);
          productsDescriptionJson = await productsDescRes.json();
        } catch (err) {
          console.error('Error fetching products by description:', err);
        }

        // Buscar categorías con el término normalizado
        let categoriesJson = { data: [] };
        try {
          // Construir la URL manualmente para asegurar compatibilidad con Strapi
          const categoriesUrl = `${baseUrl}/api/categories?populate=*&filters[categoryName][$containsi]=${encodedNormalizedSearchTerm}`;
          const categoriesRes = await fetch(categoriesUrl);
          categoriesJson = await categoriesRes.json();
        } catch (err) {
          console.error('Error fetching categories:', err);
        }
        
        // Buscar categorías por descripción también
        let categoriesDescriptionJson = { data: [] };
        try {
          const categoriesDescUrl = `${baseUrl}/api/categories?populate=*&filters[description][$containsi]=${encodedNormalizedSearchTerm}`;
          const categoriesDescRes = await fetch(categoriesDescUrl);
          categoriesDescriptionJson = await categoriesDescRes.json();
        } catch (err) {
          console.error('Error fetching categories by description:', err);
        }

        // Procesar la respuesta de Strapi que tiene una estructura específica
        let products: ProductType[] = [];
        let categories: CategoryType[] = [];
        let productIds = new Set<number>(); // Para evitar duplicados
        let categoryIds = new Set<number>(); // Para evitar duplicados
        
        // Función para procesar productos
        const processProducts = (data: any[]): ProductType[] => {
          if (!data || !Array.isArray(data)) return [];
          
          return data.map(item => {
            try {
              // Verificar que item exista
              if (!item) {
                console.error('Item es undefined');
                return null; // Retornar null para filtrar después
              }
              
              // Procesamos las imágenes si existen
              let images: any[] = [];
              try {
                if (item.attributes && item.attributes.images && item.attributes.images.data) {
                  // Formato antiguo con attributes
                  images = item.attributes.images.data.map((img: any) => ({
                    id: img.id,
                    url: img.attributes.url,
                    ...img.attributes
                  }));
                } else if (item.images) {
                  // Formato nuevo sin attributes
                  if (Array.isArray(item.images)) {
                    images = item.images;
                  } else if (item.images.data && Array.isArray(item.images.data)) {
                    images = item.images.data.map((img: any) => ({
                      id: img.id,
                      url: img.url || (img.attributes ? img.attributes.url : ''),
                      ...(img.attributes || img)
                    }));
                  }
                }
              } catch (error) {
                console.error('Error procesando imágenes:', error);
                images = [];
              }
              
              // Comprobar si estamos recibiendo datos en el formato antiguo (con attributes) o nuevo
              if (item.attributes) {
                  // Formato antiguo con attributes
                  // Verificar si category existe antes de acceder a sus propiedades
                  const category = item.attributes.category?.data 
                    ? {
                        id: item.attributes.category.data.id,
                        ...item.attributes.category.data.attributes
                      }
                    : null;
                  
                  return {
                    ...item.attributes,
                    id: item.id,
                    images,
                    category
                  };
              } else {
                // Formato nuevo sin attributes (datos directos)
                return {
                  ...item,
                  images
                };
              }
            } catch (error) {
              console.error('Error procesando producto:', error, item);
              return null; // Retornar null para filtrar después
            }
          }).filter(Boolean); // Filtrar elementos null
        };
        
        // Función para procesar categorías
        const processCategories = (data: any[]): CategoryType[] => {
          if (!data || !Array.isArray(data)) return [];
          
          return data.map(item => {
            try {
              // Verificar que item exista
              if (!item) {
                console.error('Item es undefined en categorías');
                return null; // Retornar null para filtrar después
              }
              
              // Procesamos las imágenes si existen
              let images: any[] = [];
              try {
                if (item.attributes && item.attributes.image && item.attributes.image.data) {
                  // Formato antiguo con attributes
                  const img: any = item.attributes.image.data;
                  images = [{
                    id: img.id,
                    url: img.attributes.url,
                    ...img.attributes
                  }];
                } else if (item.image) {
                  // Formato nuevo sin attributes
                  if (item.image.data) {
                    const img: any = item.image.data;
                    images = [{
                      id: img.id,
                      url: img.attributes ? img.attributes.url : (img.url || ''),
                      ...(img.attributes || img)
                    }];
                  }
                }
              } catch (error) {
                console.error('Error procesando imágenes de categoría:', error);
                images = [];
              }
              
              // Comprobar si estamos recibiendo datos en el formato antiguo (con attributes) o nuevo
              if (item.attributes) {
                // Formato antiguo con attributes
                return {
                  ...item.attributes,
                  id: item.id,
                  images
                };
              } else {
                // Formato nuevo sin attributes (datos directos)
                return {
                  ...item,
                  images
                };
              }
            } catch (error) {
              console.error('Error procesando categoría:', error, item);
              return null; // Retornar null para filtrar después
            }
          }).filter(Boolean); // Filtrar elementos null
        };
        
        // Procesar productos por nombre
        if (productsJson && productsJson.data) {
          const processedProducts = processProducts(productsJson.data);
          processedProducts.forEach(product => {
            if (!productIds.has(product.id)) {
              products.push(product);
              productIds.add(product.id);
            }
          });
        }
        
        // Procesar productos por descripción
        if (productsDescriptionJson && productsDescriptionJson.data) {
          const processedDescProducts = processProducts(productsDescriptionJson.data);
          processedDescProducts.forEach(product => {
            if (!productIds.has(product.id)) {
              products.push(product);
              productIds.add(product.id);
            }
          });
        }
        
        // Procesar categorías por nombre
        if (categoriesJson && categoriesJson.data) {
          const processedCategories = processCategories(categoriesJson.data);
          processedCategories.forEach(category => {
            if (!categoryIds.has(category.id)) {
              categories.push(category);
              categoryIds.add(category.id);
            }
          });
        }
        
        // Procesar categorías por descripción
        if (categoriesDescriptionJson && categoriesDescriptionJson.data) {
          const processedDescCategories = processCategories(categoriesDescriptionJson.data);
          processedDescCategories.forEach(category => {
            if (!categoryIds.has(category.id)) {
              categories.push(category);
              categoryIds.add(category.id);
            }
          });
        }
        
        setResult({
          products,
          categories
        });
        
        // Construir URLs para el log con el formato simplificado
        const productsUrlExample = `${baseUrl}/api/products?populate=*&filters[productName][$containsi]=${encodedSearchTerm}`;
        const categoriesUrlExample = `${baseUrl}/api/categories?populate=*&filters[categoryName][$containsi]=${encodedSearchTerm}`;
        
        console.log('Search results:', { 
          searchTerm,
          normalizedSearchTerm,
          productsCount: products.length,
          categoriesCount: categories.length,
          productsUrlExample,
          categoriesUrlExample,
          error: error || 'none'
        });
        setLoading(false);
      } catch (error: any) {
        console.error('Search error:', error);
        setError(error.message || 'Error al buscar productos');
        // Establecer un resultado vacío para evitar mostrar resultados anteriores
        setResult({ products: [], categories: [] });
        setLoading(false);
      }
    };

    // Debounce para evitar demasiadas solicitudes mientras el usuario escribe
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return { result, loading, error };
}