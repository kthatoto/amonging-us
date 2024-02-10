import { Button } from "@mantine/core";
import SignIn from "@/components/SignIn";
import useAuthStore from "@/stores/authStore";

const Index = () => {
  const { user, signOut } = useAuthStore();

  if (user) {
    return (
      <Button onClick={signOut}>Sing Out</Button>
    );
  }
  return <SignIn />;
};

export default Index;
