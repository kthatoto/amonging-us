import { create } from "zustand";

const OBJECTS: Objekt[] = [
  { x: -325, y: -325, width: 50, height: 50 },
  { x: -325, y: 275, width: 50, height: 50 },
  { x: 275, y: -325, width: 50, height: 50 },
  { x: 275, y: 275, width: 50, height: 50 },
];

export interface Objekt {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ObjectsStore {
  objects: Objekt[];
}

export default create<ObjectsStore>(() => {
  return {
    objects: OBJECTS,
  };
});
