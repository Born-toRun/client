import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import { CrewListResponse } from "../types";

const getCrewList = async () => {
  const response = await runApi.get<CrewListResponse>(apiRoutes.crews.list);
  return response.data;
};

export { getCrewList };
