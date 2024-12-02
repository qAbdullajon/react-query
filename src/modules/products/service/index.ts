import axiosInstatce from "@api";
import { ParamsType } from "@types";
import { DataType } from "../types";
// ========== GET PRODUCTS =================
export async function getProduct(params: ParamsType) {
  const res = await axiosInstatce.get("/products/search", { params });
  return res.data.data;
}

// ========== GET CATEGORIES =================
export async function getCategorys() {
  const res = await axiosInstatce.get("/category/search");
  return res.data.data;
}

// ========== GET BRANDS =================
export async function getBrands(id: number) {
  const res = await axiosInstatce.get(`/brand/category/${id}`);
  return res.data.data;
}

// ========== GET BRAND CATEGORYS =================
export async function getBrandCategorys(id: number) {
  const res = await axiosInstatce.get(`/brand-category/brand/${id}`);
  return res.data.data;
}

// ========== POST =================
export async function createProduct(data: DataType) {
  const res = await axiosInstatce.post("/products/create", data);
  console.log(res);
}

// ========== UPDATE =================
export async function updateProducts(data: DataType) {
  const { id } = data;
  delete data.id;
  const res = await axiosInstatce.patch(`/products/update/${id}`, data);
  return res;
}

// ========== DELETE =================
export async function deleteProducts(id: number | string) {
  const res = await axiosInstatce.delete(`/products/delete/${id}`);
  return res;
}
