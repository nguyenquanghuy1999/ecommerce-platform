"use client";
import { Button } from "@/src/components/ui/button";
import { cn, formatPrice } from "@/src/lib/utils";
import { Product } from "@/src/types";
import Image from "next/image";
import { useState } from "react";

export default function ProductInfo({ product }: { product: Product }) {
  const [count, setCount] = useState(1);
  return (
    <div className="flex-1 lg:w-[70%]">
      <div className="flex h-full flex-col items-center justify-evenly min-[1550]:justify-center md:flex-row md:items-start">
        <Image
          src={`${product.image}`}
          alt={`${product.name}`}
          width={355}
          height={355}
          className="object-contain"
        />
        <div className="text-center md:ml-5 md:text-start">
          <h1 className="text-[20px] font-semibold">{product.name}</h1>
          <p className="mt-3 text-sm">
            Tình trạng: <span className="font-medium">Còn hàng</span>
          </p>
          <span className="text-primary mt-3 block text-[24px] font-medium">
            {formatPrice(product.price)}
            <u className="relative bottom-px text-sm">đ</u>
          </span>
          <div className="mt-3 flex h-8.75 justify-center leading-8.75 md:justify-start">
            <Button
              className={cn(
                "text-foreground h-full cursor-pointer rounded-none border border-r-0 border-gray-300 bg-white hover:bg-white",
                count === 1 &&
                  "cursor-default bg-gray-100 text-gray-300 hover:bg-gray-100 hover:text-gray-300 active:translate-y-0!",
              )}
              onClick={() => setCount(Math.max(1, count - 1))}
            >
              –
            </Button>
            <span className="text-primary inline-block h-full min-w-17.5 border border-gray-300 px-3 text-center font-medium">
              {count}
            </span>
            <Button
              className="text-foreground text-md h-full cursor-pointer rounded-none border border-l-0 border-gray-300 bg-white hover:bg-white"
              onClick={() => setCount(count + 1)}
            >
              +
            </Button>
          </div>
          <div className="mt-5 flex flex-col md:flex-row">
            <Button className="h-13.5 w-auto cursor-pointer text-base md:max-w-75 xl:min-w-75">
              Thêm vào giỏ
            </Button>
            <Button className="mt-2 h-13.5 w-auto cursor-pointer bg-green-600 text-base hover:bg-green-600 hover:brightness-104 md:mt-0 md:ml-2 md:max-w-48.75 xl:min-w-48.75">
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
