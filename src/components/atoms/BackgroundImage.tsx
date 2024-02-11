import { RefObject } from "react";
import { Image } from "@mantine/core";
import usePlayerStore from "@/stores/playerStore";
import skeld from "@/assets/skeld.webp";

interface Props {
  mainRef: RefObject<HTMLDivElement>;
}

const BackgroundImage = ({ mainRef }: Props) => {
  const { position } = usePlayerStore();

  const top = -500 - position.y + (mainRef.current?.clientHeight || 0) / 2;
  const left = -800 - position.x + (mainRef.current?.clientWidth || 0) / 2;

  return (
    <Image
      src={skeld}
      pos="absolute"
      w={1600}
      h={1000}
      top={top}
      left={left}
    />
  );
};

export default BackgroundImage;
