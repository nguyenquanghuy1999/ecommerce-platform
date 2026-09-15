import { getCategoryByName } from "@/src/services/categoryService";
import { getProductsByCategoryId } from "@/src/services/productService";
import NotFound from "../../_components/NotFound";
import CategoryWrapper from "./_components/CategoryWrapper";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = await getCategoryByName(slug);

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
    title: category.name,
    description: `Khám phá các sản phẩm ${category.name} với giá tốt tại HShop.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: category.name,
      description: `Khám phá các sản phẩm ${category.name} với giá tốt tại HShop.`,
      url: `/category/${slug}`,
      type: "website",
      images: category.image
        ? [
            {
              url: category.image,
              alt: category.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryByName(slug);

  if (!category) {
    return <NotFound />;
  }

  const products = await getProductsByCategoryId(category.id);

  return <CategoryWrapper products={products} currentPage={category.name} />;
}
