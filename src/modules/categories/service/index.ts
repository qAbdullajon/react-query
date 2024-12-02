import axiosInstatce from "@api";
import { ParamsType } from "@types";
import { CategoryValues } from "../types";

// ====================== GET CATEGORY ==========================
export async function getCategory(params: ParamsType) {
  const res = await axiosInstatce.get("/category/search", { params });
  return res.data.data;
}

// ======================= POST CATEGORY ===============================
export async function postCategory(data: CategoryValues) {
  const res = await axiosInstatce.post("/category/create", data);
  return res;
}

// ======================= UPDATE ==================
export async function updateCategory(data: CategoryValues) {
  const { id } = data;
  delete data.id;
  const res = await axiosInstatce.patch(`/category/update/${id}`, data);
  return res;
}

// ========================= DELETE ===================
export async function deleteCategory(id: number | string) {
  const res = await axiosInstatce.delete(`/category/delete/${id}`);
  return res;
}
