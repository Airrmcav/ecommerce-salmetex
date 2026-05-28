// components/featured-products.tsx

import { getFeaturedProducts } from "@/api/featuredProducts/useGetFeaturedProducts";
import FeaturedProductsCarousel from "./global/featured-products-carousel";


const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();

  return <FeaturedProductsCarousel products={products} />;
};

export default FeaturedProducts;