import { update, ref } from "firebase/database";
import { rtdb } from "@/firebase";
import { UserInfo } from "firebase/auth";

export const registerUser = async (shipId: string, user: UserInfo) => {
  await update(ref(rtdb, `ships/${shipId}/users/${user.uid}`), {
    id: user.uid,
    name: user.displayName,
    photoURL: user.photoURL,
    position: {
      x: 0,
      y: 0,
    },
  });
};

// export const updateUser = (userId) => {};
