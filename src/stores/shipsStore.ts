import { create } from "zustand";
import {
  listShips,
  getShipDetail,
  getObjectDetail,
  Ship,
  ShipDetail,
  ObjectDetail,
  join,
  getShipUsers,
} from "@/models/ship";
import { UserDoc } from "@/models/user";

interface ShipsStore {
  ships: Ship[];
  getShips: () => Promise<void>;

  shipDetail?: ShipDetail;
  rideShip: (id: string) => Promise<void>;

  selectedObject?: ObjectDetail;
  selectObject: (id: string, objectId: string) => Promise<void>;

  users: UserDoc[];
  joinShip: (id: string, userId: string) => Promise<void>;
}

export default create<ShipsStore>((set) => {
  const getShips = async () => {
    const ships = await listShips();
    set({ ships });
  };

  const rideShip = async (id: string) => {
    const [shipDetail, users] = await Promise.all([
      getShipDetail(id),
      getShipUsers(id),
    ]);
    set({ shipDetail, users });
  };

  const selectObject = async (id: string, objectId: string) => {
    const objectDetail = await getObjectDetail(id, objectId);
    set({ selectedObject: objectDetail });
  };

  const joinShip = async (id: string, userId: string) => {
    await join(id, userId);
  };

  return {
    ships: [],
    getShips,

    shipDetail: undefined,
    rideShip,

    selectedObject: undefined,
    selectObject,

    users: [],
    joinShip,
  };
});
