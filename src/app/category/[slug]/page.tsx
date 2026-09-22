import { getCategoryByName } from "@/src/services/categoryService";
import { getProductsByCategoryId } from "@/src/services/productService";
import NotFound from "../../_components/NotFound";
import CategoryWrapper from "./_components/CategoryWrapper";
import { Metadata } from "next";
import { cache } from "react";

const getCategory = cache(async (slug: string) => {
  return getCategoryByName(slug);
});

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Không tìm thấy danh mục",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${category.name}, công nghệ gần đây | Giá rẻ - Trả góp 0%`,
    description: `Mua ${category.name}, công nghệ giá rẻ, hàng chính hãng, trả góp 0%, bảo hành uy tín. Mua ngay ${category.name} tại đây.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: `${category.name}, công nghệ gần đây | Giá rẻ - Trả góp 0%`,
      description: `Mua ${category.name}, công nghệ giá rẻ, hàng chính hãng, trả góp 0%, bảo hành uy tín. Mua ngay ${category.name} tại đây.`,
      url: `/category/${slug}`,
      images: [
        {
          url: category.image,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return <NotFound />;
  }

  const products = await getProductsByCategoryId(category.id);

  return <CategoryWrapper products={products} currentPage={category.name} />;
}
