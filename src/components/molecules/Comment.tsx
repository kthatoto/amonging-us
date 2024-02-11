import { useCallback, useMemo } from "react";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Box, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Comment as IComment } from "@/models/ship";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";
// @ts-expect-error: dayjs
import dayjs from "dayjs";
import { EditParams as CommentEditParams } from "@/components/organisms/CommentForm";
import { COLORS } from "@/styles/colors";
import UserIcon from "@/components/atoms/UserIcon";

interface Props {
  comment: IComment;
  setEditingComment: (params: CommentEditParams) => void;
  isEditing: boolean;
  deleteComment: (commentId: string) => Promise<void>;
}

const Comment = ({
  comment,
  setEditingComment,
  isEditing,
  deleteComment,
}: Props) => {
  const { user } = useAuthStore();
  const { hovered, ref } = useHover();
  const { shipDetail } = useShipsStore();

  const dateString = useMemo(() => {
    return dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm");
  }, [comment.createdAt]);

  const onEdit = useCallback(() => {
    setEditingComment({ id: comment.id, text: comment.text });
  }, [setEditingComment, comment]);

  const onDelete = useCallback(() => {
    deleteComment(comment.id);
  }, [comment, deleteComment]);

  const commenter = useMemo(() => {
    return shipDetail!.users.find((u) => u.id === comment.userId);
  }, [shipDetail, comment]);

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
        ...(isEditing ? { backgroundColor: COLORS.skyblue } : {}),
      }}
    >
      {commenter && <UserIcon user={commenter} size={35} />}
      <Stack gap={0} flex={1}>
        <Box pos="relative">
          <Box>
            <Text fz="sm">{commenter?.name}</Text>
            <Text fz="xs">{dateString}</Text>
          </Box>
          {user?.uid === comment.userId && hovered && (
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
        <Text fz="md" fw="bold">
          {comment.text}
        </Text>
      </Stack>
    </Group>
  );
};

export default Comment;
