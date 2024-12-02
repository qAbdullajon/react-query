import { Button, Form, Input, Modal } from "antd";
import { useCreateDetail, useUpdateDetail } from "../hooks/mutations";
import { useEffect } from "react";

const DetailModal = ({ open, handleCancel, update, id }: any) => {
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreating } = useCreateDetail();
  const { mutate: updateMutatem, isPending: isUpdateing } = useUpdateDetail();
  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          quantity: update.quantity,
          colors: update.colors,
          description: update.description,
          discount: update.discount,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, form, update]);
  const onFinish = (values: any) => {
    const val = { ...values, discount: +values.discount, quantity: +values.quantity, product_id: +id };
    if (update.id) {
      const newValue = { ...val, id: update.id, colors: typeof val.colors === "object" ? val.colors.join(", ") : val.colors };
      console.log(newValue);
      updateMutatem(newValue, {
        onSuccess: () => {
          handleCancel();
          form.resetFields();
        },
      });
    } else {
      console.log(val);
      createMutate(val, {
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
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Enter quantity" }]}>
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item label="Discount" name="discount" rules={[{ required: true, message: "Enter discount" }]}>
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item label="Color" name="colors" rules={[{ required: true, message: "Enter discount" }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Enter discount" }]}>
            <Input.TextArea />
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

export default DetailModal;
