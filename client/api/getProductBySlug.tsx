// Función para uso en Server Components
export async function getProductBySlug(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`;
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        const json = await res.json();

        const data = Array.isArray(json?.data) ? json.data : [];

        const processed = data.map((item: any) => {
            try {
                // Procesar imágenes en ambos formatos
                let images: any[] = [];
                if (item?.attributes?.images?.data) {
                    images = item.attributes.images.data.map((img: any) => ({
                        id: img.id,
                        url: img.attributes?.url,
                        alternativeText: img.attributes?.alternativeText ?? null,
                        caption: img.attributes?.caption ?? null,
                    }));
                } else if (item?.images) {
                    if (Array.isArray(item.images)) {
                        images = item.images;
                    } else if (item.images?.data && Array.isArray(item.images.data)) {
                        images = item.images.data.map((img: any) => ({
                            id: img.id,
                            url: img.url || img.attributes?.url,
                            alternativeText: img.attributes?.alternativeText ?? null,
                            caption: img.attributes?.caption ?? null,
                        }));
                    }
                }

                // Procesar categoría
                let category = null;
                if (item?.attributes?.category?.data) {
                    category = {
                        id: item.attributes.category.data.id,
                        documentId: item.attributes.category.data.documentId,
                        slug: item.attributes.category.data.attributes?.slug,
                        categoryName: item.attributes.category.data.attributes?.categoryName,
                    };
                } else if (item?.category) {
                    category = item.category;
                }

                // Retornar objeto plano tipo ProductType
                if (item?.attributes) {
                    return {
                        ...item.attributes,
                        id: item.id,
                        images,
                        category,
                    };
                }
                return { ...item, images, category };
            } catch {
                return null;
            }
        }).filter(Boolean);

        return processed;
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return null;
    }
}
