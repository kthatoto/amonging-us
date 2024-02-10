import { Button } from "@mantine/core";
import useAuthStore from "@/stores/authStore";

const SignIn = () => {
  const { signInWithGoogle } = useAuthStore();
  return (
    <Button onClick={signInWithGoogle}>
      Googleログイン
    </Button>
  );
};
export default SignIn;
