import { useRef } from "react";
import { AppShell, Box } from "@mantine/core";
// import { useParams } from "@/router";
import Objekt from "@/components/atoms/Objekt";
import Player from "@/components/atoms/Player";
import useObjectsStore from "@/stores/objectsStore";

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
    <h1>Console</h1>
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
