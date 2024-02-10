import { useCallback, useMemo } from "react";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Box, Group, Image, Stack, Text, UnstyledButton } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Comment as IComment } from "@/models/ship";
import useAuthStore from "@/stores/authStore";
// @ts-expect-error: dayjs
import dayjs from "dayjs";
import { EditParams as CommentEditParams } from "@/components/organisms/CommentForm";
import { COLORS } from "@/styles/colors";

interface Props {
  comment: IComment;
  setEditingComment: (params: CommentEditParams) => void;
  isEditing: boolean;
  deleteComment: (commentId: string) => Promise<void>;
}

const dummySrc = "https://lh3.googleusercontent.com/a/ACg8ocISAgqL0AWYtiS1K0UjC8atjUEDYiWMIZ_-J4nZ4_nzDQ=s288-c-no";
const dummyName = "はとぴじょんああああああ";

const Comment = ({ comment, setEditingComment, isEditing, deleteComment }: Props) => {
  const { user } = useAuthStore();
  const { hovered, ref } = useHover();

  const dateString = useMemo(() => {
    return dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm");
  }, [comment.createdAt])

  const onEdit = useCallback(() => {
    setEditingComment({ id: comment.id, text: comment.text });
  }, [setEditingComment, comment]);

  const onDelete = useCallback(() => {
    deleteComment(comment.id);
  }, [comment, deleteComment]);

  return (
    <Group
      gap={8}
      p={4}
      wrap="nowrap"
      align="top"
      w="100%"
      ref={ref}
      style={{
        borderRadius: 6,
        ...(isEditing ? { backgroundColor: COLORS.skyblue } : {})
      }}
    >
      <Image
        w={35}
        h={35}
        radius="50%"
        style={{ border: "1px solid gray" }}
        src={dummySrc}
      />
      <Stack gap={0} flex={1}>
        <Box pos="relative">
          <Box>
            <Text fz="sm">{dummyName}</Text>
            <Text fz="xs">{dateString}</Text>
          </Box>
          {(user?.uid === comment.userId) && hovered && (
            <Group gap={0} pos="absolute" right={0} top={0}>
              <UnstyledButton onClick={onEdit} py={4} px={8}>
                <I icon={faEdit} color="#666" />
              </UnstyledButton>
              <UnstyledButton onClick={onDelete} py={4} px={8}>
                <I icon={faTrash} color="#666" />
              </UnstyledButton>
            </Group>
          )}
        </Box>
        <Text fz="md" fw="bold">{comment.text}</Text>
      </Stack>
    </Group>
  );
};

export default Comment;
