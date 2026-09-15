import { getCategories } from "@/src/services/categoryService";
import MenuWrapper from "./MenuWrapper";

export default async function Menu() {
  const categories = await getCategories();

  return <MenuWrapper categories={categories} />;
}
