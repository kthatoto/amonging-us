import { Box } from "@mantine/core";
import useAuthStore from "@/stores/authStore";
import { useController } from "@/hooks/useController";

const commonStyle = {
  width: 50,
  height: 50,
  margin: "auto",
  inset: 0,
  position: "absolute",
  borderRadius: "50%",
  backgroundColor: "white",
  border: "1px solid gray",
} as const;

const Player = () => {
  useController();
  const { user } = useAuthStore();

  if (!user) {
    return (
      <Box
        style={{
          ...commonStyle,
        }}
      />
    );
  }
  return (
    <Box
      style={{
        ...commonStyle,
      }}
    />
  );
};

export default Player;
