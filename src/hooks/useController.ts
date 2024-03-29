import { useCallback, useEffect, useState } from "react";
import usePlayerStore from "@/stores/playerStore";
import useShipsStore from "@/stores/shipsStore";
import { useInterval } from "@/utils/useInterval";
import { calcCollisionStatus } from "@/utils/calcCollisionStatus";
import { PLAYER_SIZE } from "@/constants";

const INTERVAL = 30;
const TICK_DISTANCE = 10;

const UP_KEYS = ["ArrowUp", "w"];
const DOWN_KEYS = ["ArrowDown", "s"];
const RIGHT_KEYS = ["ArrowRight", "d"];
const LEFT_KEYS = ["ArrowLeft", "a"];

const STOP_MOVE_TAGS = ["INPUT", "TEXTAREA"];

export const useController = () => {
  const { move, position, setInteractableObjects } = usePlayerStore();
  const { shipDetail, selectedObject, clearObject } = useShipsStore();

  const [pressingKeys, setPressingKeys] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(0);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (pressingKeys.includes(e.key)) return;
      setPressingKeys([...pressingKeys, e.key]);
    },
    [pressingKeys],
  );
  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      const keys = pressingKeys.filter((key) => key !== e.key);
      setPressingKeys(keys);
    },
    [pressingKeys],
  );

  useInterval(async () => {
    setCounter(counter + 1);
    if (STOP_MOVE_TAGS.includes(document.activeElement?.tagName || "")) {
      return;
    }
    const isUp = UP_KEYS.some((k) => pressingKeys.includes(k));
    const isDown = DOWN_KEYS.some((k) => pressingKeys.includes(k));
    const isRigth = RIGHT_KEYS.some((k) => pressingKeys.includes(k));
    const isLeft = LEFT_KEYS.some((k) => pressingKeys.includes(k));

    const diff = { x: 0, y: 0 };
    if (isUp) diff.y = -TICK_DISTANCE;
    if (isDown) diff.y = TICK_DISTANCE;
    if (isRigth) diff.x = TICK_DISTANCE;
    if (isLeft) diff.x = -TICK_DISTANCE;
    const isMoving = diff.x !== 0 || diff.y !== 0;

    const interactableIds: string[] = [];
    const objects = [
      ...(shipDetail?.objects || []),
      ...(shipDetail?.walls || []),
    ];
    if (objects.length > 0 && isMoving) {
      objects.forEach((obj) => {
        const result = calcCollisionStatus(
          {
            x: position.x - PLAYER_SIZE / 2,
            y: position.y - PLAYER_SIZE / 2,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
          },
          obj,
          diff,
        );
        if (result.x) diff.x = result.restX;
        if (result.y) diff.y = result.restY;
        if (!obj.isWall && result.interactable) interactableIds.push(obj.id);
      });
    }
    if (diff.x !== 0 || diff.y !== 0) {
      move(diff.x, diff.y);
    }
    if (isMoving) setInteractableObjects(interactableIds);
    if (
      isMoving &&
      selectedObject &&
      !interactableIds.includes(selectedObject.id)
    ) {
      clearObject();
    }
  }, INTERVAL);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);
};
