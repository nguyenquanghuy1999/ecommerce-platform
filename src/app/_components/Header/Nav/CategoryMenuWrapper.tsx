"use client";
import { cn } from "@/src/lib/utils";
import { Category } from "@/src/types/category";
import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import CategoryList from "../CategoryList";

export default function CategoryMenuWrapper({
  categories,
}: {
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <div className="text-md border-primary-light flex w-50 items-center border-r py-2 lg:w-62.5">
        <BiSolidCategory />
        <span className="ml-2 font-semibold">Danh mục sản phẩm</span>
        <IoIosArrowDown
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            open && "rotate-180",
          )}
        />
      </div>

      <div
        className={cn(
          "invisible absolute top-10 right-0 left-0 translate-y-1 rounded-lg border bg-white p-1 text-black opacity-0 shadow-2xl transition-all duration-300 ease-in-out",
          open && "visible translate-y-0 opacity-100",
        )}
      >
        <CategoryList categories={categories} setOpen={setOpen} />
      </div>
    </div>
  );
}
