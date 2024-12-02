import { Button, Form, Input, Modal } from "antd";
import { ModalProps } from "@types";
import { useState } from "react";
import { useCreateAdsMutation } from "../hooks/mutations";

const ModalAds = ({ open, handleCancel }: ModalProps) => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useCreateAdsMutation();

  const [file, setFile] = useState<any>(null);
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("position", values.position);
    formData.append("file", file);
    mutate(formData);
    handleCancel();
    form.resetFields();
  };
  return (
    <Modal
      title="Brands modal"
      open={open}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      footer={null}
    >
      <Form onFinish={onFinish} form={form} layout="vertical" style={{ paddingTop: "15px" }}>
        <Form.Item label="Position" name="position" rules={[{ required: true, message: "Enter position" }]}>
          <Input type="number" size="large" />
        </Form.Item>
        <Form.Item label="Ads image" name="file" rules={[{ required: true, message: "Please upload a Ads image!" }]}>
          <Input type="file" onChange={handleFileChange} size="large" id="basic_file" aria-required="true" className="ant-input ant-input-lg css-1yx3mpk ant-input-outlined" />
        </Form.Item>
        <Form.Item>
          <Button loading={isPending} type="primary" htmlType="submit" size="large" style={{ width: "100%", marginTop: "5px" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAds;
