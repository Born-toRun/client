import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import { CrewListResponse, SignupFormData } from "../types";

const getCrewList = async () => {
  const response = await runApi.get<CrewListResponse>(apiRoutes.crews.list);
  return response.data;
};

const signup = async (data: SignupFormData) => {
  const response = await runApi.put(apiRoutes.auth.signup, data);
  return response.data;
};

export { getCrewList, signup };
