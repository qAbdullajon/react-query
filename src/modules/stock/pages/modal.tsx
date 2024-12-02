import { Button, Form, Input, Modal, Select } from "antd";
import { ModalProps } from "@types";
import { useEffect, useState } from "react";
import { useCreateMutation, useUpdateMutation } from "../hooks/mutations";
import { useGetBrands, useGetProducts, useGetCategories } from "../../products/hooks/queries";

const ModalStock = ({ open, handleCancel, update }: ModalProps) => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreate } = useCreateMutation();
  const { mutate: updateMutate, isPending: isUpdate } = useUpdateMutation();
  const { categories } = useGetCategories().data || {};
  const { brands } = useGetBrands(categoryId).data || {};
  const { products } = useGetProducts({ page: 1, limit: 5, search: "" }).data || {};

  useEffect(() => {
    if (update.id && open) {
      form.setFieldsValue({
        quantity: update.quantity,
      });
    }
  }, [form, open, update]);
  const onFinish = (values: any) => {
    values = { ...values, quantity: +values.quantity };
    if (update.id) {
      updateMutate({ ...values, id: update.id });
    } else {
      createMutate(values);
    }
    // handleCancel();
    // form.resetFields();
  };
  const changeCategory = (id: number) => {
    setCategoryId(id);
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
        <Form.Item label="Select category" name="category_id" rules={[{ required: true, message: "Select category name" }]}>
          <Select onChange={changeCategory} size="large">
            {categories?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Select brand" name="brand_id" rules={[{ required: true, message: "Select brand name" }]}>
          <Select disabled={categoryId == 0} size="large">
            {brands?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Select product" name="product_id" rules={[{ required: true, message: "Select product name" }]}>
          <Select size="large">
            {products?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Enter quantity" }]}>
          <Input type="number" size="large" />
        </Form.Item>
        <Form.Item>
          <Button loading={isCreate || isUpdate} type="primary" htmlType="submit" size="large" style={{ width: "100%", marginTop: "5px" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalStock;
