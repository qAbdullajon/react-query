import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../service";
import { ParamsType } from "@types";

export function useGetDeteilQuery(id: number) {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => getDetail(id),
  });
}
