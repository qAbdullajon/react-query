import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSub, deleteSub, updateSub } from "../service";
import { SubCategoryType } from "../types";
import { Notification } from "@utils/notification";

export function usePostSubMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubCategoryType) => createSub(data),
    onSuccess: () => {
      Notification("success", "Successfully in new subcategory", "");
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      }
    },
  });
}

export function useUpdateSubMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubCategoryType) => updateSub(data),
    onSuccess: () => {
      Notification("success", "Successfully in update subcategory!", "");
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      }
    },
  });
}

export function useDeleteSubMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteSub(id),
    onSuccess: () => Notification("success", "Successfully in delete", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      }
    },
  });
}
