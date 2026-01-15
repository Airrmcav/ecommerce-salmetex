import Carousel from "@/components/carousel-text-banner";
import FeaturedProducts from "@/components/featured-products";
import Banner from "@/components/Banner";
import ChooseCategory from "@/components/choose-category";


export default function Home() {
  return (
    <main>
      <Carousel />
      <FeaturedProducts/>
      <Banner />
      <ChooseCategory/>
    </main>
  );
}
