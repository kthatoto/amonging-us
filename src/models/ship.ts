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
export const COMMENTS_COLLECTION_NAME = "comments";

export interface Comment {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
}

export interface ObjectDoc {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface ObjectDetail extends ObjectDoc {
  title: string;
  description: string;
  progress: number;
  comments: Comment[];
  userId: string;
  createdAt: string;
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

export const getObjectDetail = async (id: string, objectId: string): Promise<ObjectDetail> => {
  const shipDocRef = doc(db, SHIPS_COLLECTION_NAME, id);
  const objectDocRef = doc(shipDocRef, OBJECTS_COLLECTION_NAME, objectId);

  const objectDoc = await getDoc(objectDocRef);
  const commentDocsRef = collection(objectDocRef, COMMENTS_COLLECTION_NAME);

  const commentDocs = await getDocs(commentDocsRef);

  return {
    id: objectDoc.id,
    ...objectDoc.data(),
    comments: commentDocs.docs.map((commentDoc) => ({
      id: commentDoc.id,
      ...commentDoc.data(),
    }) as Comment),
  } as ObjectDetail;
};
