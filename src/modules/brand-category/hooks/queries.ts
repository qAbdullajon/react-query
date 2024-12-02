import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrand, getBrandCategory } from "../service";
import { CategoryType } from "../types";

export function useGetBrandCategory(params: ParamsType) {
  return useQuery({
    queryKey: ["brandcategory", params],
    queryFn: () => getBrandCategory(params),
  });
}

export function useGetBrands() {
  return useQuery({
    queryKey: [],
    queryFn: () => getBrand(),
  });
}
