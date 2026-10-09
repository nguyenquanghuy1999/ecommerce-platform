import Image from "next/image";
import HeroCarousel from "./_components/HeroCarousel";
import { getCategories } from "../services/categoryService";
import Link from "next/link";

export default async function Home() {
  const categories = await getCategories();
  return (
    <div className="h-screen">
      <div className="mt-5">
        <HeroCarousel />
      </div>
      <ul className="mt-10 flex gap-5 overflow-x-scroll md:justify-center md:overflow-auto lg:gap-10 xl:gap-23">
        {categories.map((category) => (
          <li className="shrink-0">
            <Link
              href={`/category/${category.slug}`}
              className="flex flex-col items-center"
            >
              <Image
                alt={category.name}
                src={category.image}
                width={80}
                height={80}
                className="transition-transform hover:rotate-45"
              />
              <span className="mt-3 text-[14px]">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
