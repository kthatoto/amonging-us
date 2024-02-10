import { create } from "zustand";
import { listShips, getShipDetail, Ship, ShipDetail } from "@/models/ship";

interface ShipsStore {
  shipDetail?: ShipDetail;
  ships: Ship[];
  getShips: () => Promise<void>;
  rideShip: (id: string) => Promise<void>;
}

export default create<ShipsStore>((set) => {
  const getShips = async () => {
    const ships = await listShips();
    set({ ships });
  };

  const rideShip = async (id: string) => {
    const shipDetail = await getShipDetail(id);
    set({ shipDetail });
  };

  return {
    shipDetail: undefined,
    ships: [],
    getShips,
    rideShip,
  };
});
