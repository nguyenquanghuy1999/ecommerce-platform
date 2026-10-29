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
import { unstable_cache } from "next/cache";

const categoriesCollection = collection(db, "categories");

const category = (doc: QueryDocumentSnapshot<DocumentData>): Category => {
  const data = doc.data();
  return {
    id: data.id,
    name: data.name,
    image: data.image,
    slug: data.slug,
    bannerImage: data.bannerImage,
  };
};

export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const snapshot = await getDocs(categoriesCollection);
    return snapshot.docs.map(category);
  },
  ["category-list"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getCategoryBySlug = unstable_cache(
  async (slug: string): Promise<Category | null> => {
    console.log("getCategoryBySlug");

    const q = query(categoriesCollection, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    return category(snapshot.docs[0]);
  },
  ["category-detail"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getCategoryById = async (id: number): Promise<Category> => {
  const q = query(categoriesCollection, where("id", "==", id));
  const snapshot = await getDocs(q);
  return category(snapshot.docs[0]);
};
