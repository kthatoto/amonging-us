import { RefObject } from "react";
import { Mob } from "@/stores/mobsStore";
import UserIcon from "@/components/atoms/UserIcon";
import { PLAYER_SIZE } from "@/constants";
import usePlayerStore from "@/stores/playerStore";

interface Props {
  mob: Mob;
  mainRef: RefObject<HTMLDivElement>;
}
const Mob = ({ mob, mainRef }: Props) => {
  const { position } = usePlayerStore();
  const top = mob.position.y - position.y + (mainRef.current?.clientHeight || 0) / 2;
  const left = mob.position.x - position.x + (mainRef.current?.clientWidth || 0) / 2;

  return (
    <UserIcon
      user={{
        id: mob.id,
        name: mob.name,
        photoURL: mob.photoURL || "",
      }}
      size={PLAYER_SIZE}
      style={{
        position: "absolute",
        top,
        left,
      }}
    />
  );
};

export default Mob;
