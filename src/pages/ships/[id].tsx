import { useRef, useEffect } from "react";
import { AppShell, Box } from "@mantine/core";
import { useParams } from "@/router";
import Console from "@/components/organisms/Console";
import Wall from "@/components/atoms/Wall";
import Objekt from "@/components/atoms/Objekt";
import Player from "@/components/atoms/Player";
import Mob from "@/components/atoms/Mob";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";
import useMobsStore from "@/stores/mobsStore";
import BackgroundImage from "@/components/atoms/BackgroundImage";

const Main = () => {
  const { user } = useAuthStore();
  const { id } = useParams("/ships/:id");
  const { rideShip, shipDetail } = useShipsStore();
  const mainRef = useRef<HTMLDivElement>(null);

  const { mobs } = useMobsStore();

  useEffect(() => {
    if (user) rideShip(id, user);
  }, [rideShip, id, user]);

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
      <BackgroundImage mainRef={mainRef} />
      {shipDetail.walls.map((wall) => (
        <Wall key={wall.id} wall={wall} mainRef={mainRef} />
      ))}
      {shipDetail.objects.map((obj) => (
        <Objekt key={obj.id} objekt={obj} mainRef={mainRef} />
      ))}
      {mobs.map((mob) => {
        if (mob.id === user?.uid) return null;
        return <Mob key={mob.id} mob={mob} mainRef={mainRef} />;
      })}

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
