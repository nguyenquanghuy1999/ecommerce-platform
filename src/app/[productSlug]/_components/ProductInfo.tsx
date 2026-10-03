"use client";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/components/ui/toast";
import { Product } from "@/src/types";
import Image from "next/image";
import { useState } from "react";

export default function ProductInfo({ product }: { product: Product }) {
    toast.add({
      type: "success",
      description: `Đã thêm ${product.name} vào giỏ.`,
      timeout: 3000,
    });
  return (
        <Price
          value={product.price}
          size="lg"
          className="text-primary mt-3 font-medium"
        />
        </div>
      </div>
    </div>
  );
}
