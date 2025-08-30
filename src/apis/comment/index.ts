import { runApi } from "@/client/runClient";
import {
  CommentListResponse,
  CreateCommentRequest,
  CreateCommentResponse,
} from "./types";
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
  commentId: number,
  data: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  const response = await (
    await runApi.put(apiRoutes.comments.create(commentId), data)
  ).data;
  return response;
};
