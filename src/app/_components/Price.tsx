import { cn, formatPrice } from "@/src/lib/utils";

type PriceProps = {
  value: string | number;
  size?: "md" | "lg";
  className?: string;
};

export default function Price({ value, size, className }: PriceProps) {
  return (
    <div className={className}>
      <span
        className={cn(
          "inline-block text-sm",
          size === "md" && "text-md",
          size === "lg" && "text-[24px]",
        )}
      >
        {formatPrice(value)}
      </span>
      <u
        className={cn(
          "relative bottom-px text-[11px]",
          size === "lg" && "text-sm",
        )}
      >
        đ
      </u>
    </div>
  );
}
