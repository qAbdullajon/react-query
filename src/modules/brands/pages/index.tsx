import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { GlobalTable, PopConfirmDelete, SearchInput } from "@components";
import { useGetBrandsQuery } from "../hooks/queries";
import { Button, Space, Tooltip } from "antd";
import { BrandsType } from "../types";
import { useSearchParams } from "react-router-dom";
import ModalBrands from "./modal";
import { useDeleteBrandMutation } from "../hooks/mutations";

const BrandsPage = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const { brands = [], count } = useGetBrandsQuery(params)?.data || {};
  const { mutate } = useDeleteBrandMutation();
  const handleEdite = (item: BrandsType) => {
    setUpdate(item);
    setOpen(true);
  };
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
  const deleteItem = (id: string | number) => {
    mutate(id);
  };
  const handleCancel = () => {
    setOpen(false);
    setUpdate({});
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
          <PopConfirmDelete id={record.id} deleteItem={deleteItem} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <ModalBrands open={open} update={update} handleCancel={handleCancel} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchInput params={params} setParams={setParams} />
        <Button onClick={() => setOpen(true)} type="primary" size="large">
          Add new Brand
        </Button>
      </div>
      <div>
        <GlobalTable
          data={brands}
          columns={columns}
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

export default BrandsPage;
