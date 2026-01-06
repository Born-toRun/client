import { useMutation } from "@tanstack/react-query";
import { createFeedback } from "..";
import type { CreateFeedbackRequest } from "../types";

/**
 * 피드백 등록 React Query 뮤테이션 훅
 *
 * @example
 * const createFeedbackMutation = useCreateFeedbackMutation();
 *
 * // 피드백 등록
 * await createFeedbackMutation.mutateAsync({
 *   feedbackType: "INQUIRY",
 *   content: "문의 내용입니다."
 * });
 */
export const useCreateFeedbackMutation = () => {
  return useMutation({
    mutationFn: (data: CreateFeedbackRequest) => createFeedback(data),
  });
};
