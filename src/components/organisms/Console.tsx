import { Box, Button, Divider, Group, Flex, Stack, Text } from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useShipsStore from "@/stores/shipsStore";

const Console = () => {
  const { selectedObject } = useShipsStore();
  return (
    <Flex
      justify="space-between"
      direction="column"
      h="100%"
      p={20}
      gap={10}
    >
      <Box flex={1} style={{ overflow: "hidden" }}>
        {selectedObject && (
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
              <Stack gap={5}>
                {}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>

      <Box h={40} w="100%">
        <Button component={Link} to="/" w="100%">Top Page</Button>
      </Box>
    </Flex>
  );
};

export default Console;
