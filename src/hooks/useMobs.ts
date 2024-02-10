import { useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { rtdb } from "@/firebase";
import useMobsStore from "@/stores/mobsStore";

export const useMobs = (shipId: string) => {
  const { setMobs } = useMobsStore();

  useEffect(() => {
    const usersRef = ref(rtdb, `ships/${shipId}/users`);
    onValue(usersRef, (snapshot) => {
      const newUsers = snapshot.val();
      setMobs(Object.values(newUsers));
    });

    return () => {
      const usersRef = ref(rtdb, `ships/${shipId}/users`);
      off(usersRef);
    };
  }, [shipId, setMobs]);
};
