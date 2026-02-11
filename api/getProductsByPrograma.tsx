import { useState, useEffect } from "react";

export function useGetProductsByPrograma(programaSlug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[programa][slug][$eq]=${programaSlug}`;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!programaSlug) {
      setResult(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [url, programaSlug]);
  return { result, loading, error };
}
