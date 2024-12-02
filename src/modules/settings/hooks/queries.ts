import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../service";

export function useGetAdmin() {
  return useQuery({
    queryKey: ["queries"],
    queryFn: () => getSettings(),
  });
}
