'use client';

import { useState, useEffect } from 'react';

export function useGetCategories() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?` +
        `fields[0]=categoryName` +
        `&fields[1]=slug` +
        `&fields[2]=description` +
        `&sort[0]=categoryName:asc` +
        `&pagination[pageSize]=50`;

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(url, { signal: controller.signal });
                const json = await res.json();
                setResult(json.data);
                setLoading(false);
            } catch (error: any) {
                if (error?.name === 'AbortError') return;
                setError(error.message || 'Error fetching categories');
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [url]);

    return {
        result,
        loading,
        error,
    };
}