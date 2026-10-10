import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <BreadcrumbUI>
      <BreadcrumbList className="flex-nowrap overflow-x-auto pb-3 lg:overflow-x-visible lg:pb-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItemUI className="text-nowrap">
                {isLast ? (
                  <BreadcrumbPage className="text-muted-foreground">
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <Link
                    className="hover:text-primary-light text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </BreadcrumbItemUI>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
}
