import { Button } from "@/src/components/ui/button";
import { formatPrice } from "@/src/lib/utils";
import { Product } from "@/src/types";
import Image from "next/image";
import { IconCart } from "../_components/Header/icons/IconCart";


export default function ProductItem({ item }: { item: Product }) {
  return (
    <div className="group text-md hover:border-primary text min-h-80 cursor-pointer overflow-hidden shadow-lg hover:border">
      <Image
        alt={item.name}
        src={`${item.image}`}
        width={285}
        height={200}
        className="mx-auto h-50 object-contain transition-all duration-300 ease-in group-hover:scale-105"
      />
      <div className="mt-2 min-h-20 px-3">
        <h2>{item.name}</h2>
        <p className="text-primary">
          {formatPrice(item.price)}
          <u className="relative bottom-px text-[11px]">đ</u>
        </p>
      </div>
      <div className="mr-2 py-3 text-end opacity-0 transition-all duration-200 ease-in group-hover:opacity-100">
        <Button className="cursor-pointer">
          <IconCart className="size-5.75 fill-white stroke-white" />
        </Button>
      </div>
    </div>
  );
}
