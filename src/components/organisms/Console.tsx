import { useState } from "react";
import { Box, Button, Divider, Stack, Text } from "@mantine/core";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
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

  const [isEditingShip, setIsEditingShip] = useState<boolean>(false);

  if (selectedObject)
    return <ObjectConsole selectedObject={selectedObject} />;

  if (!shipDetail) return null;
  return (
    <>
      <Stack gap={0}>
        <Box p={10}>
          <Text fz={24} fw="bold">{shipDetail.title}</Text>
          <Text fz={16}>{shipDetail.description}</Text>
          {shipDetail.userId === user?.uid && (
            <Button variant="default" fullWidth mt={5}>
              <I icon={faEdit} />
              <span>Edit</span>
            </Button>
          )}
          <Divider mt={10}/>
        </Box>
      </Stack>
      <ShipModalForm
        opened={isEditingShip}
        close={() => setIsEditingShip(false)}
        editingShip={shipDetail}
      />
    </>
  );
};

export default Console;
