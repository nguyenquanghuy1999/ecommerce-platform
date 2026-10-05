"use client";
import { Button } from "@/src/components/ui/button";
import { useCartStore } from "@/src/stores/useCartStore";
import { Product } from "@/src/types";
import { IconCart } from "./icons/IconCart";
import { toast } from "@/src/components/ui/toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    addItem(product, 1);
    toast.add({
      type: "success",
      description: `Đã thêm ${product.name} vào giỏ.`,
      timeout: 3000,
    });
  };

  return (
    <Button className="cursor-pointer" onClick={handleClick}>
      <IconCart className="size-5.75 fill-white stroke-white" />
    </Button>
  );
}
