import { Button, Form, Input, Modal } from "antd";
import { usePostCategoryMutation, useUpdateCategpryMutation } from "../hooks/mutations";
import { ModalProps } from "@types";
import { useEffect } from "react";

const CategpryModal = ({ open, handleCancel, update }: ModalProps) => {
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreating } = usePostCategoryMutation();
  const { mutate: updateMutatem, isPending: isUpdateing } = useUpdateCategpryMutation();
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
          <Form.Item label="Category name" name="name" rules={[{ required: true, message: "Enter category name" }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button loading={isCreating || isUpdateing} type="primary" htmlType="submit" size="large" style={{ width: "100%", marginTop: "5px" }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategpryModal;
