import { create } from "zustand";

interface Mob {
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
