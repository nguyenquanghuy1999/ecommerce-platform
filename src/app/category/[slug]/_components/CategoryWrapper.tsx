"use client";
import { Product } from "@/src/types";
import { useEffect, useState } from "react";
import ProductItem from "../../../_components/ProductItem";
import CategoryBreadcrumb from "./CategoryBreadcrumb";
import ProductFilter from "./ProductFilter";
import ProductSort from "./ProductSort";
import { useSearchParams } from "next/navigation";
import CategoryPagination from "./CategoyPagination";

type CategoryWrapperProps = {
  products: Product[];
  currentPage: string;
};

export default function CategoryWrapper({
  products,
  currentPage,
}: CategoryWrapperProps) {
  const [productList, setProductList] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  const PAGE_SIZE = 5;
  const currentPageNumber = Number(searchParams.get("page")) || 1;
  const start = (currentPageNumber - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const currentProducts = productList.slice(start, end);

  useEffect(() => {
    const order = searchParams.get("order");
    const filterMemory = searchParams.get("filterMemory");
    const filterColor = searchParams.get("filterColor");

    let result = products;

    if (filterMemory) {
      result = result.filter((product) => product.memory === filterMemory);
    }

    if (filterColor) {
      result = result.filter((product) => product.color === filterColor);
    }

    if (order) {
      result = result.toSorted((a, b) => {
        const diff = Number(a.price) - Number(b.price);
        return order === "asc" ? diff : -diff;
      });
    }

    setProductList(result);
  }, [searchParams]);

  return (
    <div className="mt-3 flex min-h-screen overflow-hidden md:mt-5 lg:mt-10">
      <ProductFilter products={products} />
      <div className="flex-1 lg:ml-5">
        <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
          <CategoryBreadcrumb currentPage={currentPage} />
          <ProductSort />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {currentProducts.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))}
        </div>
        <div className="my-10">
          <CategoryPagination products={productList} />
        </div>
      </div>
    </div>
  );
}
