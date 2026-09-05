import ProductItem from "@/src/app/search/ProductItem";
import SearchEmpty from "@/src/app/search/SearchEmpty";
import { Separator } from "@/src/components/ui/separator";
import { searchProducts } from "@/src/services/productService";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const { keyword } = await searchParams;

  if (!keyword) {
    return <SearchEmpty />;
  }

  const data = await searchProducts(keyword);

  return (
    <>
      <div className="mt-2.5 mb-5 px-2.5 py-2.5 md:px-12.5 lg:px-17.5 xl:px-25">
        <h1>
          Kết quả tìm kiếm cho từ khoá '
          <span className="text-primary">{keyword}</span>'
        </h1>
        <Separator className="bg-primary mt-5" />
        {data.length === 0 ? (
          <SearchEmpty />
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5">
            {data.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
