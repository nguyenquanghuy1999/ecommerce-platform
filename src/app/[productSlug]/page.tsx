import NotFound from "@/src/app/_components/NotFound";
import { getProductBySlug } from "@/src/services/productService";
import PolicyList from "./_components/PolicyList";
import ProductDescription from "./_components/ProductDescription";
import ProductInfo from "./_components/ProductInfo";
import { Metadata } from "next";
import { cache } from "react";

const getProduct = cache(async (slug: string) => {
  return getProductBySlug(slug);
});

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProduct(productSlug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${product.name} | Giá rẻ - Trả góp 0%`,
    description: `Mua ${product.name}, công nghệ giá rẻ, hàng chính hãng, trả góp 0%, bảo hành uy tín. Mua ngay ${product.name} tại đây.`,
    alternates: {
      canonical: `/${productSlug}`,
    },
    openGraph: {
      title: `${product.name}, công nghệ gần đây | Giá rẻ - Trả góp 0%`,
      description: `Mua ${product.name}, công nghệ giá rẻ, hàng chính hãng, trả góp 0%, bảo hành uy tín. Mua ngay ${product.name} tại đây.`,
      url: `/${productSlug}`,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProduct(productSlug);

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="md:mt-10 xl:mt-15">
      <div className="flex">
        <div className="flex-1 lg:w-[70%]">
          <ProductInfo product={product} />
        </div>
        <div className="ml-5 hidden w-[30%] flex-col items-center lg:flex">
          <PolicyList />
        </div>
      </div>
      <ProductDescription product={product} />
    </div>
  );
}
