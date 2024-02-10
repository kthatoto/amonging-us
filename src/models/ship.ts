import {
  collection,
  // doc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "@/firebase";

export const SHIPS_COLLECTION_NAME = "ships";

export interface Ship {
  id: string;
  title: string;
}

export const listShips = async () => {
  const shipDocsRef = query(
    collection(db, SHIPS_COLLECTION_NAME),
    where("isPrivate", "!=", true)
  );
  const shipDocs = await getDocs(shipDocsRef);

  return shipDocs.docs.map((shipDoc) => {
    return {
      id: shipDoc.id,
      ...shipDoc.data(),
    } as Ship;
  });
};
