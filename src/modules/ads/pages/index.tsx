import { useEffect, useState } from "react";
import SearchInput from "../../../components/search";
import { Button, Image, Space, Tooltip } from "antd";
import GlobalTable from "../../../components/table";
import { useGetAdsQuery } from "../hooks/queries";
import { useSearchParams } from "react-router-dom";
import PopConfirmDelete from "../../../components/confirm-delete";
import { useDeleteAdsMutation } from "../hooks/mutations";
import ModalAds from "./modal";

const AdsPage = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    search: "",
  });
  const { data } = useGetAdsQuery(params) || {};
  const { mutate } = useDeleteAdsMutation();
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
  const deleteItem = (id: number | string) => {
    mutate(id);
  };
  const handleCansel = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "№",
      key: "i",
      render: (_: any, __: any, i: number) => i + 1,
    },
    {
      title: "Image",
      render: (record: any) => <Image src={record?.image} />,

      key: "image",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <PopConfirmDelete id={record.id} deleteItem={deleteItem} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <ModalAds open={open} handleCancel={handleCansel} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchInput params={params} setParams={setParams} />
        <Button onClick={() => setOpen(true)} type="primary" size="large">
          Add new Ads
        </Button>
      </div>
      <div>
        <GlobalTable
          data={data || []}
          columns={columns}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: data?.length,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default AdsPage;
