import axiosInstatce from "@api";
import { ParamsType } from "@types";
import { BrandsType } from "../types";

// ============== GET ======================
export async function getBrands(params: ParamsType) {
  const res = await axiosInstatce.get("/brand/search", { params });
  return res?.data?.data;
}

// ============== CREATE ====================
export async function createBrand(data: BrandsType) {
  const res = await axiosInstatce.post("/brand/create", data);
  return res;
}

// ============== UPDATE ====================
export async function updateBrand(data: BrandsType) {
  const { id } = data;
  delete data.id;
  const res = await axiosInstatce.patch(`/brand/update/${id}`, data);
  return res;
}

// ============== DELETE ====================
export async function deleteBrand(id: number | string) {
  const res = await axiosInstatce.delete(`/brand/delete/${id}`);
  return res;
}

// ============== GET ====================
export async function getCategory() {
  const res = await axiosInstatce.get("/category/search");
  return res.data.data;
}
