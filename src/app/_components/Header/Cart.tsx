"use client";
import { useCartStore } from "@/src/stores/useCartStore";
import Link from "next/link";
import { IconCart } from "../icons/IconCart";
import { cn } from "@/src/lib/utils";

export default function Cart() {
  const items = useCartStore((state) => state.items);

  const totalQuantity = items.reduce((prev, item) => prev + item.quantity, 0);

  const totalLength = totalQuantity.toString().length;

  const rightOffset = totalLength >= 4 ? -totalLength * 5 : -12;

  return (
    <Link href="/cart">
      <div
        className={cn(
          "relative pl-1.5 hover:cursor-pointer",
          totalQuantity >= 1 && "mr-3",
        )}
      >
        <IconCart className="fill-primary stroke-primary lg:fill-foreground lg:stroke-foreground" />
        {totalQuantity >= 1 && (
          <div
            className={cn(
              "bg-primary absolute -top-2 flex min-w-5 items-center justify-center rounded-full px-1 text-white",
            )}
            style={{
              right: `${rightOffset}px`,
            }}
          >
            <span className="text-[13px]">{totalQuantity}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
