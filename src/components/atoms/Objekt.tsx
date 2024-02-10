import { Box } from "@mantine/core";
import { Objekt as ObjektType } from "@/stores/objectsStore";
import usePlayerStore from "@/stores/playerStore";

interface Props {
  objekt: ObjektType;
}

const Objekt = ({ objekt }: Props) => {
  return (
    <Box
      w={objekt.width}
      h={objekt.height}
      style={{
        position: "absolute",
        top: objekt.y,
        bottom: objekt.x,
        backgroundColor: "gray",
      }}
    />
  );
};

export default Objekt;
