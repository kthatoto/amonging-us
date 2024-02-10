import { Mob } from "@/stores/mobsStore";
import UserIcon from "@/components/atoms/UserIcon";
import { PLAYER_SIZE } from "@/constants";

interface Props {
  mob: Mob;
}
const Mob = ({ mob }: Props) => {
  return (
    <UserIcon
      user={{
        id: mob.id,
        name: mob.name,
        photoURL: mob.photoURL || "",
      }}
      size={PLAYER_SIZE}
    />
  );
};

export default Mob;
