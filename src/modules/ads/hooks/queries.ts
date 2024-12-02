import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getAds } from "../service";

export function useGetAdsQuery(params: ParamsType) {
  return useQuery({
    queryKey: ["ads", params],
    queryFn: () => getAds(params),
  });
}
