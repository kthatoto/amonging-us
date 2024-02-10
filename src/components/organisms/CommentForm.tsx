import { useMemo } from "react";
import { Button, Group, Stack, Text, Textarea } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { showSuccessNotification } from "@/utils/notifications";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";
import { createComment, updateComment } from "@/models/comment";
import SignIn from "@/components/SignIn";

export interface EditParams {
  id: string;
  text: string;
}

interface Props {
  shipId: string;
  objectId: string;
  editingComment?: EditParams;
  cancelEdit?: () => void;
}
interface FormValues {
  text: string;
}

const formSchema = z.object({
  text: z.string().min(1),
});

const CommentForm = ({
  shipId,
  objectId,
  editingComment,
  cancelEdit,
}: Props) => {
  const { user } = useAuthStore();
  const { selectObject } = useShipsStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { text: editingComment?.text || "" },
  });

  const isEditing = useMemo(() => !!editingComment, [editingComment]);

  const onSubmit = handleSubmit(async (params) => {
    if (!user) return;
    if (editingComment) {
      await updateComment(shipId, objectId, editingComment.id, {
        ...params,
        userId: user.uid,
      });
      showSuccessNotification("Updated comment");
      cancelEdit?.();
    } else {
      await createComment(shipId, objectId, {
        ...params,
        userId: user.uid,
      });
      showSuccessNotification("Created new comment!");
    }
    reset();
    await selectObject(shipId, objectId);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={10}>
        <Controller
          control={control}
          name="text"
          render={({ field }) => (
            <Textarea
              disabled={!user}
              label={
                <Text fw="bold" fz="lg" my={8}>
                  {isEditing ? "Edit Comment" : "New Comment"}
                </Text>
              }
              error={errors.text?.message}
              {...field}
            />
          )}
        />
        <Group>
          {isEditing && (
            <Button onClick={() => cancelEdit?.()} flex={1} variant="default">
              Cancel
            </Button>
          )}
          {user && (
            <Button type="submit" flex={1} disabled={!user}>
              {isEditing ? "Update" : "Submit"}
            </Button>
          )}
        </Group>
        {!user && (
          <Stack gap={0}>
            <Text ta="center" c="gray">
              Please sign-in to comment
            </Text>
            <SignIn />
          </Stack>
        )}
      </Stack>
    </form>
  );
};

export default CommentForm;
