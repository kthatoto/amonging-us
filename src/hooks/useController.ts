import { useCallback, useEffect, useState } from "react";
import usePlayerStore from "@/stores/playerStore";
import { useInterval } from "@/utils/useInterval";

const INTERVAL = 100;
const TICK_DISTANCE = 3;

const UP_KEYS = ["ArrowUp", "w"];
const DOWN_KEYS = ["ArrowDown", "s"];
const RIGHT_KEYS = ["ArrowRight", "d"];
const LEFT_KEYS = ["ArrowLeft", "a"];

export const useController = () => {
  const { move } = usePlayerStore();

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
      if (isUp) diff.y -= TICK_DISTANCE;
      if (isDown) diff.y += TICK_DISTANCE;
      if (isRigth) diff.x += TICK_DISTANCE;
      if (isLeft) diff.y -= TICK_DISTANCE;
      move(diff.x, diff.y);
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
