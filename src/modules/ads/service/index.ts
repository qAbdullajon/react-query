import axiosInstatce from "@api";
import { AdsDataType } from "../types";
import { ParamsType } from "@types";

// ================= GET =====================
export async function getAds(params: ParamsType) {
  const res = await axiosInstatce.get("/ads", { params });
  return res?.data.data;
}
// ================= CREATE =====================
export async function createAds(data: AdsDataType) {
  const res = await axiosInstatce.post("/ads/create", data);
  return res;
}
// ================= DELETE =====================
export async function deleteAds(id: number) {
  const res = await axiosInstatce.delete(`/ads/delete/${id}`);
  return res;
}
