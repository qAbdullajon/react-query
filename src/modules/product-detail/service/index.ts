import axiosInstatce from "@api";
import { DetailTypes } from "../types";

export async function getDetail(id: number) {
  const res = await axiosInstatce.get(`/products/${id}`);
  return res.data.data;
}
export async function createDetail(data: DetailTypes) {
  const res = await axiosInstatce.post("/product-detail/create", data);
  return res;
}
export async function updateDetail(data: DetailTypes) {
  const { id } = data;
  delete data.id;
  console.log(data);
  const res = await axiosInstatce.patch(`/product-detail/update/${id}`, data);
  return res;
}

export async function deleteDetail(id: number) {
  const res = await axiosInstatce.delete(`/product-detail/delete/${id}`);
  return res;
}
