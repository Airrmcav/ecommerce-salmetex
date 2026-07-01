'use client';

import { useState, useEffect } from 'react';

export function useGetProductsByArea(area: string) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!area) {
            setResult(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?` +
            `filters[area][$eq]=${encodeURIComponent(area)}` +
            `&fields[0]=productName` +
            `&fields[1]=slug` +
            `&fields[2]=description` +
            `&fields[3]=price` +
            `&fields[4]=active` +
            `&fields[5]=purchaseType` +
            `&populate[images][fields][0]=url` +
            `&populate[category][fields][0]=categoryName` +
            `&pagination[pageSize]=50`;

        (async () => {
            try {
                setLoading(true);
                const res = await fetch(url, { signal: controller.signal });
                const json = await res.json();
                setResult(json.data);
                setLoading(false);
            } catch (error: any) {
                if (error?.name === 'AbortError') return;
                setError(error.message || 'Error fetching products by area');
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [area]);

    return {
        result,
        loading,
        error,
    };
}