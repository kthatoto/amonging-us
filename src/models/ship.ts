import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "@/firebase";

export const SHIPS_COLLECTION_NAME = "ships";
export const OBJECTS_COLLECTION_NAME = "objects";

export interface ObjectDoc {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface Ship {
  id: string;
  title: string;
}
export interface ShipDetail extends Ship {
  objects: ObjectDoc[];
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

export const getShipDetail = async (id: string) => {
  const shipDocRef = doc(db, SHIPS_COLLECTION_NAME, id);
  const objectDocsRef = collection(shipDocRef, OBJECTS_COLLECTION_NAME);

  const shipDoc = await getDoc(shipDocRef);
  const objectDocs = await getDocs(objectDocsRef);
  return {
    id: shipDoc.id,
    ...shipDoc.data(),
    objects: objectDocs.docs.map((objectDoc) => ({
      id: objectDoc.id,
      ...objectDoc.data(),
    } as ObjectDoc)),
  } as ShipDetail;
};
