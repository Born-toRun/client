import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import { CreateFeedbackRequest } from "./types";

/**
 * 피드백 등록 API
 * POST /api/v1/feedbacks
 *
 * @param data - 피드백 등록 요청 데이터
 * @returns void (201 Created, no response body)
 */
export const createFeedback = async (
  data: CreateFeedbackRequest
): Promise<void> => {
  await runApi.post(apiRoutes.feedbacks.create, data);
};
