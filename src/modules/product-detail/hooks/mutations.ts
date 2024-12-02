import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "@utils/notification";
import { createDetail, deleteDetail, updateDetail } from "../service";

export function useCreateDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createDetail(data),
    onSuccess: () => Notification("success", "Successfully in new brand", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brand"] });
      }
    },
  });
}

export function useDeleteDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDetail(id),
    onSuccess: () => Notification("success", "Successfully in new brand", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brand"] });
      }
    },
  });
}
export function useUpdateDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateDetail(data),
    onSuccess: () => Notification("success", "Successfully in new brand", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brand"] });
      }
    },
  });
}
