import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://salmetexmed.com.mx";
  const apiBaseUrl = "https://backend-ecommerce-production-fb02.up.railway.app/api/products";
  const pageSize = 1000;
  let allProducts: any[] = [];
  let currentPage = 1;
  let hasMorePages = true;

  // Obtener todos los productos paginando si es necesario
  while (hasMorePages) {
    try {
      const res = await fetch(
        `${apiBaseUrl}?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&publicationState=live`,
        {
          cache: "no-store",
        }
      );

    //   if (!res.ok) {
    //     console.error(`Error al obtener productos para el sitemap (página ${currentPage})`);
    //     break;
    //   }

      const json = await res.json();

    //   if (!json?.data || !Array.isArray(json.data)) {
    //     console.error("Formato inesperado de productos", json);
    //     break;
    //   }

      // Log para depuración (solo en la primera página)
    //   if (currentPage === 1) {
    //     console.log(`Total productos en página ${currentPage}:`, json.data.length);
    //     if (json.data.length > 0) {
    //       console.log("Ejemplo de estructura de producto:", JSON.stringify(json.data[0], null, 2));
    //     }
    //   }

      // Agregar productos de esta página
      allProducts = allProducts.concat(json.data);

      // Verificar si hay más páginas
      const pagination = json.meta?.pagination;
      if (pagination) {
        // console.log(`Página ${currentPage} de ${pagination.pageCount}, total: ${pagination.total}`);
        hasMorePages = currentPage < pagination.pageCount;
        currentPage++;
      } else {
        // Si no hay información de paginación, asumir que no hay más páginas
        hasMorePages = false;
      }
    } catch (error) {
      console.error(`Error al obtener productos (página ${currentPage}):`, error);
      break;
    }
  }

//   console.log(`Total productos obtenidos: ${allProducts.length}`);

  // Filtrar y mapear productos válidos
  // Strapi puede devolver productos con estructura { id, attributes: { slug } } o ya transformados
  const products = allProducts
    .map((product: any) => {
      // Intentar obtener el slug de diferentes formas posibles
      let slug: string | null = null;
      
      if (product?.attributes?.slug) {
        slug = product.attributes.slug;
      } else if (product?.slug) {
        slug = product.slug;
      }
      
      return slug;
    })
    .filter((slug: string | null): slug is string => 
      typeof slug === "string" && slug.length > 0
    )
    .map((slug: string) => ({
      url: `${baseUrl}/product/${slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }));

//   console.log(`Productos válidos para sitemap: ${products.length}`);

  // Obtener todas las categorías
  const categoriesApiUrl = "https://backend-ecommerce-production-fb02.up.railway.app/api/categories";
  let allCategories: any[] = [];
  let categoryPage = 1;
  let hasMoreCategoryPages = true;

  while (hasMoreCategoryPages) {
    try {
      const res = await fetch(
        `${categoriesApiUrl}?populate=*&pagination[page]=${categoryPage}&pagination[pageSize]=${pageSize}&publicationState=live`,
        {
          cache: "no-store",
        }
      );

    //   if (!res.ok) {
    //     console.error(`Error al obtener categorías para el sitemap (página ${categoryPage})`);
    //     break;
    //   }

      const json = await res.json();

    //   if (!json?.data || !Array.isArray(json.data)) {
    //     console.error("Formato inesperado de categorías", json);
    //     break;
    //   }

    //   // Log para depuración (solo en la primera página)
    //   if (categoryPage === 1) {
    //     console.log(`Total categorías en página ${categoryPage}:`, json.data.length);
    //   }

      // Agregar categorías de esta página
      allCategories = allCategories.concat(json.data);

      // Verificar si hay más páginas
      const pagination = json.meta?.pagination;
      if (pagination) {
        // console.log(`Categorías - Página ${categoryPage} de ${pagination.pageCount}, total: ${pagination.total}`);
        hasMoreCategoryPages = categoryPage < pagination.pageCount;
        categoryPage++;
      } else {
        hasMoreCategoryPages = false;
      }
    } catch (error) {
      console.error(`Error al obtener categorías (página ${categoryPage}):`, error);
      break;
    }
  }

//   console.log(`Total categorías obtenidas: ${allCategories.length}`);

  // Filtrar y mapear categorías válidas
  const categories = allCategories
    .map((category: any) => {
      // Intentar obtener el slug de diferentes formas posibles
      let slug: string | null = null;
      
      if (category?.attributes?.slug) {
        slug = category.attributes.slug;
      } else if (category?.slug) {
        slug = category.slug;
      }
      
      return slug;
    })
    .filter((slug: string | null): slug is string => 
      typeof slug === "string" && slug.length > 0
    )
    .map((slug: string) => ({
      url: `${baseUrl}/categoria/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    }));

//   console.log(`Categorías válidas para sitemap: ${categories.length}`);

  // URLs estáticas de marcas principales
  const staticMarcas = [
    {
      url: `${baseUrl}/productos-destacados`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    
    ...categories,
    ...staticMarcas,
    ...products,
  ];
}