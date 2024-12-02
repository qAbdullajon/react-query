import { Button, Drawer, Form, Input, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetBrandCategory, useGetBrands, useGetCategories } from "../hooks/queries";
import { useCreateProduct, useUpdateProduct } from "../hooks/mutations";
import { ModalProps } from "@types";

const DrawerModal = ({ open, handleCancel, update }: ModalProps) => {
  const [form] = Form.useForm();
  const [categoryId, setCategoryId] = useState<number>();
  const [brandCategoryId, setBrandCategoryId] = useState<number>();
  const [fileList, setFileList] = useState<any>([]);
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { categories } = useGetCategories().data || {};
  const { brands } = useGetBrands(categoryId || 0).data || {};
  const { brandCategories } = useGetBrandCategory(brandCategoryId || 0).data || {};
  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          name: update.name,
          price: update.price,
        });
      }
    } else {
      form.resetFields();
    }
  }, [open, update, form]);
  const handleSubmit = (value: any) => {
    if (!update.id) {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("price", value.price);
      formData.append("category_id", value.category_id);
      formData.append("brand_category_id", value.brand_category_id);
      formData.append("brand_id", value.brand_id);
      formData.append("files", fileList);
      createProduct(formData, {
        onSuccess: () => {
          form.resetFields();
          handleCancel();
        },
      });
    } else {
      updateProduct(
        { ...value, id: update.id, price: +value.price },
        {
          onSuccess: () => {
            form.resetFields(), handleCancel();
          },
        }
      );
    }
    setFileList([]);
  };
  const handleCategoryChange = (id: number) => setCategoryId(id);
  const handleBrandChange = (id: number) => setBrandCategoryId(id);
  const handleFileChange = ({ fileList: newFileList }: any) => setFileList(newFileList);

  return (
    <Drawer width={600} onClose={handleCancel} open={open}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>Add new product</h2>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "15px",
        }}
      >
        <Form.Item label="Product name" name="name" rules={[{ required: true, message: "Please input product name!" }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Product price" name="price" rules={[{ required: true, message: "Please input product price!" }]}>
          <Input type="number" size="large" />
        </Form.Item>
        <Form.Item label="Category" name="category_id" rules={[{ required: true, message: "Please select a category!" }]}>
          <Select onChange={handleCategoryChange} size="large">
            {categories?.map(({ id, name }: any) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Brand" name="brand_id" rules={[{ required: true, message: "Please select a brand!" }]}>
          <Select onChange={handleBrandChange} disabled={!brands?.length} size="large">
            {brands?.map(({ id, name }: any) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Brand Category" name="brand_category_id" rules={[{ required: true, message: "Please select a brand category!" }]}>
          <Select disabled={!brandCategories?.length} size="large">
            {brandCategories?.map(({ id, name }: any) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {!update.id && (
          <Form.Item label="Upload Images" name="files" rules={[{ required: true, message: "Please upload at least one image!" }]}>
            <Upload listType="picture-card" fileList={fileList} onChange={handleFileChange}>
              {fileList.length < 3 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        )}
        <Form.Item style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          <Button htmlType="submit" size="large" type="primary" style={{ width: "100%" }}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerModal;
