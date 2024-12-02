import { useEffect, useState } from "react";
import SearchInput from "../../../components/search";
import { Button, Space, Tooltip } from "antd";
import GlobalTable from "../../../components/table";
import { EditOutlined } from "@ant-design/icons";
import PopConfirmDelete from "../../../components/confirm-delete";
import { useDeleteMutation } from "../hooks/mutations";
import { useGetStock } from "../hooks/queries";
import { useSearchParams } from "react-router-dom";
import ModalStock from "./modal";

const Stock = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    search: "",
  });
  const { stocks, count } = useGetStock(params).data || {};
  const [searchParams, setSearchParams] = useSearchParams();
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
  const { mutate } = useDeleteMutation();
  const deleteItem = (id: number) => {
    mutate(id);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleEdite = (item: any) => {
    setOpen(true);
    setUpdate(item);
  };
  const columns = [
    {
      title: "#",
      render: (_: any, __: any, i: number) => i + 1,
      key: "i",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="Edite">
            <Button onClick={() => handleEdite(record)} icon={<EditOutlined />} />
          </Tooltip>
          <PopConfirmDelete deleteItem={() => deleteItem(record.id)} id={record.id} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <ModalStock open={open} handleCancel={handleCancel} update={update} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchInput params={params} setParams={setParams} />
        <Button size="large" onClick={() => setOpen(true)} type="primary">
          Add new stock
        </Button>
      </div>
      <div>
        <GlobalTable
          data={stocks || []}
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

export default Stock;
