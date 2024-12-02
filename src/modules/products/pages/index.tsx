import React, { useEffect, useState } from "react";
import { GlobalTable, PopConfirmDelete, SearchInput } from "@components";
import { Button, Space, Tooltip } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";
import { useGetProducts } from "../hooks/queries";
import DrawerModal from "./driwer";
import { useDeleteProduct } from "../hooks/mutations";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const { products = [], count } = useGetProducts(params).data || {};
  const { mutate } = useDeleteProduct();
  useEffect(() => {
    const pageFormParams = searchParams.get("page") || 1;
    const limitFormParams = searchParams.get("limit") || 5;
    const searchFormParams = searchParams.get("search") || "";
    setParams((prev) => ({
      ...prev,
      page: Number(pageFormParams),
      limit: Number(limitFormParams),
      search: searchFormParams,
    }));
  }, [searchParams]);
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
    setSearchParams({
      page: String(current),
      limit: String(pageSize),
    });
  };
  const handleEdite = (item: any) => {
    setUpdate(item);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setUpdate({});
  };
  const handleDetail = (id: number) => {
    navigate(`/product/${id}`);
  };
  const columns = [
    {
      title: "№",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      key: "key",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edite">
            <Button onClick={() => handleEdite(record)} icon={<EditOutlined />} />
          </Tooltip>
          <PopConfirmDelete id={record.id} deleteItem={() => mutate(record.id)} />
          <Tooltip title="Detail">
            <Button onClick={() => handleDetail(record.id)} icon={<EnterOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <DrawerModal open={open} handleCancel={handleCancel} update={update} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchInput params={params} setParams={setParams} />
        <Button onClick={() => setOpen(true)} type="primary" size="large">
          Add new Product
        </Button>
      </div>
      <div>
        <GlobalTable
          columns={columns}
          data={products}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: count,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
