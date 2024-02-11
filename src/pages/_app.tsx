import { Outlet } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

const globalFontFamily =
  'Avenir, "Helvetica Neue", Helvetica, Arial, "Hiragino Kaku Gothic ProN", YuGothic';
const theme = createTheme({
  fontFamily: globalFontFamily,
  black: "#444",
});

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-center" />
      <ModalsProvider>
        <Outlet />
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
