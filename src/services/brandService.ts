import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  orderBy,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { Brand } from "../types";

const brandsCollection = collection(db, "brands");

const brand = (doc: QueryDocumentSnapshot<DocumentData>): Brand => {
  const data = doc.data();
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
  };
};

export const getBrandsByIds = async (brandIds: number[]): Promise<Brand[]> => {
  const validBrandIds = brandIds.filter((id) => id !== undefined);

  if (validBrandIds.length === 0) {
    return [];
  }

  const q = query(
    brandsCollection,
    where("id", "in", validBrandIds),
    orderBy("id", "asc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(brand);
};
