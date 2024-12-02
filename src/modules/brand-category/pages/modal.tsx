import { Button, Form, Input, Modal, Select } from "antd";
import { useCreateMutation, useUpdateMutation } from "../hooks/mutations";
import { ModalProps } from "@types";
import { useEffect } from "react";
import { useGetBrands } from "../hooks/queries";

const CategpryModal = ({ open, handleCancel, update }: ModalProps) => {
  const [form] = Form.useForm();
  const { brands = [] } = useGetBrands().data || {};

  const { mutate: createMutate, isPending: isCreate } = useCreateMutation();
  const { mutate: updateMutatem, isPending: isUpdate } = useUpdateMutation();
  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          name: update.name,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, form, update]);
  const onFinish = (values: any) => {
    if (update.id) {
      const payloud = { ...values, id: update.id };
      updateMutatem(payloud, {
        onSuccess: () => {
          handleCancel();
          form.resetFields();
        },
      });
    } else {
      createMutate(values, {
        onSuccess: () => {
          handleCancel();
          form.resetFields();
        },
      });
    }
  };
  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };
  return (
    <>
      <Modal title="Category modal" open={open} onCancel={onCancel} footer={null} width={500}>
        <Form onFinish={onFinish} form={form} layout="vertical" style={{ paddingTop: "15px" }}>
          <Form.Item label="Brand category name" name="name" rules={[{ required: true, message: "Enter brand category name" }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Brand name" name="brand_id" rules={[{ required: true, message: "Select brand name" }]}>
            <Select size="large">
              {brands.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button loading={isCreate || isUpdate} type="primary" htmlType="submit" size="large" style={{ width: "100%", marginTop: "5px" }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategpryModal;
