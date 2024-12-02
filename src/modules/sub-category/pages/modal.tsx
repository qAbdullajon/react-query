import { Button, Form, Input, Modal } from "antd";
import { usePostSubMutation, useUpdateSubMutation } from "../hooks/mutations";
import { ModalProps } from "@types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SubCategpryModal = ({ open, handleCancel, update }: ModalProps) => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const { mutate: createMutate, isPending: isCreating } = usePostSubMutation();
  const { mutate: updateMutatem, isPending: isUpdateing } = useUpdateSubMutation();
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
    values = { ...values, parent_category_id: Number(id) };
    if (update.id) {
      const payloud = { ...values, id: update.id };
      updateMutatem(
        { ...payloud, id: Number(update.id) },
        {
          onSuccess: () => {
            handleCancel();
            form.resetFields();
          },
        }
      );
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

export default SubCategpryModal;
