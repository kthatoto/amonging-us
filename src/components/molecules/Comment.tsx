import { useCallback, useMemo } from "react";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Box, Group, Image, Stack, Text, UnstyledButton } from "@mantine/core";
import { Comment as IComment } from "@/models/ship";
// @ts-expect-error: dayjs
import dayjs from "dayjs";
import { EditParams as CommentEditParams } from "@/components/organisms/CommentForm";

interface Props {
  comment: IComment;
  setEditingComment: (params: CommentEditParams) => void;
}

const dummySrc = "https://lh3.googleusercontent.com/a/ACg8ocISAgqL0AWYtiS1K0UjC8atjUEDYiWMIZ_-J4nZ4_nzDQ=s288-c-no";
const dummyName = "はとぴじょん";

const Comment = ({ comment, setEditingComment }: Props) => {
  const dateString = useMemo(() => {
    return dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm");
  }, [comment.createdAt])
  const onEdit = useCallback(() => {
    setEditingComment({ id: comment.id, text: comment.text });
  }, [setEditingComment, comment]);

  return (
    <Group gap={8} wrap="nowrap" align="top" w="100%">
      <Image
        w={35}
        h={35}
        radius="50%"
        style={{ border: "1px solid gray" }}
        src={dummySrc}
      />
      <Stack gap={0} flex={1}>
        <Group justify="space-between" align="flex-start">
          <Box>
            <Text fz="sm">{dummyName}</Text>
            <Text fz="xs">{dateString}</Text>
          </Box>
          <UnstyledButton onClick={onEdit}>
            <I icon={faEdit} size="sm" color="gray" />
          </UnstyledButton>
        </Group>
        <Text fz="md" fw="bold">{comment.text}</Text>
      </Stack>
    </Group>
  );
};

export default Comment;
