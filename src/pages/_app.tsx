import { Outlet } from "react-router-dom";
import {
  AppShell,
  Burger,
  Button,
  createTheme,
  Group,
  Image,
  MantineProvider,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import useAuthStore from "@/stores/authStore";
import SignIn from "@/components/SignIn";

const globalFontFamily =
  'Avenir, "Helvetica Neue", Helvetica, Arial, "Hiragino Kaku Gothic ProN", YuGothic';
const theme = createTheme({
  fontFamily: globalFontFamily,
  black: "#444",
  headings: {
    fontFamily: globalFontFamily,
  },
});

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const { user, signOut } = useAuthStore();
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <ModalsProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="sm"
        >
          <AppShell.Header>
            <Group align="center" h="100%" p={10}>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            {user ? (
              <>
                <Group mb={10}>
                  {user.photoURL && (
                    <Image src={user.photoURL} w={40} h={40} radius="50%" />
                  )}
                  <Stack gap={0}>
                    <Text fw="bold">{user.displayName}</Text>
                    <Text>{user.email}</Text>
                  </Stack>
                </Group>
                <Button onClick={signOut}>ログアウト</Button>
              </>
            ) : (
              <SignIn />
            )}
          </AppShell.Navbar>
          <AppShell.Main bg="#efefef">
            <Outlet />
          </AppShell.Main>
          <AppShell.Footer py={10} bg="#efefef">
          </AppShell.Footer>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
