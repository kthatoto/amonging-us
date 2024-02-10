import {
  faCheckCircle,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationsProps, showNotification } from "@mantine/notifications";
import { COLORS } from "@/styles/colors";

export const showErrorNotification = (
  message: string,
  options: Partial<NotificationsProps> = {},
) => {
  showNotification({
    title: message,
    message: "",
    icon: (
      <FontAwesomeIcon
        icon={faCircleXmark}
        style={{
          width: "100%",
          height: "100%",
          color: COLORS.red,
          backgroundColor: COLORS.white,
          borderRadius: "50%",
        }}
      />
    ),
    styles: {
      root: {
        backgroundColor: COLORS.redPale,
        borderColor: COLORS.redPale,
      },
      title: { color: COLORS.red },
    },
    ...options,
  });
};

export const showSuccessNotification = (
  message: string,
  options: Partial<NotificationsProps> = {},
) => {
  showNotification({
    title: message,
    message: "",
    icon: (
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{
          width: "100%",
          height: "100%",
          color: COLORS.green,
          backgroundColor: COLORS.white,
          borderRadius: "50%",
        }}
      />
    ),
    styles: {
      root: {
        backgroundColor: COLORS.greenPale,
        borderColor: COLORS.greenPale,
        "&::before": { backgroundColor: COLORS.white },
      },
      title: { color: COLORS.green },
    },
    ...options,
  });
};
