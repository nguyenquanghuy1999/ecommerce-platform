"use client";
import { cn } from "@/src/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";

const priceSortOptions = [
  {
    title: "Giá: Thấp đến Cao",
    type: "asc",
  },
  {
    title: "Giá: Cao đến Thấp",
    type: "desc",
  },
];

export default function ProductSort() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const order = searchParams.get("order");
  const selectedOption = priceSortOptions.find(
    (option) => option.type === order,
  );

  const handleClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", type);
    params.set("sortBy", "price");
    params.set("page", "1");
    window.history.pushState(null, "", `?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div
      tabIndex={-1}
      className="mt-5 flex w-full items-center justify-center md:mt-0 md:w-fit md:justify-between"
      onBlur={() => setOpen(false)}
    >
      <span className="mr-2 text-[13px]">Sắp xếp theo: </span>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div
          className="flex h-9 w-45 cursor-pointer items-center justify-between border px-2"
          onClick={() => setOpen(!open)}
        >
          <span className="text-[14px]">{selectedOption?.title || "Giá"}</span>
          <IoIosArrowDown />
        </div>
        <ul
          className={cn(
            "invisible absolute top-9 right-0 w-45 cursor-pointer bg-white py-2 opacity-0 shadow-2xl transition-all duration-200 ease-in",
            open && "visible opacity-100",
          )}
        >
          {priceSortOptions.map((option, index) => (
            <li
              key={index}
              className="hover:text-primary relative p-2 text-[14px]"
              onClick={() => handleClick(option.type)}
            >
              {option.title}
              {option.title === selectedOption?.title && (
                <IoMdCheckmark className="text-primary absolute top-2.5 right-3" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
