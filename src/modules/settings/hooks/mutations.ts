import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "@utils/notification";
import { deleteSettings, updateSettings } from "../service";

export function useDeleteSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteSettings(),
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

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateSettings(data),
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
