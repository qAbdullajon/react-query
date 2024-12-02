import { EditOutlined } from "@ant-design/icons";
import { GlobalTable, PopConfirmDelete, SearchInput } from "@components";
import { Button, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useGetBrandCategory } from "../hooks/queries";
import { useSearchParams } from "react-router-dom";
import CategpryModal from "./modal";
import { useDeleteMutation } from "../hooks/mutations";

const BrandCategoryPage = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const { brandCategories = [], count } = useGetBrandCategory(params).data || {};
  const { mutate } = useDeleteMutation();
  const deleteItem = (id: number | string) => {
    mutate(id);
    console.log(id);
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
  const handleCancel = () => {
    setOpen(false);
    setUpdate({});
  };
  const handleEdite = (item: any) => {
    console.log(item);
    setUpdate(item);
    setOpen(true);
  };
  const columns = [
    {
      title: "№",
      key: "index",
      render: (_: any, __: any, i: number) => i + 1,
      width: 60,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      render: (record: any) => (
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
      <CategpryModal open={open} handleCancel={handleCancel} update={update} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchInput params={params} setParams={setParams} />
        <Button onClick={() => setOpen(true)} type="primary" size="large">
          Add new Brand category
        </Button>
      </div>
      <div>
        <GlobalTable
          data={brandCategories}
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

export default BrandCategoryPage;
