// 피드 수정 요청 타입
export interface UpdateFeedRequest {
  imageIds?: number[];
  contents: string;
  category: string;
  accessLevel: string;
}

// 피드 수정 응답 타입
export interface UpdateFeedResponse {
  // API 문서에 명시된 응답 필드가 없으므로 기본 응답 구조
  success: boolean;
  message?: string;
}

// 피드 삭제 응답 타입
export interface DeleteFeedResponse {
  // API 문서에 명시된 응답 필드가 없으므로 기본 응답 구조
  success: boolean;
  message?: string;
}
