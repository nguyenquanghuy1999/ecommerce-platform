import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  limit,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Product } from "../types";
import { unstable_cache } from "next/cache";

const productsCollection = collection(db, "products");

const product = (doc: QueryDocumentSnapshot<DocumentData>): Product => {
  const data = doc.data();
  return {
    id: data.id,
    name: data.name,
    image: data.image,
    price: data.price,
    color: data.color,
    brandId: data.brandId,
    categoryId: data.categoryId,
    memory: data.memory,
    details: data.details,
    slug: data.slug,
  };
};

export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(product);
  },
  ["product-list"],
  { revalidate: 3600, tags: ["products"] },
);
export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    const q = query(productsCollection, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    return product(snapshot.docs[0]);
  },
  ["product-by-slug"],
  { revalidate: 3600, tags: ["ProductBySlug"] },
);

export const getProductsByCategoryId = unstable_cache(
  async (categoryId: number, limitCount?: number): Promise<Product[]> => {
    const productsQuery =
      limitCount !== undefined
        ? query(productsCollection, limit(limitCount))
        : productsCollection;

    const q = query(productsQuery, where("categoryId", "==", categoryId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(product);
  },
  ["products-by-category-id"],
  { revalidate: 3600, tags: ["productsByCategoryId"] },
);

export const getBrandIdsByCategoryId = unstable_cache(
  async (categoryId: number): Promise<number[]> => {
    const q = query(productsCollection, where("categoryId", "==", categoryId));
    const snapshot = await getDocs(q);
    return [...new Set(snapshot.docs.map((doc) => doc.data().brandId))];
  },
  ["brand-ids-by-category-id"],
  { revalidate: 3600, tags: ["brandIdsByCategoryId"] },
);
