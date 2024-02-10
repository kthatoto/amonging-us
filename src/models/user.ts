import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserInfo } from "firebase/auth";
import { db } from "@/firebase";
import { USERS_COLLECTION_NAME } from "@/constants";

export interface UserDoc {
  id: string;
  name: string;
  photoURL: string;
}

export const touchUser = async (user: UserInfo) => {
  const userDocRef = doc(db, USERS_COLLECTION_NAME, user.uid);
  await setDoc(userDocRef, {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
};

export const getUser = async (id: string) => {
  const userDocRef = doc(db, USERS_COLLECTION_NAME, id);
  const userDoc = await getDoc(userDocRef);
  return {
    id: userDoc.id,
    ...userDoc.data(),
  } as UserDoc;
};
