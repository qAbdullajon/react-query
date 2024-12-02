import axiosInstatce from "@api";
import { ParamsType } from "@types";
import { SubCategoryType } from "../types";

// ============ GET =====================
export async function getSub(params: ParamsType, id: string | number) {
  const res = await axiosInstatce.get(`/sub-category/search/${id}`, { params });
  return res?.data?.data;
}

// ============ POST =====================
export async function createSub(data: SubCategoryType) {
  console.log(data);
  const res = await axiosInstatce.post("/sub-category/create", data);
  return res;
}
// ============ UPDATE =====================
export async function updateSub(data: SubCategoryType) {
  const { id } = data;
  delete data.id;
  const res = await axiosInstatce.patch(`/sub-category/update/${id}`, data);
  return res;
}

// ============ DELETE =====================
export async function deleteSub(id: number | string) {
  const res = await axiosInstatce.delete(`/sub-category/delete/${id}`);
  return res;
}
