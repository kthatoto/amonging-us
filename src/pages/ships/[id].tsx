import { AppShell } from "@mantine/core";
// import { useParams } from "@/router";

const Main = () => {
  return (
    <h1>Ship</h1>
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
