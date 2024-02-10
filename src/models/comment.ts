import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import {
  SHIPS_COLLECTION_NAME,
  OBJECTS_COLLECTION_NAME,
  COMMENTS_COLLECTION_NAME,
} from "@/constants";

export interface CommentParams {
  text: string;
  userId: string;
}

export const createComment = async (
  shipId: string,
  objectId: string,
  params: CommentParams,
) => {
  const shipDocRef = doc(db, SHIPS_COLLECTION_NAME, shipId);
  const objectDocRef = doc(shipDocRef, OBJECTS_COLLECTION_NAME, objectId);
  const commentDocsRef = collection(objectDocRef, COMMENTS_COLLECTION_NAME);
  await addDoc(commentDocsRef, {
    text: params.text,
    userId: params.userId,
    createdAt: Timestamp.now(),
  });
};

export const updateComment = async (
  shipId: string,
  objectId: string,
  commentId: string,
  params: CommentParams,
) => {
  const shipDocRef = doc(db, SHIPS_COLLECTION_NAME, shipId);
  const objectDocRef = doc(shipDocRef, OBJECTS_COLLECTION_NAME, objectId);
  const commentDocRef = doc(objectDocRef, COMMENTS_COLLECTION_NAME, commentId);
  await updateDoc(commentDocRef, {
    text: params.text,
  });
};

export const deleteComment = async (
  shipId: string,
  objectId: string,
  commentId: string,
) => {
  const shipDocRef = doc(db, SHIPS_COLLECTION_NAME, shipId);
  const objectDocRef = doc(shipDocRef, OBJECTS_COLLECTION_NAME, objectId);
  const commentDocRef = doc(objectDocRef, COMMENTS_COLLECTION_NAME, commentId);
  await deleteDoc(commentDocRef);
};
