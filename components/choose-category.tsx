// components/ChooseCategory.tsx


import { getCategories } from "@/api/getCategoriesCarousel/getCategories";
import ChooseCategoryCarousel from "./categoryCarousel/choose-category-carousel";


const ChooseCategory = async () => {
  const categories = await getCategories();

  return <ChooseCategoryCarousel categories={categories} />;
};

export default ChooseCategory;