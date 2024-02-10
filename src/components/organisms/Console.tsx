import { useState } from "react";
import { Box, Divider, Group, Flex, Stack, Text } from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import useShipsStore from "@/stores/shipsStore";
import Comment from "@/components/molecules/Comment";
import CommentForm, { EditParams as CommentEditParams } from "@/components/organisms/CommentForm";
import { useParams } from "@/router";

const Console = () => {
  const { id } = useParams("/ships/:id");
  const { selectedObject } = useShipsStore();
  const [editingComment, setEditingComment] = useState<CommentEditParams | undefined>();

  if (selectedObject) {
    return (
      <Flex
        justify="space-between"
        direction="column"
        h="100%"
        p={20}
      >
        <Stack flex={1} gap={0} style={{ overflow: "hidden" }}>
          <Stack gap={10}>
            <Group align="top" wrap="nowrap">
              <Box w={80} h={80} style={{ minWidth: 80 }} bg="gray"></Box>
              <Box flex={1}>
                <Text fw="bold">{selectedObject.title}</Text>
                {/* TODO: 誰が作ったか */}
              </Box>
            </Group>
            <Text fz="sm">{selectedObject.description}</Text>
            <Text fw="bold" fz="lg">
              <I icon={faComments} style={{ marginRight: 4 }} />
              <span>Comments ({selectedObject.comments.length})</span>
            </Text>
          </Stack>

          <Divider />

          <Stack gap={10} py={10} style={{ overflow: "scroll" }}>
            <Stack gap={16}>
              {selectedObject.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  setEditingComment={setEditingComment}
                />
              ))}
              {selectedObject.comments.length === 0 && (
                <Text c="gray">No Comments yet</Text>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        {editingComment ? (
          <CommentForm
            key={"edit-form-" + editingComment.id}
            shipId={id}
            objectId={selectedObject.id}
            comment={editingComment}
            cancelEdit={() => setEditingComment(undefined)}
          />
        ) : (
          <CommentForm
            key="new-form"
            shipId={id}
            objectId={selectedObject.id}
          />
        )}
      </Flex>
    );
  }
};

export default Console;
