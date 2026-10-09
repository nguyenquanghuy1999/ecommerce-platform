import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { Category } from "../types";

const categoriesCollection = collection(db, "categories");

const category = (doc: QueryDocumentSnapshot<DocumentData>): Category => {
  const data = doc.data();
  return {
    id: data.id,
    name: data.name,
    image: data.image,
    slug: data.slug,
  };
};

export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map(category);
};

export const getCategoryBySlug = async (
  slug: string,
): Promise<Category | null> => {
  const q = query(categoriesCollection, where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  return category(snapshot.docs[0]);
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const q = query(categoriesCollection, where("id", "==", id));
  const snapshot = await getDocs(q);
  return category(snapshot.docs[0]);
};
