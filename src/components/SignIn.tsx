import { Button, Stack } from "@mantine/core";
import useAuthStore from "@/stores/authStore";

const SignIn = () => {
  const { signInWithGoogle } = useAuthStore();
  return (
    <Stack>
      <Button onClick={signInWithGoogle} fullWidth>
        Googleログイン
      </Button>
    </Stack>
  );
};
export default SignIn;
