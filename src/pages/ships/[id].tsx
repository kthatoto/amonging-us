import { useRef } from "react";
import { AppShell, Box, Button, Stack } from "@mantine/core";
// import { useParams } from "@/router";
import Objekt from "@/components/atoms/Objekt";
import Player from "@/components/atoms/Player";
import useObjectsStore from "@/stores/objectsStore";
import { Link } from "react-router-dom";

const Main = () => {
  const { objects } = useObjectsStore();
  const mainRef = useRef<HTMLDivElement>(null);

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
      {objects.map((obj, i) => (
        <Objekt key={i} objekt={obj} mainRef={mainRef} />
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
  // const { id } = useParams("/ships/:id");

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
