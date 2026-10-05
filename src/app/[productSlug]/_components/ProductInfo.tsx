"use client";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/components/ui/toast";
import { useCartStore } from "@/src/stores/useCartStore";
import { Product } from "@/src/types";
import Image from "next/image";
import Price from "../../_components/Price";
import QuantitySelector from "../../_components/QuantitySelector";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductInfo({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const route = useRouter();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.add({
      type: "success",
      description: `Đã thêm ${product.name} vào giỏ.`,
      timeout: 3000,
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    route.push("/cart");
  };

  return (
    <div className="flex h-full flex-col items-center justify-evenly min-[1550]:justify-center md:flex-row md:items-start">
      <Image
        src={`${product.image}`}
        alt={`${product.name}`}
        width={355}
        height={355}
        className="object-contain"
      />
      <div className="w-full text-center md:ml-5 md:w-auto md:text-start">
        <h1 className="text-[20px] font-semibold">{product.name}</h1>
        <p className="mt-3 text-sm">
          Tình trạng: <span className="font-medium">Còn hàng</span>
        </p>
        <Price
          value={product.price}
          size="lg"
          className="text-primary mt-3 font-medium"
        />
        <QuantitySelector
          className="mt-3"
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
        <div className="mt-5 flex flex-col flex-wrap gap-3 md:flex-row">
          <Button
            className="h-13.5 w-auto cursor-pointer px-5 text-base md:max-w-75 2xl:min-w-75"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ
          </Button>
          <Button
            className="h-13.5 w-auto cursor-pointer bg-green-600 px-5 text-base hover:bg-green-600 hover:brightness-104 md:max-w-48.75 2xl:min-w-48.75"
            onClick={handleBuyNow}
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
