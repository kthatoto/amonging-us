import { Image } from "@mantine/core";
import { UserDoc } from "@/models/user";

interface Props {
  user: UserDoc;
  size: number;
}

const commonStyle = {
  borderRadius: "50%",
  border: "1px solid gray",
} as const;

const UserIcon = ({ user, size }: Props) => {
  if (user.photoURL) {
    return (
      <Image src={user.photoURL} w={size} h={size} style={commonStyle} />
    );
  }
  return null;
};

export default UserIcon;
