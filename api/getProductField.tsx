import { ResultFilterTypes } from "@/types/filters";
import { useEffect, useState } from "react";

export function useGetProductField() {
  const [result, setResult] =
    useState<ResultFilterTypes | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductFields = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-type-builder/content-types/api::product.product`,
          {
            signal: controller.signal,

            /*
            =========================================
            CACHE DEL NAVEGADOR
            =========================================
            */
            cache: "force-cache",
          },
        );

        if (!res.ok) {
          throw new Error(
            "Error al obtener los campos del producto",
          );
        }

        const json = await res.json();

        setResult(json.data);
      } catch (err: unknown) {
        /*
        =========================================
        IGNORAR ABORT ERRORS
        =========================================
        */
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Ocurrió un error inesperado",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductFields();

    /*
    =========================================
    CLEANUP
    =========================================
    */
    return () => {
      controller.abort();
    };
  }, []);

  return {
    result,
    loading,
    error,
  };
}