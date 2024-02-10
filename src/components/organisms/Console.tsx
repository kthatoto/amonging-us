import { Box, Divider, Group, Flex, Stack, Text } from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import useShipsStore from "@/stores/shipsStore";
import Comment from "@/components/molecules/Comment";
import CommentForm from "@/components/organisms/CommentForm";
import { useParams } from "@/router";

const Console = () => {
  const { id } = useParams("/ships/:id");
  const { selectedObject } = useShipsStore();
  if (selectedObject) {
    return (
      <Flex
        justify="space-between"
        direction="column"
        h="100%"
        p={20}
        gap={10}
      >
        <Box flex={1} style={{ overflow: "hidden" }}>
          <Stack gap={20}>
            <Stack gap={10}>
              <Group align="top" wrap="nowrap">
                <Box w={80} h={80} style={{ minWidth: 80 }} bg="gray"></Box>
                <Box flex={1}>
                  <Text fw="bold">{selectedObject.title}</Text>
                  {/* TODO: 誰が作ったか */}
                </Box>
              </Group>
              <Text fz="sm">{selectedObject.description}</Text>
            </Stack>

            <Divider />

            <Stack gap={10}>
              <Text fw="bold" fz="lg">
                <I icon={faComments} style={{ marginRight: 4 }} />
                <span>Comments</span>
              </Text>
              <Stack gap={16}>
                {selectedObject.comments.map((comment) => (
                  <Comment comment={comment}/>
                ))}
                {selectedObject.comments.length === 0 && (
                  <Text c="gray">No Comments yet</Text>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <CommentForm
          shipId={id}
          objectId={selectedObject.id}
        />
      </Flex>
    );
  }
};

export default Console;
