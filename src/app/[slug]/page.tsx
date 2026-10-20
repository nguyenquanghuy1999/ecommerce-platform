import {
  getCategoryById,
  getCategoryBySlug,
} from "@/src/services/categoryService";
import {
  getProductBySlug,
  getProductsByCategoryId,
} from "@/src/services/productService";
import { Metadata } from "next";
import { cache } from "react";
import NotFound from "../_components/NotFound";
import CategoryPage from "./_components/category/CategoryPage";
import ProductPage from "./_components/product/ProductPage";
import { Category, Product } from "@/src/types";
import ProductFilter from "./_components/category/ProductFilter";

type SlugData =
  | {
      type: "product";
      data: Product;
    }
  | { type: "category"; data: Category };

const getSlugData = cache(async (slug: string): Promise<SlugData | null> => {
  const product = await getProductBySlug(slug);
  if (product) {
    return {
      type: "product",
      data: product,
    };
  }

  const category = await getCategoryBySlug(slug);
  if (category) {
    return {
      type: "category",
      data: category,
    };
  }

  return null;
});

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugData = await getSlugData(slug);

  if (!slugData) {
    return {
      title: "Không tìm thấy trang",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isProduct = slugData.type === "product";
  const data = slugData.data;

  const title = isProduct
    ? `${data.name} | Giá rẻ - Trả góp 0%`
    : `${data.name}, công nghệ gần đây | Giá rẻ - Trả góp 0%`;

  const description = isProduct
    ? `Mua ${data.name} chính hãng, giá tốt, trả góp 0%, bảo hành uy tín.`
    : `Khám phá các sản phẩm ${data.name} chính hãng, giá tốt và nhiều ưu đãi.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/${slug}`,
      images: [
        {
          url: data.image,
          alt: data.name,
        },
      ],
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugData = await getSlugData(slug);

  if (!slugData) {
    return <NotFound />;
  }

  if (slugData.type === "product") {
    const product = slugData.data;
    const category = await getCategoryById(product.categoryId);

    if (!category) {
      return <NotFound />;
    }

    return <ProductPage category={category} product={product} />;
  }

  const category = slugData.data;
  const products = await getProductsByCategoryId(category.id);

  return <CategoryPage category={category} products={products} />;
}
