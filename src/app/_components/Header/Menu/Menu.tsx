import { getCategories } from "@/src/services/categoryService";
import MenuWrapper from "./MenuWrapper";
import CategoryList from "../Nav/CategoryList";

export default async function Menu() {
  const categories = await getCategories();

  return (
    <MenuWrapper>
      <CategoryList categories={categories} />
    </MenuWrapper>
  );
}
