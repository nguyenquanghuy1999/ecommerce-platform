"use client";
import { Button } from "@/src/components/ui/button";
import { cn, formatPrice } from "@/src/lib/utils";
import { Product } from "@/src/types";
import Image from "next/image";
import { useState } from "react";

export default function ProductInfo({ product }: { product: Product }) {
  const [count, setCount] = useState(1);
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
