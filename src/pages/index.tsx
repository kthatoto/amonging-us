import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppShell,
  Button,
  Card,
  Center,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faPlus, faLock } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure } from "@mantine/hooks";
import SignIn from "@/components/SignIn";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";
import ShipModalForm from "@/components/organisms/ShipModalForm";

const Index = () => {
  const { user, signOut } = useAuthStore();
  const { ships, getShips } = useShipsStore();

  const [newShipModalOpened, newShipModalHandlers] = useDisclosure();

  useEffect(() => {
    if (user) getShips(user.uid);
  }, [getShips, user]);

  return (
    <AppShell>
      <AppShell.Main bg="#efefef" p={40}>
        {user ? <Button onClick={signOut}>Sing Out</Button> : <SignIn />}
        <Space h={40} />
        <SimpleGrid cols={3}>
          {user && (
            <Card
              shadow="sm"
              h={200}
              style={{ cursor: "pointer" }}
              onClick={newShipModalHandlers.open}
            >
              <Center h="100%">
                <I icon={faPlus} size="xl" />
                <Text fz={24} ml={10}>
                  New Ship
                </Text>
              </Center>
            </Card>
          )}
          {ships.map((ship) => (
            <Link key={ship.id} to={`/ships/${ship.id}`} style={{ textDecoration: "none" }}>
              <Card shadow="sm" h={200}>
                <Stack gap={4}>
                  <Group justify="space-between" wrap="nowrap" align="flex-start">
                    <Text fz={20} fw="bold">{ship.title}</Text>
                    {ship.isPrivate && (
                      <I icon={faLock} size="lg" style={{ marginTop: 2 }} />
                    )}
                  </Group>
                  {ship.description && (
                    <Text>{ship.description}</Text>
                  )}
                </Stack>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        <ShipModalForm
          opened={newShipModalOpened}
          close={newShipModalHandlers.close}
        />
      </AppShell.Main>
    </AppShell>
  );
};

export default Index;
