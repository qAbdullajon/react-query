import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand, updateBrand, deleteBrand } from "../service";
import { BrandsType } from "../types";
import { Notification } from "@utils/notification";

export function useCreateBrandMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createBrand(data),
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

export function useUpdateBrandMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BrandsType) => updateBrand(data),
    onSuccess: () => Notification("success", "Successfully in update brand", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brand"] });
      }
    },
  });
}

export function useDeleteBrandMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteBrand(id),
    onSuccess: () => Notification("success", "Successfully in delete brand", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brand"] });
      }
    },
  });
}
