import { RefObject } from "react";
import { Box } from "@mantine/core";
import { Objekt as ObjectType } from "@/models/objekt";
import usePlayerStore from "@/stores/playerStore";

interface Props {
  wall: ObjectType;
  mainRef: RefObject<HTMLDivElement>;
}

const Wall = ({ wall, mainRef }: Props) => {
  const { position } = usePlayerStore();

  const top = wall.y - position.y + (mainRef.current?.clientHeight || 0) / 2;
  const left = wall.x - position.x + (mainRef.current?.clientWidth || 0) / 2;

  return (
    <Box
      w={wall.width}
      h={wall.height}
      style={{ position: "absolute", backgroundColor: "gray", top, left }}
    />
  );
};

export default Wall;
