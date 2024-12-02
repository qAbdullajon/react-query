import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getStock } from "../service";

export function useGetStock(params: ParamsType) {
  return useQuery({
    queryKey: ["stock", params],
    queryFn: () => getStock(params),
  });
}
