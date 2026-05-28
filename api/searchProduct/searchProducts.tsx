import { useState, useEffect } from 'react';
import { ProductType } from '@/types/product';
import { CategoryType } from '@/types/category';

interface SearchResult {
  products: ProductType[];
  categories: CategoryType[];
}

export function useSearchProducts(searchTerm: string) {
  const [result, setResult] = useState<SearchResult>({
    products: [],
    categories: [],
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const term = searchTerm.trim();

    // Evita consultas innecesarias
    if (term.length < 2) {
      setResult({
        products: [],
        categories: [],
      });

      setLoading(false);

      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        setError('');

        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL;

        const encoded =
          encodeURIComponent(term);

        /* =========================================================
           PRODUCTS
        ========================================================= */

        const productsUrl =
          `${baseUrl}/api/products?` +
          `filters[$or][0][productName][$containsi]=${encoded}` +
          `&filters[$or][1][description][$containsi]=${encoded}` +
          `&fields[0]=productName` +
          `&fields[1]=slug` +
          `&fields[2]=description` +
          `&populate[images][fields][0]=url` +
          `&pagination[pageSize]=5`;

        /* =========================================================
           CATEGORIES
        ========================================================= */

        const categoriesUrl =
          `${baseUrl}/api/categories?` +
          `filters[$or][0][categoryName][$containsi]=${encoded}` +
          `&filters[$or][1][description][$containsi]=${encoded}` +
          `&fields[0]=categoryName` +
          `&fields[1]=description` +
          `&fields[2]=slug` +
          `&populate[mainImage][fields][0]=url` +
          `&populate[mainImage][fields][1]=alternativeText` +
          `&pagination[pageSize]=3`;

        const [productsRes, categoriesRes] =
          await Promise.all([
            fetch(productsUrl, {
              signal: controller.signal,
            }),

            fetch(categoriesUrl, {
              signal: controller.signal,
            }),
          ]);

        if (
          !productsRes.ok ||
          !categoriesRes.ok
        ) {
          throw new Error(
            'Error al buscar',
          );
        }

        const [productsJson, categoriesJson] =
          await Promise.all([
            productsRes.json(),
            categoriesRes.json(),
          ]);

        setResult({
          products:
            productsJson?.data ?? [],

          categories:
            categoriesJson?.data ?? [],
        });
      } catch (err: any) {
        if (
          err.name === 'AbortError'
        ) {
          return;
        }

        console.error(
          'Search error:',
          err,
        );

        setError(
          err.message ||
            'Error al buscar',
        );

        setResult({
          products: [],
          categories: [],
        });
      } finally {
        setLoading(false);
      }
    };

    // Debounce - Aumentado a 600ms para reducir llamadas
    const timeout = setTimeout(
      fetchData,
      600,
    );

    return () => {
      clearTimeout(timeout);

      controller.abort();
    };
  }, [searchTerm]);

  return {
    result,
    loading,
    error,
  };
}