import { Outlet } from "react-router-dom";
import {
  AppShell,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
// import useAuthStore from "@/stores/authStore";

const globalFontFamily =
  'Avenir, "Helvetica Neue", Helvetica, Arial, "Hiragino Kaku Gothic ProN", YuGothic';
const theme = createTheme({
  fontFamily: globalFontFamily,
  black: "#444",
});

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <ModalsProvider>
        <AppShell>
          <AppShell.Main bg="#efefef">
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
