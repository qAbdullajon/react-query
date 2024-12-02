import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetQueries } from "../hooks/queries";
import { GlobalTable, PopConfirmDelete, SearchInput } from "@components";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { SubCategoryType } from "../types";
import SubCategpryModal from "./modal";
import { useDeleteSubMutation } from "../hooks/mutations";
const SubCategory = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate } = useDeleteSubMutation();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const { subcategories = [], count } = useGetQueries(params, id)?.data || {};
  const handleEdite = (item: SubCategoryType) => {
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
    const { current = 1, pageSize = 5 } = pagination;
    setParams((prev) => ({ ...prev, page: current, limit: pageSize }));
    setSearchParams({
      page: String(current),
      limit: String(pageSize),
    });
  };
  const handleCancel = () => {
    setOpen(false);
    setUpdate({});
  };
  const deleteItem = (id: number | string) => {
    mutate(id);
  };
  const columns = [
    {
      title: "№",
      key: "index",
      render: (_: any, __: any, i: number) => i + 1,
      width: 50,
      align: "center",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edite">
            <Button onClick={() => handleEdite(record)} type="default" icon={<EditOutlined />} />
          </Tooltip>
          <PopConfirmDelete id={record.id} deleteItem={deleteItem} />
        </Space>
      ),
      width: 150,
    },
  ];
  return (
    <div>
      <SubCategpryModal open={open} handleCancel={handleCancel} update={update} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchInput params={params} setParams={setParams} />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setOpen(true), setUpdate({});
          }}
        >
          Add new Sub category
        </Button>
      </div>
      <div>
        <GlobalTable
          data={subcategories}
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

export default SubCategory;
