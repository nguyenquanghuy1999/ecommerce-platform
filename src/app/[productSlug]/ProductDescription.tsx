"use client";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Product } from "@/src/types";
import Image from "next/image";
import { useState } from "react";

export default function ProductDescription({ product }: { product: Product }) {
  const [showMore, setShowMore] = useState(false);

  const intro = product.details.intro;
  const sections = product.details.sections;

  const handleClick = () => {
    if (showMore) {
      window.scrollTo({
        top: 500,
      });
    }
    setShowMore(!showMore);
  };

  return (
    <div className="mt-5 lg:mt-2">
      <span className="bg-muted inline-block h-10 w-20.5 text-center leading-10 text-white">
        Mô tả
      </span>
      <div className="border p-3">
        <p className="text-md font-medium">{intro.title}</p>
        <Image
          src={`${intro.image}`}
          alt={`${intro.title}`}
          className="m-auto my-3.75 w-full md:w-[50%]"
          width={300}
          height={300}
        />
        <ul className={cn("h-125 overflow-hidden", showMore && "h-full")}>
          {sections?.map((section) => (
            <li key={section.title} className="py-3.75">
              <span className="text-[20px] font-semibold">{section.title}</span>
              <p className="text-md mt-2">{section.content}</p>
              <Image
                src={`${section.image}`}
                alt={`${section.title}`}
                className="m-auto my-3.75 w-full md:w-[50%]"
                width={300}
                height={300}
              />
            </li>
          ))}
        </ul>
        <div className="mt-5 text-center">
          <Button
            variant="outline"
            className="hover:border-primary border-foreground hover:text-primary h-8.75 w-30 cursor-pointer rounded-none hover:border hover:bg-white"
            onClick={handleClick}
          >
            {!showMore ? "Xem thêm" : "Ẩn bớt"}
          </Button>
        </div>
      </div>
    </div>
  );
}
