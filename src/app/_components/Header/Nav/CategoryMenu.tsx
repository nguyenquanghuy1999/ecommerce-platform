import { getCategories } from "@/src/services/categoryService";
import CategoryMenuWrapper from "./CategoryMenuWrapper";

export default async function CategoryMenu() {
  const categories = await getCategories();

  return <CategoryMenuWrapper categories={categories} />;
}
