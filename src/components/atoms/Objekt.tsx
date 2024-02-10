import { RefObject } from "react";
import { Box } from "@mantine/core";
import { Objekt as ObjektType } from "@/stores/objectsStore";
import usePlayerStore from "@/stores/playerStore";

interface Props {
  objekt: ObjektType;
  mainRef: RefObject<HTMLDivElement>;
}

const Objekt = ({ objekt, mainRef }: Props) => {
  const { position } = usePlayerStore();

  return (
    <Box
      w={objekt.width}
      h={objekt.height}
      style={{
        position: "absolute",
        top: objekt.y - position.y + ((mainRef.current?.clientHeight || 0) / 2),
        left: objekt.x - position.x + ((mainRef.current?.clientWidth || 0) / 2),
        backgroundColor: "gray",
      }}
    />
  );
};

export default Objekt;
