import {
  doc,
  setDoc,
} from "firebase/firestore";
import { UserInfo } from "firebase/auth";
import { db } from "@/firebase";
import { USERS_COLLECTION_NAME } from "@/constants";

export const touchUser = async (user: UserInfo) => {
  const userDocRef = doc(db, USERS_COLLECTION_NAME, user.uid);
  await setDoc(userDocRef, {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
};
