import { useCallback, useEffect, useState } from "react";
import usePlayerStore from "@/stores/playerStore";
import { useInterval } from "@/utils/useInterval";

const INTERVAL = 100;
const TICK_DISTANCE = 3;

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
