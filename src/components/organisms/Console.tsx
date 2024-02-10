import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faEdit, faLock } from "@fortawesome/free-solid-svg-icons";
import useShipsStore from "@/stores/shipsStore";
// import { useParams } from "@/router";
// import { showSuccessNotification } from "@/utils/notifications";
import useAuthStore from "@/stores/authStore";
import ShipModalForm from "@/components/organisms/ShipModalForm";
import ObjectConsole from "./Console/ObjectConsole";

const Console = () => {
  // const { id } = useParams("/ships/:id");
  const { user } = useAuthStore();
  const {
    shipDetail,
    selectedObject,
    // users,
  } = useShipsStore();

  const [opened, { open, close }] = useDisclosure();

  if (selectedObject)
    return <ObjectConsole selectedObject={selectedObject} />;

  if (!shipDetail) return null;
  return (
    <>
      <Stack gap={0}>
        <Box p={10}>
          <Group justify="space-between" wrap="nowrap" align="flex-start">
            <Text fz={24} fw="bold">{shipDetail.title}</Text>
            {shipDetail.isPrivate && <I icon={faLock} size="lg" style={{ marginTop: 6 }} />}
          </Group>
          <Text fz={16}>{shipDetail.description}</Text>
          {shipDetail.userId === user?.uid && (
            <Button variant="default" fullWidth mt={5} onClick={open}>
              <I icon={faEdit} />
              <span>Edit</span>
            </Button>
          )}
          <Divider mt={10}/>
        </Box>
      </Stack>
      <ShipModalForm
        opened={opened}
        close={close}
        editingShip={shipDetail}
      />
    </>
  );
};

export default Console;
