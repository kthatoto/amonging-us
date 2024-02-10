import { useMemo } from "react";
import { Group, Image, Stack, Text } from "@mantine/core";
import { Comment as IComment } from "@/models/ship";
// @ts-expect-error: dayjs
import dayjs from "dayjs";

interface Props {
  comment: IComment;
}

const dummySrc = "https://lh3.googleusercontent.com/a/ACg8ocISAgqL0AWYtiS1K0UjC8atjUEDYiWMIZ_-J4nZ4_nzDQ=s288-c-no";
const dummyName = "はとぴじょん";

const Comment = ({ comment }: Props) => {
  const dateString = useMemo(() => {
    return dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm");
  }, [comment.createdAt])
  return (
    <Stack gap={8}>
      <Group gap={8} wrap="nowrap" align="top">
        <Image
          w={35}
          h={35}
          radius="50%"
          style={{ border: "1px solid gray" }}
          src={dummySrc}
        />
        <Stack gap={0}>
          <Text fz="sm">{dummyName}</Text>
          <Text fz="xs">{dateString}</Text>
          <Text fz="md" fw="bold">{comment.text}</Text>
        </Stack>
      </Group>
    </Stack>
  );
};

export default Comment;
