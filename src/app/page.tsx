import { categorySections } from "../config";
import { getCategories } from "../services/categoryService";
import CategoryNav from "./_components/CategoryNav";
import CategorySection from "./_components/CategorySection";
import HeroCarousel from "./_components/HeroCarousel";
import ScrollToTopButton from "./_components/ScrollToTopButton";

export default async function Home() {
  // const categories = await getCategories();
  return (
    <>
      <div className="mt-5">
        <HeroCarousel />
      </div>
      <CategoryNav />
      {categorySections.map((section) => (
        <CategorySection
          key={section.id}
          slug={section.slug}
          limit={section.limit}
        />
      ))}
      <ScrollToTopButton />
    </>
  );
}
