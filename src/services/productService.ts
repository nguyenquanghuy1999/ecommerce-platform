import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Product } from "../types";

const productsCollection = collection(db, "products");

const product = (doc: QueryDocumentSnapshot<DocumentData>): Product => {
  const data = doc.data();
  return {
    id: data.id,
    name: data.name,
    image: data.image,
    price: data.price,
    color: data.color,
    categoryId: data.categoryId,
    memory: data.memory,
  };
};

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(product);
};

export const getProductsByCategoryId = async (
  categoryId: number,
): Promise<Product[]> => {
  const q = query(productsCollection, where("categoryId", "==", categoryId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(product);
};
