import { notification } from "antd";
type NotificationType = "success" | "error" | "warning" | "info";

export const Notification = (type: NotificationType, message: string, description: string) => {
  notification[type]({
    message,
    description,
    duration: 2,
    showProgress: true,
    pauseOnHover: true,
  });
};
