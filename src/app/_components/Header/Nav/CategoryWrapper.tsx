"use client";
import { cn } from "@/src/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

export default function CategoryWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsTablet(!isDesktop);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="group relative after:absolute after:h-10 after:w-full after:bg-transparent after:content-['']"
      tabIndex={-1}
      onBlur={() => isTablet && setOpen(false)}
    >
      <div
        className="group text-md border-primary-light flex w-50 items-center border-r lg:w-62.5"
        onClick={() => isTablet && setOpen(!open)}
      >
        <BiSolidCategory />
        <span className="ml-2 font-semibold">Danh mục sản phẩm</span>
        <IoIosArrowDown
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out group-hover:rotate-180",
            open && "rotate-180",
          )}
        />
      </div>
      <div
        className={cn(
          "invisible absolute top-8 right-0 left-0 translate-y-1 rounded-lg border bg-white p-1 text-black opacity-0 shadow-2xl transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          open && "visible translate-y-0 opacity-100",
        )}
      >
        {children}
      </div>
    </div>
  );
}
