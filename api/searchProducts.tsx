import { useState, useEffect } from 'react';
import { ProductType } from '@/types/product';
import { CategoryType } from '@/types/category';

interface SearchResult {
  products: ProductType[];
  categories: CategoryType[];
}

const stripAccents = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
};


const generateSearchTerms = (term: string): string[] => {
  const original = term.trim();
  const base = stripAccents(original);
  const variants = new Set<string>([original, base]);

  const accentMap: Record<string, string> = {
    a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú',
  };


  for (let i = 0; i < base.length; i++) {
    const char = base[i];
    if (accentMap[char]) {
      variants.add(base.slice(0, i) + accentMap[char] + base.slice(i + 1));
    }
  }

  return Array.from(variants);
};

const processProducts = (data: any[]): ProductType[] => {
  if (!data || !Array.isArray(data)) return [];

  return data.map(item => {
    try {
      if (!item) return null;

      let images: any[] = [];
      try {
        if (item.attributes?.images?.data) {
          images = item.attributes.images.data.map((img: any) => ({
            id: img.id,
            url: img.attributes.url,
            ...img.attributes
          }));
        } else if (item.images) {
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
      } catch {
        images = [];
      }

      if (item.attributes) {
        const category = item.attributes.category?.data
          ? { id: item.attributes.category.data.id, ...item.attributes.category.data.attributes }
          : null;
        return { ...item.attributes, id: item.id, images, category };
      }
      return { ...item, images };
    } catch {
      return null;
    }
  }).filter(Boolean);
};

const processCategories = (data: any[]): CategoryType[] => {
  if (!data || !Array.isArray(data)) return [];

  return data.map(item => {
    try {
      if (!item) return null;

      let images: any[] = [];
      try {
        if (item.attributes?.image?.data) {
          const img = item.attributes.image.data;
          images = [{ id: img.id, url: img.attributes.url, ...img.attributes }];
        } else if (item.image?.data) {
          const img = item.image.data;
          images = [{ id: img.id, url: img.attributes ? img.attributes.url : (img.url || ''), ...(img.attributes || img) }];
        }
      } catch {
        images = [];
      }

      if (item.attributes) {
        return { ...item.attributes, id: item.id, images };
      }
      return { ...item, images };
    } catch {
      return null;
    }
  }).filter(Boolean);
};

async function fetchWithFallback(url: string, signal: AbortSignal): Promise<{ data: any[] }> {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return { data: [] };
    return await res.json();
  } catch (err: any) {
    if (err.name === 'AbortError') throw err;
    return { data: [] };
  }
}

export function useSearchProducts(searchTerm: string) {
  const [result, setResult] = useState<SearchResult>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setResult({ products: [], categories: [] });
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const original = searchTerm.trim();
        const terms = generateSearchTerms(original);

        const productRequests: Promise<{ data: any[] }>[] = [];
        const categoryRequests: Promise<{ data: any[] }>[] = [];

        for (const term of terms) {
          const t = encodeURIComponent(term);
          productRequests.push(
            fetchWithFallback(`${baseUrl}/api/products?populate=*&filters[productName][$containsi]=${t}`, signal),
            fetchWithFallback(`${baseUrl}/api/products?populate=*&filters[description][$containsi]=${t}`, signal)
          );
          categoryRequests.push(
            fetchWithFallback(`${baseUrl}/api/categories?populate=*&filters[categoryName][$containsi]=${t}`, signal),
            fetchWithFallback(`${baseUrl}/api/categories?populate=*&filters[description][$containsi]=${t}`, signal)
          );
        }

        const [productResults, categoryResults] = await Promise.all([
          Promise.all(productRequests),
          Promise.all(categoryRequests),
        ]);

        if (signal.aborted) return;

        const productMap = new Map<number, ProductType>();
        for (const json of productResults) {
          if (json?.data) {
            processProducts(json.data).forEach(p => {
              if (p && !productMap.has(p.id)) productMap.set(p.id, p);
            });
          }
        }

        const categoryMap = new Map<number, CategoryType>();
        for (const json of categoryResults) {
          if (json?.data) {
            processCategories(json.data).forEach(c => {
              if (c && !categoryMap.has(c.id)) categoryMap.set(c.id, c);
            });
          }
        }

        setResult({
          products: Array.from(productMap.values()),
          categories: Array.from(categoryMap.values()),
        });
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error('Search error:', err);
        setError(err.message || 'Error al buscar');
        setResult({ products: [], categories: [] });
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  return { result, loading, error };
}