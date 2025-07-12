import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";

const getCrewList = async () => {
  const response = await (await runApi.get(apiRoutes.crews.list)).data;
  return response;
};

export { getCrewList };
