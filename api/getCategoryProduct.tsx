import { useState, useEffect } from 'react';

export function useGetCategoryProduct(slug: string | string[])  {
   const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?` +
        `filters[category][slug][$eq]=${slug}` +
        `&fields[0]=productName` +
        `&fields[1]=slug` +
        `&fields[2]=description` +
        `&fields[3]=price` +
        `&fields[4]=active` +
        `&fields[5]=purchaseType` +
        `&populate[images][fields][0]=url` +
        `&populate[category][fields][0]=categoryName` +
        `&pagination[pageSize]=100`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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
    }, [url]);
    return { result, loading, error };
}