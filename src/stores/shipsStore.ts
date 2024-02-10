import { create } from "zustand";
import { listShips, getShipDetail, Ship, ShipDetail } from "@/models/ship";

interface ShipsStore {
  ships: Ship[];
  getShips: () => Promise<void>;

  shipDetail?: ShipDetail;
  rideShip: (id: string) => Promise<void>;

  selectedObject?: ObjectDetail;
  selectObject: (id: string, objectId: string) => Promise<void>;
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

  const selectObject = async (id: string, objectId: string) => {
    console.log(id, objectId);
  };

  return {
    ships: [],
    getShips,

    shipDetail: undefined,
    rideShip,

    selectedObject: undefined,
    selectObject,
  };
});
