import { useMemo } from "react";
import { Button, Modal, Text, Textarea, TextInput, Switch, Flex } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { showSuccessNotification } from "@/utils/notifications";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";

export interface EditParams {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
}
interface FormValues {
  title: string;
  description: string;
  isPrivate: boolean;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  isPrivate: z.boolean(),
});

interface Props {
  opened: boolean;
  close: () => void;
  editingShip?: EditParams;
}

const ShipModalForm = ({ opened, close, editingShip }: Props) => {
  const { user } = useAuthStore();
  const { createShip, updateShip, getShips } = useShipsStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editingShip?.title || "",
      description: editingShip?.description || "",
      isPrivate: editingShip?.isPrivate || false,
    },
  });

  const isEditing = useMemo(() => !!editingShip, [editingShip]);

  const onSubmit = handleSubmit(async (params) => {
    if (!user) return;
    if (editingShip) {
      await updateShip(editingShip.id, {
        ...params,
        userId: user.uid,
      });
      showSuccessNotification("Updated ship");
      close();
      // TODO: getShipDetail
    } else {
      await createShip({ ...params, userId: user.uid });
      showSuccessNotification("Created new ship!");
      close();
      await getShips();
    }
    reset();
  });

  if (!user) return null;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fz="xl" fw="bold">
          {isEditing ? "Edit Ship" : "New Ship"}
        </Text>
      }
    >
      <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              data-autofocus
              label={
                <Text fw="bold" fz="lg">Ship Name</Text>
              }
              error={errors.title?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              label={
                <Text fw="bold" fz="lg" my={8}>
                  Description
                </Text>
              }
              error={errors.description?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="isPrivate"
          render={({ field }) => (
            <Flex justify="flex-end" my={10}>
              <Switch
                size="md"
                styles={{
                  root: { cursor: "pointer" },
                  track: { alignSelf: "center", cursor: "pointer" },
                  body: { flexDirection: "row-reverse", gap: 10 },
                  label: { cursor: "pointer" },
                }}
                label={
                  <Text fw="bold" fz="lg" my={8}>
                    Private Ship
                  </Text>
                }
                {...field}
              />
            </Flex>
          )}
        />
        <Button type="submit" fullWidth size="lg">
          <I icon={faRocket} />
          <Text fw="bold" ml={8}>Launch New Ship</Text>
        </Button>
      </form>
    </Modal>
  );
};

export default ShipModalForm;
