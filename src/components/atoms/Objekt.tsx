import { RefObject } from "react";
import { Box } from "@mantine/core";
import { Objekt as ObjektType } from "@/models/objekt";
import usePlayerStore from "@/stores/playerStore";
// import { PLAYER_SIZE } from "@/constants";

interface Props {
  objekt: ObjektType;
  mainRef: RefObject<HTMLDivElement>;
}

const Objekt = ({ objekt, mainRef }: Props) => {
  const { position } = usePlayerStore();

  const top = objekt.y - position.y + ((mainRef.current?.clientHeight || 0) / 2);
  const left = objekt.x - position.x + ((mainRef.current?.clientWidth || 0) / 2);

  return (
    <Box
      w={objekt.width}
      h={objekt.height}
      style={{
        position: "absolute",
        backgroundColor: "gray",
        top,
        left,
      }}
    />
  );
};

export default Objekt;
