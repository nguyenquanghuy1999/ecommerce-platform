import NotFound from "@/src/app/_components/NotFound";
import { getProductByName } from "@/src/services/productService";
import PolicyList from "./PolicyList";
import ProductDescription from "./ProductDescription";
import ProductInfo from "./ProductInfo";
import { Metadata } from "next";

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const encodedSlug = decodeURIComponent(productSlug);
  const product = await getProductByName(encodedSlug);

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
  const encodedProductSlug = decodeURIComponent(productSlug);
  const product = await getProductByName(encodedProductSlug);

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="md:mt-10 xl:mt-15">
      <div className="flex">
        <ProductInfo product={product} />
        <PolicyList />
      </div>
      <ProductDescription product={product} />
    </div>
  );
}
