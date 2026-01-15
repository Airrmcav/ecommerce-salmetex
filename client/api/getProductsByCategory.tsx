import { useState, useEffect } from 'react';

export function useGetProductsByCategory(category: string)  {
   const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][categoryName][$eq]=${category}`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!category) {
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
    }, [url, category]);
    return { result, loading, error };
}