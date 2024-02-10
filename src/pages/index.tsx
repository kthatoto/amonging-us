import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppShell, Button, Card, Center, SimpleGrid, Space, Text } from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure } from "@mantine/hooks";
import SignIn from "@/components/SignIn";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";
import NewShipModal from "@/components/organisms/NewShipModal";

const Index = () => {
  const { user, signOut } = useAuthStore();
  const { ships, getShips } = useShipsStore();

  const [newShipModalOpened, newShipModalHandlers] = useDisclosure();

  useEffect(() => {
    getShips();
  }, [getShips]);

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
                <Text fz={24} ml={10}>New Ship</Text>
              </Center>
            </Card>
          )}
          {ships.map((ship) => (
            <Link key={ship.id} to={`/ships/${ship.id}`}>
              <Card shadow="sm" h={200}>
                <Text>{ship.title}</Text>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        <NewShipModal
          opened={newShipModalOpened}
          close={newShipModalHandlers.close}
        />
      </AppShell.Main>
    </AppShell>
  );
};

export default Index;
