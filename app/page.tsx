import type { Metadata } from "next";
import Carousel from "@/components/carousel-text-banner";
import FeaturedProducts from "@/components/featured-products";
import Banner from "@/components/Banner";
import ChooseCategory from "@/components/choose-category";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://salmetexmed.com.mx",
  },
};

export default function Home() {
  return (
    <main>
      <Carousel />
      <FeaturedProducts />
      <Banner />
      <ChooseCategory />
    </main>
  );
}