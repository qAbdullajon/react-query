import axiosInstatce from "@api";
import { SignInValues, SignUpValues } from "../types";

export async function signIn(data: SignInValues) {
  return await axiosInstatce.post("/auth/sign-in", data);
}

export async function signUp(data: SignUpValues) {
  return await axiosInstatce.post("/auth/admin/sign-up", data);
}
