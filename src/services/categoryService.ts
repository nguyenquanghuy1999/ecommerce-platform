import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, "categories"));
  const result = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      name: data.name,
      image: data.image,
    };
  });

  return result;
};
