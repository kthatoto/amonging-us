import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  UserInfo,
} from "firebase/auth";
import { create } from "zustand";
import { auth, googleProvider, facebookProvider } from "@/firebase";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/utils/notifications";

interface AuthStore {
  user: UserInfo | null;
  loading: boolean;
  error: unknown | null;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
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
        showSuccessNotification("ログインしました");
        set({ user: userCredential.user, loading: false, error: null });
      } catch (error) {
        showErrorNotification("ログインに失敗しました");
        set({ loading: false, error });
      }
    },
    signInWithFacebook: async () => {
      set({ loading: true });
      try {
        const userCredential = await signInWithPopup(auth, facebookProvider);
        showSuccessNotification("ログインしました");
        set({ user: userCredential.user, loading: false, error: null });
      } catch (error) {
        showErrorNotification("ログインに失敗しました");
        set({ loading: false, error });
      }
    },
    signOut: async () => {
      set({ loading: true });
      try {
        await signOut(auth);
        showSuccessNotification("ログアウトしました");
        set({ user: null, loading: false, error: null });
      } catch (error) {
        showErrorNotification("ログアウトに失敗しました");
        set({ loading: false, error });
      }
    },
  };
});
