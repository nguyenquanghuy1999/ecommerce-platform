"use client";
import { Button } from "@/src/components/ui/button";
import { useCartStore } from "@/src/stores/useCartStore";
import { Product } from "@/src/types";
import { useRouter } from "next/navigation";
import { IconCart } from "./icons/IconCart";

export default function AddToCartButton({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);
  const route = useRouter();

  const handleClick = () => {
    addProduct(product);
    route.push("/cart");
  };

  return (
    <Button className="cursor-pointer" onClick={handleClick}>
      <IconCart className="size-5.75 fill-white stroke-white" />
    </Button>
  );
}
