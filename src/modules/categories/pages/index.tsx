import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCategoryQueries } from "../hooks/queries";
import CategpryModal from "./modal";
import { SearchInput, GlobalTable, PopConfirmDelete } from "@components";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";
import { CategoryValues } from "../types";
import { useDeleteMuattion } from "../hooks/mutations";

const CategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const navigate = useNavigate();
  const { mutate } = useDeleteMuattion();
  const { categories = [], count } = useCategoryQueries(params)?.data || {};
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
  const handleEdite = (item: CategoryValues) => {
    setUpdate(item);
    setOpen(true);
  };
  const handleSub = (id: number | string) => {
    navigate(`${id}`);
  };
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: any) => index + 1,
      width: 50,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edite">
            <Button onClick={() => handleEdite(record)} type="default" icon={<EditOutlined />} />
          </Tooltip>
          <PopConfirmDelete id={record.id} deleteItem={deleteItem} />
          <Tooltip title="Sub-category">
            <Button onClick={() => handleSub(record.id)} type="default" icon={<EnterOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <CategpryModal open={open} handleCancel={handleCancel} update={update} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <SearchInput params={params} setParams={setParams} />
        <Button onClick={() => setOpen(true)} size="large" type="primary">
          Add new Category
        </Button>
      </div>
      <div>
        <GlobalTable
          data={categories}
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

export default CategoriesPage;
