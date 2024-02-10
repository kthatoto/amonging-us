import { AppShell, Button, Card, Space, Text } from "@mantine/core";
import SignIn from "@/components/SignIn";
import useAuthStore from "@/stores/authStore";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, signOut } = useAuthStore();

  return (
    <AppShell>
      <AppShell.Main bg="#efefef" p={40}>
        {user ? (
          <Button onClick={signOut}>Sing Out</Button>
        ) : (
          <SignIn />
        )}
        <Space h={40} />
        <Link to="/ships/1">
          <Card shadow="sm" w={300} h={100}>
            <Text>First Ship</Text>
          </Card>
        </Link>
      </AppShell.Main>
    </AppShell>
  )
};

export default Index;
