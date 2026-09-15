import { Product } from "../types";

export const searchProducts = (products: Product[], keyword: string) => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
};
