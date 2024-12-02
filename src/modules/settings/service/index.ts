import axiosInstatce from "@api";

// ========== GET Settings =================
export async function getSettings() {
  const id = sessionStorage.getItem("autherId");
  const res = await axiosInstatce.get(`/admin/${id}`);
  return res.data.data;
}

// ========== DELETE =================
export async function deleteSettings() {
  const id = sessionStorage.getItem("autherId");
  const res = await axiosInstatce.delete(`/admin/${id}`);
  return res;
}

// ========== UPDATE =================
export async function updateSettings(data: any) {
  const id = sessionStorage.getItem("autherId");
  const res = await axiosInstatce.patch(`/admin/${id}`, data);
  return res;
}
