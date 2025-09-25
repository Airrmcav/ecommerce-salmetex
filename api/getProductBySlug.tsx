// Función para uso en Server Components
export async function getProductBySlug(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`;
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return null;
    }
}