import { Button } from "@/src/components/ui/button";
import { Product } from "@/src/types";
import { useSearchParams } from "next/navigation";

export default function ProductFilter({ products }: { products: Product[] }) {
  const getAttributes = (key: "color" | "memory") => [
    ...new Set(
      products.filter((product) => product[key]).map((product) => product[key]),
    ),
  ];

  const colors = getAttributes("color");
  const memories = getAttributes("memory");

  const searchParams = useSearchParams();
  const filterMemory = searchParams.get("filterMemory");
  const filterColor = searchParams.get("filterColor");
  const params = new URLSearchParams(searchParams.toString());

  const pushUrl = () => {
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleFilter = (key: "filterMemory" | "filterColor", value: string) => {
    params.set(key, value);
    params.set("page", "1");
    pushUrl();
  };

  const handleDeleteAllFilter = () => {
    params.delete("filterMemory");
    params.delete("filterColor");
    params.set("page", "1");
    pushUrl();
  };

  return (
    <div className="hidden h-fit w-[25%] shadow-lg lg:block">
      <p className="bg-primary m-auto h-7.5 pl-3 leading-7.5 text-white">Lọc</p>
      <div className="px-3 py-5">
        {memories.length > 0 && (
          <div className="mb-5">
            <span className="text-md font-semibold">Bộ nhớ</span>
            <ul>
              {memories.map((memory) => (
                <li
                  key={memory}
                  className="mt-2 flex"
                  onClick={() => handleFilter("filterMemory", memory)}
                >
                  <input
                    id={memory}
                    type="radio"
                    checked={memory === filterMemory}
                    className="w-3.5"
                  />
                  <label
                    htmlFor={memory}
                    className="ml-2 cursor-pointer text-[14px]"
                  >
                    {memory}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <span className="text-md font-semibold">Màu sắc</span>
        <ul>
          {colors.map((color) => (
            <li
              key={color}
              className="mt-2 flex"
              onClick={() => handleFilter("filterColor", color)}
            >
              <input
                id={color}
                type="radio"
                checked={color === filterColor}
                className="w-3.5"
              />
              <label
                htmlFor={color}
                className="ml-2 cursor-pointer text-[14px]"
              >
                {color}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3.75 text-center">
        <Button
          variant="link"
          className="cursor-pointer"
          onClick={handleDeleteAllFilter}
        >
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
}
