import { Modal } from "@mantine/core";

interface Props {
  opened: boolean;
  close: () => void;
}

const NewShipModal = ({ opened, close }: Props) => {
  return (
    <Modal opened={opened} onClose={close} title="New Ship">
    </Modal>
  );
};

export default NewShipModal;
