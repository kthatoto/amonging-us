import { Box, Image, Text } from "@mantine/core";
import useAuthStore from "@/stores/authStore";
import { useController } from "@/hooks/useController";
import { PLAYER_SIZE } from "@/constants";

const commonStyle = {
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  margin: "auto",
  inset: 0,
  position: "absolute",
  borderRadius: "50%",
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
          backgroundColor: "gray",
        }}
      />
    );
  }
  return (
    <Box
      style={{
        ...commonStyle,
        backgroundColor: "skyblue",
      }}
    >
      {user.photoURL ? (
        <Image w="100%" h="100%" radius="50%" src={user.photoURL} />
      ) : (
        <Text
          ta="center"
          fw="bold"
          style={{ lineHeight: PLAYER_SIZE + "px", fontSize: 24 }}
        >
          {user.displayName?.at(0)}
        </Text>
      )}
    </Box>
  );
};

export default Player;
