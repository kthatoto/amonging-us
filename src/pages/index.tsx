import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppShell, Button, Card, Center, SimpleGrid, Space, Text } from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SignIn from "@/components/SignIn";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";

const Index = () => {
  const { user, signOut } = useAuthStore();
  const { ships, getShips } = useShipsStore();

  useEffect(() => {
    getShips();
  }, [getShips]);

  return (
    <AppShell>
      <AppShell.Main bg="#efefef" p={40}>
        {user ? <Button onClick={signOut}>Sing Out</Button> : <SignIn />}
        <Space h={40} />
        <SimpleGrid cols={3}>
          <Card shadow="sm" h={200} style={{ cursor: "pointer" }}>
            <Center h="100%">
              <I icon={faPlus} size="xl" />
              <Text fz={24} ml={10}>New Ship</Text>
            </Center>
          </Card>
          {ships.map((ship) => (
            <Link key={ship.id} to={`/ships/${ship.id}`}>
              <Card shadow="sm" h={200}>
                <Text>{ship.title}</Text>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </AppShell.Main>
    </AppShell>
  );
};

export default Index;
