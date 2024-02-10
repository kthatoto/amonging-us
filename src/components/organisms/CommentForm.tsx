import { useMemo } from "react";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { showSuccessNotification } from "@/utils/notifications";
import useAuthStore from "@/stores/authStore";
import { createComment, updateComment } from "@/models/comment";

export interface EditParams {
  id: string;
  text: string;
}

interface Props {
  shipId: string;
  objectId: string;
  comment?: EditParams;
  cancelEdit?: () => void;
}
interface FormValues {
  text: string;
}

const formSchema = z.object({
  text: z.string().min(1),
});

const CommentForm = ({ shipId, objectId, comment, cancelEdit }: Props) => {
  const { user } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { text: comment?.text || "" },
  });

  const isEditing = useMemo(() => !!comment, [comment]);

  const onSubmit = handleSubmit(async (params) => {
    if (!user) return;
    if (comment) {
      await updateComment(shipId, objectId, comment.id, {
        ...params,
        userId: user.uid,
      });
      showSuccessNotification("Updated comment");
    } else {
      await createComment(shipId, objectId, {
        ...params,
        userId: user.uid,
      });
      showSuccessNotification("Created new comment!");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={10}>
        <Controller
          control={control}
          name="text"
          render={({ field }) => (
            <Textarea
              label={isEditing ? "Edit Comment" : "New Comment"}
              error={errors.text?.message}
              {...field}
            />
          )}
        />
        <Group>
          {isEditing && (
            <Button onClick={() => cancelEdit?.()} flex={1} variant="default">Cancel</Button>
          )}
          <Button type="submit" flex={1}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CommentForm;
