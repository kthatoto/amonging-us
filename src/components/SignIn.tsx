import { Button } from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faG } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "@/stores/authStore";

const SignIn = () => {
  const { signInWithGoogle } = useAuthStore();
  return (
    <Button onClick={signInWithGoogle} size="md">
      <I icon={faG} />
      <span style={{ marginLeft: 2 }}>oogleログイン</span>
    </Button>
  );
};
export default SignIn;
