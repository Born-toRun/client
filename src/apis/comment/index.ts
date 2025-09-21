import { runApi } from "@/client/runClient";
import {
  CommentListResponse,
  CreateCommentRequest,
  CommentDetailResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  CommentCountResponse,
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
  feedId: number,
  data: CreateCommentRequest
): Promise<void> => {
  const response = await (
    await runApi.post(apiRoutes.comments.create(feedId), data)
  ).data;
  return response;
};

// 댓글 상세 조회 API
export const getCommentDetail = async (
  commentId: number
): Promise<CommentDetailResponse> => {
  const response = await (
    await runApi.get(apiRoutes.comments.detail(commentId))
  ).data;
  return response;
};

// 댓글 삭제 API
export const deleteComment = async (commentId: number): Promise<void> => {
  await runApi.delete(apiRoutes.comments.delete(commentId));
};

// 댓글 수정 API
export const updateComment = async (
  commentId: number,
  data: UpdateCommentRequest
): Promise<UpdateCommentResponse> => {
  const response = await (
    await runApi.put(apiRoutes.comments.update(commentId), data)
  ).data;
  return response;
};

// 댓글 개수 조회 API
export const getCommentCount = async (
  feedId: number
): Promise<CommentCountResponse> => {
  const response = await (
    await runApi.get(apiRoutes.comments.count(feedId))
  ).data;
  return response;
};
