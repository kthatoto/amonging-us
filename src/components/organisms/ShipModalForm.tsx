import { Modal } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { showSuccessNotification } from "@/utils/notifications";
import useAuthStore from "@/stores/authStore";
import useShipsStore from "@/stores/shipsStore";

interface Props {
  opened: boolean;
  close: () => void;
}

const NewShipModal = ({ opened, close }: Props) => {
  const { user } = useAuthStore();
  const { createShip } = useShipsStore();

  if (!user) return null;
  return (
    <Modal opened={opened} onClose={close} title="New Ship">
    </Modal>
  );
};

export default NewShipModal;
