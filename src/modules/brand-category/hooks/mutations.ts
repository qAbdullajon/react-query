import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CategoryType } from "../types";
import { deleteCategory, postBrandCategory, updateCategory } from "../service";
import { Notification } from "@utils/notification";

export function useCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryType) => postBrandCategory(data),
    onSuccess: () => Notification("success", "Successfully in new brand category", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brandcategory"] });
      }
    },
  });
}

export function useUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryType) => updateCategory(data),
    onSuccess: () => Notification("success", "Successfully in update brand category", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brandcategory"] });
      }
    },
  });
}
export function useDeleteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteCategory(id),
    onSuccess: () => Notification("success", "Successfully delete", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["brandcategory"] });
      }
    },
  });
}
