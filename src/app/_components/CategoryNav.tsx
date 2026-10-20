import { getCategories } from "@/src/services/categoryService";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryNav() {
  const categories = await getCategories();
  return (
    <ul className="mt-10 flex gap-5 overflow-x-scroll pb-3 md:justify-center md:overflow-auto md:pb-0 lg:gap-15 xl:gap-23">
      {categories.map((category) => (
        <li key={category.id} className="shrink-0">
          <Link
            href={`/${category.slug}`}
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
  );
}
