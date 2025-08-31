// 좋아요 타입 정의
export type RecommendationType = "FEED" | "COMMENT";

// 좋아요 등록 응답 타입
export type CreateRecommendationResponse = Record<string, never>;

// 좋아요 취소 응답 타입
export type DeleteRecommendationResponse = Record<string, never>;
