// Función para uso en Server Components
export async function getProductBySlug(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?` +
        `filters[slug][$eq]=${slug}` +
        `&fields[0]=productName` +
        `&fields[1]=slug` +
        `&fields[2]=description` +
        `&fields[3]=price` +
        `&fields[4]=active` +
        `&fields[5]=purchaseType` +
        `&fields[6]=specifications` +
        `&fields[7]=isFeatured` +
        `&populate[images][fields][0]=url` +
        `&populate[images][fields][1]=alternativeText` +
        `&populate[images][fields][2]=caption` +
        `&populate[category][fields][0]=categoryName` +
        `&populate[category][fields][1]=slug`;
    
    try {
        const res = await fetch(url, {
            next: {
                revalidate: 86400, // 24 horas
            },
        });
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
