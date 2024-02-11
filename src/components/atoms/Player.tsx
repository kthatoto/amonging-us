import { Box } from "@mantine/core";
import useAuthStore from "@/stores/authStore";
import { useController } from "@/hooks/useController";
import { PLAYER_SIZE } from "@/constants";
import UserIcon from "@/components/atoms/UserIcon";

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
  const { user } = useAuthStore();
  useController();

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
    <UserIcon
      user={{
        id: user.uid,
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      }}
      size={PLAYER_SIZE}
      style={commonStyle}
    />
  );
};

export default Player;
