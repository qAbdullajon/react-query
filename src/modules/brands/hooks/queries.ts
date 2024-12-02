import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrands, getCategory } from "../service";

export function useGetBrandsQuery(params: ParamsType) {
  return useQuery({
    queryKey: ["brand", params],
    queryFn: () => getBrands(params),
  });
}

export function useGetCategoryMutation() {
  return useQuery({
    queryKey: [],
    queryFn: () => getCategory(),
  });
}
