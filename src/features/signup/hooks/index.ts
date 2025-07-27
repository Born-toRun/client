import { useMutation, useQuery } from "@tanstack/react-query";
import { getCrewList, signup } from "../api";
import { apiRoutes } from "@/constants/route";

export const useGetCrewListQuery = () => {
  return useQuery({
    queryKey: [apiRoutes.crews.list],
    queryFn: getCrewList,
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
  });
};
