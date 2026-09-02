import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  const result = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
    };
  });

  return result;
};

export const searchProducts = async (keyword: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
};
