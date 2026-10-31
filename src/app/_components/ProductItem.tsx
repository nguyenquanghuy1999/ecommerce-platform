import { Product } from "@/src/types/";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import Price from "./Price";
import { cn } from "@/src/lib/utils";

export default function ProductItem({
  data,
  className,
}: {
  data: Product;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group text-md hover:border-primary flex min-h-80 w-full cursor-pointer flex-col justify-between overflow-hidden border shadow-lg",
        className,
      )}
    >
      <Link href={`/${data.slug}`} className="flex flex-1 flex-col p-3">
        <Image
          alt={data.name}
          src={`${data.image}`}
          width={285}
          height={200}
          loading="eager"
          className="mx-auto h-full max-h-50 object-contain transition-all duration-300 ease-in group-hover:scale-105"
        />
        <div className="mt-2 min-h-20">
          <h2>{data.name}</h2>
          <Price value={data.price} size="md" className="text-primary" />
        </div>
      </Link>
      <div className="mr-2 py-3 text-end opacity-0 transition-all duration-200 ease-in group-hover:opacity-100">
        <AddToCartButton product={data} />
      </div>
    </div>
  );
}
