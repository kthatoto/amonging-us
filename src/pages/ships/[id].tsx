import { useRef, useEffect } from "react";
import { AppShell, Box, Button, Stack } from "@mantine/core";
import { useParams } from "@/router";
import Objekt from "@/components/atoms/Objekt";
import Player from "@/components/atoms/Player";
import useShipsStore from "@/stores/shipsStore";
import { Link } from "react-router-dom";

const Main = () => {
  const { id } = useParams("/ships/:id");
  const { rideShip, shipDetail } = useShipsStore();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rideShip(id);
  }, [rideShip, id]);

  if (!shipDetail) return null;

  return (
    <Box
      id="main"
      ref={mainRef}
      w="100%" h="100vh"
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

const Console = () => {
  return (
    <Stack gap={20} p={10}>
      <h1>Console</h1>
      <Button component={Link} to="/">Top Page</Button>
    </Stack>
  );
};

const Ship = () => {
  return (
    <AppShell
      aside={{ width: 300, breakpoint: "xs" }}
    >
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
