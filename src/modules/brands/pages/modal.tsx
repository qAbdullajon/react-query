import { Button, Form, Input, Modal, Select } from "antd";
import { BrandsType } from "../types";
import { ModalProps } from "@types";
import { useEffect, useState } from "react";
import { useCreateBrandMutation, useUpdateBrandMutation } from "../hooks/mutations";
import { useGetCategoryMutation } from "../hooks/queries";

const ModalBrands = ({ open, handleCancel, update }: ModalProps) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreate } = useCreateBrandMutation();
  const { mutate: updateMutate, isPending: isUpdate } = useUpdateBrandMutation();
  const { categories = [] } = useGetCategoryMutation().data || {};

  const [file, setFile] = useState<any>(null);
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (update.id && open) {
      form.setFieldsValue({
        name: update.name,
        description: update.description,
      });
    }
  }, [form, open, update]);
  const onFinish = (values: any) => {
    if (update.id) {
      values.categoryId = values.category_id;
      delete values.category_id;
      updateMutate({ ...values, id: update.id });
      console.log(values, update.id);
    } else {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("file", file);
      formData.append("category_id", values.category_id);
      createMutate(formData);
    }
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
        <Form.Item label="Brand name" name="name" rules={[{ required: true, message: "Enter brand name" }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Select category" name="category_id" rules={[{ required: true, message: "Select category name" }]}>
          <Select size="large">
            {categories.map((item: BrandsType) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {!update.id && (
          <Form.Item label="Brand image" name="file" rules={[{ required: true, message: "Please upload a brand image!" }]}>
            <Input type="file" onChange={handleFileChange} size="large" id="basic_file" aria-required="true" className="ant-input ant-input-lg css-1yx3mpk ant-input-outlined" />
          </Form.Item>
        )}
        <Form.Item label="Sescription" name="description" rules={[{ required: true, message: "Please enter description!" }]}>
          <TextArea />
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

export default ModalBrands;
