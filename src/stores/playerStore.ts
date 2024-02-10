import { create } from "zustand";

interface PlayerStore {
  position: {
    x: number;
    y: number;
  };
  move: (xDiff: number, yDiff: number) => void;
  setPosition: (x: number, y: number) => void;

  interactableObjectIds: string[];
  setInteractableObjects: (ids: string[]) => void;
}

export default create<PlayerStore>((set) => {
  return {
    position: { x: 0, y: 0 },
    move: (xDiff, yDiff) => {
      set((state) => ({
        position: {
          x: state.position.x + xDiff,
          y: state.position.y + yDiff,
        },
      }));
    },
    setPosition: (x, y) => {
      set(() => ({ position: { x, y } }));
    },

    interactableObjectIds: [],
    setInteractableObjects: (ids: string[]) => {
      set(() => ({ interactableObjectIds: ids }));
    },
  };
});
