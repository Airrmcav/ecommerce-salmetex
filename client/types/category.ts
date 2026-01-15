export type CategoryType = {
    id: number;
    categoryName: string;
    description: string; 
    slug: string;
    mainImage: {
        url: string;
        alternativeText?: string;
    };
}