import { useRef, useEffect } from "react";
import { AppShell, Box } from "@mantine/core";
import { useParams } from "@/router";
import Console from "@/components/organisms/Console";
import Objekt from "@/components/atoms/Objekt";
import Player from "@/components/atoms/Player";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";

const Main = () => {
  const { user } = useAuthStore();
  const { id } = useParams("/ships/:id");
  const { rideShip, shipDetail, joinShip } = useShipsStore();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rideShip(id);
    if (user) joinShip(id, user.uid);
  }, [rideShip, id, user, joinShip]);

  if (!shipDetail) return null;

  return (
    <Box
      id="main"
      ref={mainRef}
      w="100%"
      h="100vh"
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      {shipDetail.objects.map((obj) => (
        <Objekt key={obj.id} objekt={obj} mainRef={mainRef} />
      ))}
      <Player />
    </Box>
  );
};

const Ship = () => {
  return (
    <AppShell aside={{ width: 300, breakpoint: "xs" }}>
      <AppShell.Main bg="#efefef">
        <Main />
      </AppShell.Main>
      <AppShell.Aside>
        <Console />
      </AppShell.Aside>
    </AppShell>
  );
};

export default Ship;
