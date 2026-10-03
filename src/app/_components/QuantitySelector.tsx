"use client";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type QuantitySelectorProps = {
  variant?: "default" | "compact";
  className?: string;
  countSize?: "sm";
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export default function QuantitySelector({
  variant = "default",
  className,
  countSize,
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        "flex justify-center md:justify-start",
        variant === "default" && "h-8.75",
        variant === "compact" && "h-6.25",
        className,
      )}
    >
      <Button
        disabled={quantity === 1}
        className={cn(
          "text-foreground h-full cursor-pointer rounded-none border border-r-0 border-gray-300 bg-white hover:bg-white",
        )}
        onClick={() => onQuantityChange(quantity - 1)}
      >
        –
      </Button>
      <span
        className={cn(
          "flex h-full items-center justify-center border border-gray-300 px-3 font-medium select-none",
          variant === "default" && "text-primary min-w-17.5",
          variant === "compact" && "min-w-8.75",
          countSize === "sm" && "text-sm",
        )}
      >
        {quantity}
      </span>
      <Button
        className="text-foreground text-md h-full cursor-pointer rounded-none border border-l-0 border-gray-300 bg-white hover:bg-white"
        onClick={() => onQuantityChange(quantity + 1)}
      >
        +
      </Button>
    </div>
  );
}
