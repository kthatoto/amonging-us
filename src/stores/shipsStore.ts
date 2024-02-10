import { create } from "zustand";
import { listShips, Ship } from "@/models/ship";

interface ShipsStore {
  ships: Ship[];
  getShips: () => Promise<void>;
}

export default create<ShipsStore>((set) => {
  const getShips = async () => {
    const ships = await listShips();
    set({ ships });
  };

  return {
    ships: [],
    getShips,
  };
});
