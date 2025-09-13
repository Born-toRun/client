import { runApi } from "@/client/runClient";
import { CommentListResponse, CreateCommentRequest } from "./types";
import { apiRoutes } from "@/constants/route";

export const getCommentList = async (
  feedId: number
): Promise<CommentListResponse> => {
  const response = await (
    await runApi.get(apiRoutes.comments.list(feedId))
  ).data;
  return response;
};

// 댓글 등록 API
export const createComment = async (
  feedId: number,
  data: CreateCommentRequest
): Promise<void> => {
  const response = await (
    await runApi.post(apiRoutes.comments.create(feedId), data)
  ).data;
  return response;
};
