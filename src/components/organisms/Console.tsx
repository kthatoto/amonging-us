import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faEdit, faLock } from "@fortawesome/free-solid-svg-icons";
import useShipsStore from "@/stores/shipsStore";
import useAuthStore from "@/stores/authStore";
import ShipModalForm from "@/components/organisms/ShipModalForm";
import ObjectConsole from "./Console/ObjectConsole";
import UserIcon from "@/components/atoms/UserIcon";
import { Link } from "react-router-dom";

const Console = () => {
  const { user } = useAuthStore();
  const { shipDetail, selectedObject } = useShipsStore();

  const [opened, { open, close }] = useDisclosure();

  if (selectedObject) return <ObjectConsole selectedObject={selectedObject} />;

  if (!shipDetail) return null;
  return (
    <>
      <Stack gap={0} h="100%">
        <Box p={10}>
          <Group justify="space-between" wrap="nowrap" align="flex-start">
            <Text fz={24} fw="bold">
              {shipDetail.title}
            </Text>
            {shipDetail.isPrivate && (
              <I icon={faLock} size="lg" style={{ marginTop: 6 }} />
            )}
          </Group>
          <Text fz={16}>{shipDetail.description}</Text>
          {shipDetail.userId === user?.uid && (
            <Button variant="default" fullWidth mt={5} onClick={open}>
              <I icon={faEdit} />
              <span>Edit</span>
            </Button>
          )}
          <Divider mt={10} />
        </Box>
        <Box px={10} flex={1} style={{ overflow: "scroll" }}>
          {shipDetail.users.map((u) => (
            <Group wrap="nowrap" align="flex-start">
              <UserIcon user={u} size={30}/>
              <Text flex={1} pt={4}>{u.name}</Text>
            </Group>
          ))}
        </Box>
        <Stack gap={10} px={10} pb={10}>
          <Divider />
          <Button component={Link} to="/" variant="default" fullWidth>Top Page</Button>
        </Stack>
      </Stack>
      <ShipModalForm opened={opened} close={close} editingShip={shipDetail} />
    </>
  );
};

export default Console;
