"use client";

import {
  useEffect,
  useState,
} from "react";

export function useGetCategoriesByArea(
  area: string,
) {
  const [
    categoriesByArea,
    setCategoriesByArea,
  ] = useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!area) {
      setCategoriesByArea([]);
      return;
    }

    const controller =
      new AbortController();

    async function fetchData() {
      try {
        setLoading(true);

        const baseUrl =
          process.env
            .NEXT_PUBLIC_BACKEND_URL;

        const url =
          `${baseUrl}/api/products?` +
          `filters[area][$eq]=${encodeURIComponent(
            area,
          )}` +
          `&fields[0]=id` +
          `&populate[category][fields][0]=categoryName` +
          `&pagination[pageSize]=500`;

        const res = await fetch(
          url,
          {
            signal:
              controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error(
            "Error obteniendo categorías",
          );
        }

        const json =
          await res.json();

        const unique =
          new Set<string>();

        json?.data?.forEach(
          (product: any) => {
            const category =
              product?.category
                ?.categoryName;

            if (category) {
              unique.add(category);
            }
          },
        );

        setCategoriesByArea(
          Array.from(unique),
        );
      } catch (error: any) {
        if (error?.name === "AbortError") return;

        console.error(error);
        setCategoriesByArea([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      if (!controller.signal.aborted) {
        controller.abort();
      }
    };
  }, [area]);

  return {
    categoriesByArea,
    loading,
  };
}