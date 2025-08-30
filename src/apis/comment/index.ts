import { runApi } from "@/client/runClient";
import { CommentListResponse } from "./types";
import { apiRoutes } from "@/constants/route";

const getCommentList = async (feedId: number): Promise<CommentListResponse> => {
  const response = await (
    await runApi.get(apiRoutes.comments.list(feedId))
  ).data;
  return response;
};

export { getCommentList };
