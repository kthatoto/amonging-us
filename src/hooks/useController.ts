import { useCallback, useEffect, useState } from "react";
import usePlayerStore from "@/stores/playerStore";
import useShipsStore from "@/stores/shipsStore";
import { useInterval } from "@/utils/useInterval";
import { calcCollisionStatus } from "@/utils/calcCollisionStatus";
import { PLAYER_SIZE } from "@/constants";

const INTERVAL = 20;
const TICK_DISTANCE = 8;

const UP_KEYS = ["ArrowUp", "w"];
const DOWN_KEYS = ["ArrowDown", "s"];
const RIGHT_KEYS = ["ArrowRight", "d"];
const LEFT_KEYS = ["ArrowLeft", "a"];

export const useController = () => {
  const { move, position } = usePlayerStore();
  const { shipDetail } = useShipsStore();

  const [pressingKeys, setPressingKeys] = useState<string[]>([]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (pressingKeys.includes(e.key)) return;
    setPressingKeys([...pressingKeys, e.key]);
  }, [pressingKeys]);
  const handleKeyup = useCallback((e: KeyboardEvent) => {
    const keys = pressingKeys.filter((key) => key !== e.key);
    setPressingKeys(keys);
  }, [pressingKeys]);

  useInterval(
    async () => {
      const isUp = UP_KEYS.some((k) => pressingKeys.includes(k));
      const isDown = DOWN_KEYS.some((k) => pressingKeys.includes(k));
      const isRigth = RIGHT_KEYS.some((k) => pressingKeys.includes(k));
      const isLeft = LEFT_KEYS.some((k) => pressingKeys.includes(k));

      const diff = { x: 0, y: 0 };
      if (isUp) diff.y = -TICK_DISTANCE;
      if (isDown) diff.y = TICK_DISTANCE;
      if (isRigth) diff.x = TICK_DISTANCE;
      if (isLeft) diff.x = -TICK_DISTANCE;

      if (shipDetail?.objects && (diff.x !== 0 || diff.y !== 0)) {
        shipDetail.objects.forEach((obj) => {
          if (diff.x === 0 && diff.y === 0) return;
          const result = calcCollisionStatus(
            { x: position.x + diff.x, y: position.y + diff.y, width: PLAYER_SIZE, height: PLAYER_SIZE },
            obj
          );
          if (result.x || result.y) {
            console.log(obj);
          }
          if (result.x) diff.x = 0;
          if (result.y) diff.y = 0;
        });
      }
      if (diff.x !== 0 || diff.y !== 0) move(diff.x, diff.y);
    },
    INTERVAL
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    }
  }, [handleKeydown, handleKeyup]);
};
