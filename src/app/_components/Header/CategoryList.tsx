"use client";

import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/src/components/ui/item";
import { Category } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function CategoryList({
  categories,
  setOpen,
}: {
  categories: Category[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {

  return (
    <div className="flex max-h-57.5 w-full max-w-md flex-col gap-6 overflow-y-scroll md:max-h-87.75 [&::-webkit-scrollbar]:w-0.75 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400">
      <ItemGroup className="gap-1">
        {categories.map((category) => (
          <Item
            key={category.id}
            role="listitem"
            render={
              <Link
                href={`/category/${category.normalizedName}`}
                onClick={() => setOpen?.(false)}
              >
                <ItemMedia>
                  <Image
                    src={`${category.image}`}
                    alt={category.name}
                    width={25}
                    height={25}
                    className="object-contain"
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="line-clamp-1">
                    {category.name}
                  </ItemTitle>
                </ItemContent>
              </Link>
            }
          />
        ))}
      </ItemGroup>
    </div>
  );
}
