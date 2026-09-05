import { getCategories } from "@/src/services/categoryService";
import CategoryWrapper from "./CategoryWrapper";
import CategoryList from "./CategoryList";

export default async function CategoryMenu() {
  const categories = await getCategories();

  return (
    <CategoryWrapper>
      <CategoryList categories={categories} />
    </CategoryWrapper>
  );
}
