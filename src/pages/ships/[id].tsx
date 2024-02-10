import { AppShell, Box } from "@mantine/core";
// import { useParams } from "@/router";
import { useController } from "@/hooks/useController";

const Main = () => {
  return (
    <Box w="100%" h="100vh">
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
  useController();

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
