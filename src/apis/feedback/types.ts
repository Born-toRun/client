/**
 * Feedback API Types
 * API Documentation: https://born-torun.github.io/api-kotlin Section 13.1
 */

/**
 * Feedback 유형
 * - INQUIRY: 문의
 * - BUG: 버그 리포트
 * - IDEA: 아이디어 제안
 */
export type FeedbackType = "INQUIRY" | "BUG" | "IDEA";

/**
 * Feedback 생성 요청 타입
 */
export interface CreateFeedbackRequest {
  /**
   * 피드백 유형
   */
  feedbackType: FeedbackType;
  /**
   * 피드백 내용 (최대 1000자)
   */
  content: string;
}
