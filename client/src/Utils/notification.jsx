import { Badge } from "antd";
import { notification } from "../assets";
import styles from "./notification.module.scss";

export default function Notification() {
  return (
    <div className={styles.notification_container}>
      <Badge count={5}>
        <img src={notification} width={30} height={30} alt="/" />
      </Badge>
    </div>
  );
}
