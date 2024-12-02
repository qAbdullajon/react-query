import { useMutation } from "@tanstack/react-query";
import { SignInValues, SignUpValues } from "../types";
import { signIn, signUp } from "../service";
import { Notification } from "@utils/notification";
import { saveAccessToken } from "@utils/token-service";

// ================== SIGN-IN ========================
export function useSignInMutation() {
  return useMutation({
    mutationFn: (data: SignInValues) => signIn(data),
    onMutate: () => console.log("Mutate"),
    onSuccess: (res) => {
      sessionStorage.setItem("autherId", res.data.data.data.id);
      const access_token = res.data.data.tokens.access_token;
      saveAccessToken(access_token);
      window.location.href = "/";
      Notification("success", "Successfully in login!", "");
    },
    onError: (error) => Notification("error", error?.message, ""),
  });
}

// ================== SIGN-UP ========================
export function useSignUpMutation() {
  return useMutation({
    mutationFn: (data: SignUpValues) => signUp(data),
    onMutate: () => console.log("Mutate"),
    onSuccess: () => {
      window.location.href = "/sign-in";
    },
    onError: (error) => Notification("error", error?.message, ""),
  });
}
