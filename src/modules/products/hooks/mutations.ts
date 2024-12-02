import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataType } from "../types";
import { createProduct, deleteProducts, updateProducts } from "../service";
import { Notification } from "@utils/notification";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createProduct(data),
    onSuccess: () => Notification("success", "Successfully in new products", ""),
    onSettled: (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({
          queryKey: ["queries"],
        });
      }
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DataType) => updateProducts(data),
    onSuccess: () => Notification("success", "Successfully in update products", ""),
    onSettled: (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({
          queryKey: ["queries"],
        });
      }
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => deleteProducts(id),
    onSuccess: () => Notification("success", "Successfully in delete products", ""),
    onSettled: (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({
          queryKey: ["queries"],
        });
      }
    },
  });
}
