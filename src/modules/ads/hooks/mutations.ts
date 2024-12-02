import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAds, deleteAds } from "../service";
import { Notification } from "@utils/notification";

export function useCreateAdsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createAds(data),
    onSuccess: () => Notification("success", "Successfully in new ads", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["ads"] });
      }
    },
  });
}

export function useDeleteAdsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => deleteAds(data),
    onSuccess: () => Notification("success", "Successfully in update ads", ""),
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message, "");
      } else {
        queryClient.invalidateQueries({ queryKey: ["ads"] });
      }
    },
  });
}
