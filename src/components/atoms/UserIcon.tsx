import { CSSProperties } from "react";
import { Box, Image, Text } from "@mantine/core";
import { UserDoc } from "@/models/user";
import { generateColor } from "@/utils/generateColor";

interface Props {
  user: UserDoc;
  size: number;
  style?: CSSProperties;
}

const commonStyle = {
  borderRadius: "50%",
  border: "1px solid gray",
} as const;

const UserIcon = ({ user, size, style }: Props) => {
  if (user.photoURL) {
    return (
      <Image
        src={user.photoURL} w={size} h={size} style={{ ...commonStyle, ...style }}
      />
    );
  }
  return (
    <Box
      w={size}
      h={size}
      style={{ ...commonStyle, ...style }}
      bg={generateColor(user.id)}
    >
      <Text
        ta="center"
        fw="bold"
        style={{ lineHeight: size + "px", fontSize: size * 0.7 }}
      >
        {user.name?.at(0)}
      </Text>
    </Box>
  )
};

export default UserIcon;
