import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCategory, postCategory, updateCategory } from "../service";
import { CategoryValues } from "../types";
import { Notification } from "@utils/notification";

// ================= POST ===================
export function usePostCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryValues) => postCategory(data),
    onSuccess: () => {
      Notification("success", "Successfully in new Category!", "");
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });
}

// ================= UPDATE ===================
export function useUpdateCategpryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryValues) => updateCategory(data),
    onSuccess: () => Notification("success", "Successfully in update Category!", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });
}

// ================= DELETE ===================
export function useDeleteMuattion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteCategory(id),
    onSuccess: () => Notification("success", "Successfully in delete category!", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });
}
