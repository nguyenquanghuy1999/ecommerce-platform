import { Product } from "@/src/types/";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import Price from "./Price";

export default function ProductItem({ data }: { data: Product }) {
  return (
    <div className="group text-md hover:border-primary text min-h-80 cursor-pointer overflow-hidden shadow-lg hover:border">
      <Link href={`/${data.slug}`}>
        <Image
          alt={data.name}
          src={`${data.image}`}
          width={285}
          height={200}
          className="mx-auto h-50 object-contain transition-all duration-300 ease-in group-hover:scale-105"
        />
        <div className="mt-2 min-h-20 px-3">
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
