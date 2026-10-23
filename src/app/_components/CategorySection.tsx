import { getCategoryBySlug } from "@/src/services/categoryService";
import {
  getBrandIdsByCategoryId,
  getProductsByCategoryId,
} from "@/src/services/productService";
import Image from "next/image";
import ProductItem from "./ProductItem";
import { getBrandsByIds } from "@/src/services/brandService";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export default async function CategorySection({
  slug,
  limit,
}: {
  slug: string;
  limit: number;
}) {
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return null;
  }
  const [products, brandIds] = await Promise.all([
    getProductsByCategoryId(category.id, limit),
    getBrandIdsByCategoryId(category.id),
  ]);

  const brands = await getBrandsByIds(brandIds);

  return (
    <div className="my-10">
      <div className="border-primary flex cursor-pointer justify-between border-b-2">
        <Link
          href={`/${slug}`}
          className="bg-primary hover:text-muted h-10 rounded-tl-[5px] rounded-tr-[5px] px-3.25 text-center text-[18px] leading-10 font-bold text-white"
        >
          {category.name.toUpperCase()}
        </Link>
        <ul className="hidden items-center gap-3 md:flex">
          {brands.map((brand) => (
            <li key={brand.id} className="hover:text-muted text-md font-medium">
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={cn(
          "mt-5 grid grid-cols-1 gap-3 lg:h-92.5",
          limit === 3 ? "lg:grid-cols-[2fr_2.25fr]" : "lg:grid-cols-[3fr_7fr]",
        )}
      >
        <Image
          src={category.bannerImage}
          alt={category.name}
          width={limit === 3 ? 540 : 285}
          height={370}
          className="h-50 w-full md:h-75 lg:h-92.5"
        />
        <div
          className={cn(
            "grid grid-cols-2 gap-3 md:grid-cols-3",
            limit === 4 && "lg:grid-cols-4",
          )}
        >
          {products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <Link href={`/${slug}`} className="block text-end">
          <Button
            variant="outline"
            className="h-9 w-full cursor-pointer md:w-25"
          >
            Xem thêm
          </Button>
        </Link>
      </div>
    </div>
  );
}
