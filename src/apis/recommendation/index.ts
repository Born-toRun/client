import { runApi } from "@/client/runClient";
import {
  RecommendationType,
  CreateRecommendationResponse,
  DeleteRecommendationResponse,
} from "./types";
import { apiRoutes } from "@/constants/route";

// 좋아요 등록 API
export const createRecommendation = async (
  recommendationType: RecommendationType,
  contentId: number
): Promise<CreateRecommendationResponse> => {
  const response = await (
    await runApi.post(
      apiRoutes.recommendations.create(recommendationType, contentId)
    )
  ).data;
  return response;
};

// 좋아요 취소 API
export const deleteRecommendation = async (
  recommendationType: RecommendationType,
  contentId: number
): Promise<DeleteRecommendationResponse> => {
  const response = await (
    await runApi.delete(
      apiRoutes.recommendations.delete(recommendationType, contentId)
    )
  ).data;
  return response;
};
