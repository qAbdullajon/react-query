import { useQuery } from "@tanstack/react-query";
import { getSub } from "../service";
import { ParamsType } from "@types";

export function useGetQueries(params: ParamsType, id: any) {
  return useQuery({
    queryKey: ["subCategory", params],
    queryFn: () => getSub(params, id),
  });
}
