import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrandCategorys, getBrands, getCategorys, getProduct } from "../service";

export function useGetProducts(params: ParamsType) {
  return useQuery({
    queryKey: ["queries", params],
    queryFn: () => getProduct(params),
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategorys(),
  });
}

export function useGetBrands(id: number) {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => getBrands(id),
  });
}

export function useGetBrandCategory(id: number) {
  return useQuery({
    queryKey: ["brandCategory", id],
    queryFn: () => getBrandCategorys(id),
  });
}
