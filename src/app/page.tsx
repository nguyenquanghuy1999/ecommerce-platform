import { categorySections } from "../config";
import CategoryNav from "./_components/CategoryNav";
import CategorySection from "./_components/CategorySection";
import HeroCarousel from "./_components/HeroCarousel";
import ScrollToTopButton from "./_components/ScrollToTopButton";

export default async function Home() {
  console.log("Home");
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
