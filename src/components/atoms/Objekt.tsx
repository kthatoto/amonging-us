import { RefObject, useMemo } from "react";
import { Box } from "@mantine/core";
import { Objekt as ObjectType } from "@/models/objekt";
import usePlayerStore from "@/stores/playerStore";

interface Props {
  objekt: ObjectType;
  mainRef: RefObject<HTMLDivElement>;
}

const Objekt = ({ objekt, mainRef }: Props) => {
  const { position, interactableObjectIds } = usePlayerStore();

  const top = objekt.y - position.y + ((mainRef.current?.clientHeight || 0) / 2);
  const left = objekt.x - position.x + ((mainRef.current?.clientWidth || 0) / 2);

  const interactable = useMemo(() =>
    interactableObjectIds.includes(objekt.id),
    [objekt.id, interactableObjectIds]
  );

  return (
    <Box
      w={objekt.width}
      h={objekt.height}
      style={{
        position: "absolute",
        backgroundColor: interactable ? "skyblue" : "gray",
        top,
        left,
      }}
    />
  );
};

export default Objekt;
