import AuthImg from "../../../assets/boy.png";
import { Button } from "antd";
import { useGetAdmin } from "../hooks/queries";
import { removeAccessToken } from "@utils/token-service";
import { useNavigate } from "react-router-dom";
import { useDeleteSettings } from "../hooks/mutations";
import { useState } from "react";
import SettingsModal from "./modal";
const Settins = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetAdmin();
  const { mutate: deleteSettings } = useDeleteSettings();
  const handleCreate = () => {
    removeAccessToken();
    navigate("/sign-in");
  };
  const handleDelete = () => {
    deleteSettings();
  };
  const handleUpdate = () => {
    setOpen(true);
  };
  const handleCansel = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: "flex", gap: "200px" }}>
      <SettingsModal open={open} handleCancel={handleCansel} />
      <div>
        <img src={AuthImg} />
      </div>
      <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <p>First name</p>
          <p style={{ fontWeight: "600", fontSize: "20px" }}>{data?.first_name}</p>
        </div>
        <div>
          <p>Email</p>
          <p style={{ fontWeight: "600", fontSize: "20px" }}>{data?.email}</p>
        </div>
        <div>
          <p>Last name</p>
          <p style={{ fontWeight: "600", fontSize: "20px" }}>{data?.last_name}</p>
        </div>

        <div>
          <p>Phone number</p>
          <p style={{ fontWeight: "600", fontSize: "20px" }}>{data?.phone_number}</p>
        </div>
        <div style={{ gridColumnStart: 1, gridColumnEnd: 3, display: "flex", gap: "16px", color: "#fff" }}>
          <Button onClick={handleCreate} style={{ backgroundColor: "green", color: "#fff" }} type="text" size="large">
            Create account
          </Button>
          <Button onClick={handleUpdate} style={{ backgroundColor: "orange", color: "#fff" }} type="text" size="large">
            Update account
          </Button>
          <Button onClick={handleDelete} style={{ backgroundColor: "red", color: "#fff" }} type="text" size="large">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settins;
