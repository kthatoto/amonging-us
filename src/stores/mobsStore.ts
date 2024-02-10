import { create } from "zustand";

export interface Mob {
  id: string;
  name: string;
  photoURL?: string;
  position: {
    x: number;
    y: number;
  };
}

interface MobsStore {
  mobs: Mob[];
  setMobs: (mobs: Mob[]) => void;
}

export default create<MobsStore>((set) => {
  return {
    mobs: [],
    setMobs: (mobs: Mob[]) => {
      set({ mobs });
    },
  };
});
