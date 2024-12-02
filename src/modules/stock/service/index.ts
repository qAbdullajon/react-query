import axiosInstatce from "@api";
import { StockType } from "../types";
import { ParamsType } from "@types";

export async function getStock(params: ParamsType) {
  const res = await axiosInstatce.get("/stock", { params });
  return res?.data?.data;
}

export async function createStock(data: StockType) {
  const res = await axiosInstatce.post("/stock/create", data);
  return res;
}

export async function updateStock(data: StockType) {
  const { id } = data;
  delete data.id;
  const res = await axiosInstatce.patch(`/stock/update/${id}`, data);
  return res;
}

export async function deleteStock(id: number) {
  const res = await axiosInstatce.delete(`/stock/delete/${id}`);
  return res;
}
