import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/src/components/ui/breadcrumb";
import Link from "next/link";

export default function CategoryBreadcrumb({
  currentPage,
}: {
  currentPage: string | undefined;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hover:text-primary-light">
          <Link href="/">Trang chủ</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Danh mục</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
