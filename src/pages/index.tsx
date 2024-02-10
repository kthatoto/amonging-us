import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppShell, Button, Card, SimpleGrid, Space, Text } from "@mantine/core";
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
        {user ? (
          <Button onClick={signOut}>Sing Out</Button>
        ) : (
          <SignIn />
        )}
        <Space h={40} />
        <SimpleGrid cols={3}>
          {ships.map((ship) => (
            <Link key={ship.id} to={`/ships/${ship.id}`}>
              <Card shadow="sm" h={100}>
                <Text>{ship.title}</Text>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </AppShell.Main>
    </AppShell>
  )
};

export default Index;
