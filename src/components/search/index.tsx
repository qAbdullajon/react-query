import { ParamsType } from "@types";
import { Input } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SearchProps {
  params: ParamsType;
  setParams: (updater: (prevParams: any) => any) => void;
}

const SearchInput = ({ params, setParams }: SearchProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setParams((prev) => ({
      ...prev,
      search: newValue,
    }));
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("search", newValue);
    navigate(`?${searchParams.toString()}`);
  };
  return <Input placeholder="Search..." size="large" style={{ width: "300px" }} value={params.search} onChange={handleChange} />;
};

export default SearchInput;
