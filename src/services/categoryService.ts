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
    normalizedName: data.normalizedName,
  };
};

export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map(category);
};

export const getCategoryByName = async (
  name: string,
): Promise<Category | null> => {
  const normalizedName = name.trim().toLowerCase();
  const q = query(
    categoriesCollection,
    where("normalizedName", "==", normalizedName),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  return category(snapshot.docs[0]);
};
