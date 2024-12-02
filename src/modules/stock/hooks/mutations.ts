import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getStock, createStock, deleteStock, updateStock } from "../service";
import { StockType } from "../types";
import { Notification } from "@utils/notification";

export function useCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StockType) => createStock(data),
    onSuccess: () => Notification("success", "Successfully in new stock", ""),
    onSettled: async (_: any, error) => {
      if (error) {
        Notification("error", error.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["stock"] });
      }
    },
  });
}

export function useUpdateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StockType) => updateStock(data),
    onSuccess: () => Notification("success", "Successfully in update stock", ""),
    onSettled: async (_: any, error) => {
      if (error) {
        Notification("error", error.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["stock"] });
      }
    },
  });
}

export function useDeleteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteStock(id),
    onSuccess: () => Notification("success", "Successfully in new stock", ""),
    onSettled: async (_: any, error) => {
      if (error) {
        Notification("error", error.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["stock"] });
      }
    },
  });
}
