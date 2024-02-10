import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  UserInfo,
} from "firebase/auth";
import { create } from "zustand";
import { auth, googleProvider } from "@/firebase";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/utils/notifications";

interface AuthStore {
  user: UserInfo | null;
  loading: boolean;
  error: unknown | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export default create<AuthStore>((set) => {
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
  });

  return {
    user: null,
    loading: true,
    error: null,
    signInWithGoogle: async () => {
      set({ loading: true });
      try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        showSuccessNotification("Success sign-in");
        set({ user: userCredential.user, loading: false, error: null });
      } catch (error) {
        showErrorNotification("Fail sign-in");
        set({ loading: false, error });
      }
    },
    signOut: async () => {
      set({ loading: true });
      try {
        await signOut(auth);
        showSuccessNotification("Success sign-out");
        set({ user: null, loading: false, error: null });
      } catch (error) {
        showErrorNotification("Fail sign-out");
        set({ loading: false, error });
      }
    },
  };
});
