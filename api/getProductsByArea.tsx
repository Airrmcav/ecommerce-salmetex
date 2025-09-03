import { useState, useEffect } from 'react';

export function useGetProductsByArea(area: string)  {
   const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[area][$eq]=${area}`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!area) {
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
    }, [url, area]);
    return { result, loading, error };
}