import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface PopconfirmProps {
  id: number | string;
  deleteItem: (id: string | number) => void;
}

const PopConfirmDelete = ({ id, deleteItem }: PopconfirmProps) => {
  const handleDelete = () => {
    deleteItem(id);
  };
  return (
    <>
      <Popconfirm title="Delete the task" description="Are you sure to delete this task?" onConfirm={handleDelete} okText="Yes" cancelText="No">
        <Button type="default" icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
};

export default PopConfirmDelete;
