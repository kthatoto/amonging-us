import { RefObject, useMemo } from "react";
import { Box } from "@mantine/core";
import { Objekt as ObjectType } from "@/models/objekt";
import usePlayerStore from "@/stores/playerStore";
import useShipsStore from "@/stores/shipsStore";
import { useParams } from "@/router";

interface Props {
  objekt: ObjectType;
  mainRef: RefObject<HTMLDivElement>;
}

const interactableStyles = {
  backgroundColor: "skyblue",
  cursor: "pointer",
} as const;

const Objekt = ({ objekt, mainRef }: Props) => {
  const { id } = useParams("/ships/:id");
  const { position, interactableObjectIds } = usePlayerStore();
  const { selectObject } = useShipsStore();

  const top = objekt.y - position.y + ((mainRef.current?.clientHeight || 0) / 2);
  const left = objekt.x - position.x + ((mainRef.current?.clientWidth || 0) / 2);

  const interactable = useMemo(() =>
    interactableObjectIds.includes(objekt.id),
    [objekt.id, interactableObjectIds]
  );

  return (
    <Box
      onClick={() => {
        if (!interactable) return;
        selectObject(id, objekt.id);
      }}
      w={objekt.width}
      h={objekt.height}
      style={{
        position: "absolute",
        backgroundColor: "gray",
        top,
        left,
        ...(interactable ? interactableStyles : {}),
      }}
    />
  );
};

export default Objekt;
