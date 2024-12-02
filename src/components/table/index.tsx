import { Table } from "antd";
import type { TablePaginationConfig } from "antd";

interface TableType {
  columns: any[];
  data: any[];
  pagination: TablePaginationConfig;
  onChange: (pagination: TablePaginationConfig) => void;
}

const GlobalTable = ({ columns, data, pagination, onChange }: TableType) => {
  const new_data = data.map((item, i) => ({ ...item, key: i }));
  return (
    <Table
      dataSource={new_data}
      columns={columns}
      pagination={pagination}
      onChange={(pagination) => onChange(pagination)}
      rowKey={(record) => record.id || `${record.name}_${Math.random()}`} // Ensure a unique key
      bordered
      style={{ marginTop: "15px" }}
    />
  );
};

export default GlobalTable;
