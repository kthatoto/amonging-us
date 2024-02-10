import { create } from "zustand";
import {
  listShips,
  getShipDetail,
  getObjectDetail,
  Ship,
  ShipDetail,
  ObjectDetail,
  join,
  createShip,
  updateShip,
  ShipParams,
} from "@/models/ship";
import { registerUser } from "@/database/user";
import { UserInfo } from "firebase/auth";

interface ShipsStore {
  ships: Ship[];
  getShips: (userId: string) => Promise<void>;
  createShip: (params: ShipParams) => Promise<void>;
  updateShip: (id: string, params: ShipParams) => Promise<void>;

  shipDetail?: ShipDetail;
  rideShip: (id: string, user: UserInfo | null) => Promise<void>;
  fetchShip: (id: string) => Promise<void>;

  selectedObject?: ObjectDetail;
  selectObject: (id: string, objectId: string) => Promise<void>;
}

export default create<ShipsStore>((set) => {
  const getShips = async (userId: string) => {
    const ships = await listShips(userId);
    set({ ships });
  };

  const rideShip = async (id: string, user: UserInfo | null) => {
    if (user) await join(id, user.uid);
    const [shipDetail] = await Promise.all([
      getShipDetail(id),
      user ? registerUser(id, user) : undefined,
    ]);
    set({ shipDetail });
  };
  const fetchShip = async (id: string) => {
    const shipDetail = await getShipDetail(id);
    set({ shipDetail });
  };

  const selectObject = async (id: string, objectId: string) => {
    const objectDetail = await getObjectDetail(id, objectId);
    set({ selectedObject: objectDetail });
  };

  return {
    ships: [],
    getShips,
    createShip,
    updateShip,

    shipDetail: undefined,
    rideShip,
    fetchShip,

    selectedObject: undefined,
    selectObject,
  };
});
