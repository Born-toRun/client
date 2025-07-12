import { useQuery } from "@tanstack/react-query";
import { getCrewList } from "../api";
import { apiRoutes } from "@/constants/route";

export const useGetCrewListQuery = () => {
  return useQuery({
    queryKey: [apiRoutes.crews.list],
    queryFn: getCrewList,
  });
};
