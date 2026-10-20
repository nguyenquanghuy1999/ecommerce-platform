import Breadcrumb from "@/src/app/_components/Breadcrumb";
import ProductInfo from "./ProductInfo";
import PolicyList from "./PolicyList";
import ProductDescription from "./ProductDescription";
import { Category, Product } from "@/src/types";

export default function ProductPage({
  category,
  product,
}: {
  category: Category;
  product: Product;
}) {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: category.name, href: `/${category.slug}` },
    { label: product.name },
  ];

  return (
    <div className="mt-3 md:mt-5">
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-5 flex lg:mt-10">
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
