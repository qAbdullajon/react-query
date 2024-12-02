import axiosInstatce from "@api";
import { ParamsType } from "@types";
import { CategoryType } from "../types";

// =========== GET =========================
export async function getBrandCategory(params: ParamsType) {
  const res = await axiosInstatce.get("/brand-category/search", { params });
  return res?.data?.data;
}

// =========== GET =========================
export async function getBrand() {
  const res = await axiosInstatce.get("/brand/search");
  return res?.data?.data;
}

// =========== POST =========================
export async function postBrandCategory(data: CategoryType) {
  const res = await axiosInstatce.post("/brand-category/create", data);
  return res;
}

// =========== UPDATE =========================
export async function updateCategory(data: CategoryType) {
  const { id } = data;
  delete data.id;
  const res = await axiosInstatce.patch(`/brand-category/update/${id}`, data);
  return res;
}

// =========== DELETE =========================
export async function deleteCategory(id: number | string) {
  const res = await axiosInstatce.delete(`/brand-category/delete/${id}`);
  return res;
}
