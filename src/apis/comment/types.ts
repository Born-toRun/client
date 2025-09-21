export interface CommentListResponse {
  details: CommentDetail[];
}

export type Writer = {
  userId: number;
  userName: string;
  profileImageUri: string;
  crewName: string;
  isAdmin: boolean;
  isManager: boolean;
};

export interface CommentDetail {
  id: number;
  parentId: number | null;
  reCommentQty: number;
  writer: Writer;
  contents: string;
  registeredAt: string;
  isMyComment: boolean;
  isReComment: boolean;
}

// 댓글 등록 요청 타입
export interface CreateCommentRequest {
  parentCommentId?: number;
  contents: string;
}

// 댓글 상세 조회 응답 타입
export interface CommentDetailResponse {
  id: number;
  writer: Writer;
  contents: string;
  registeredAt: string;
  reComments: ReCommentDetail[];
}

export interface ReCommentDetail {
  id: number;
  contents: string;
  registeredAt: string;
  writer: Writer;
  isMyComment: boolean;
}

// 댓글 수정 요청 타입
export interface UpdateCommentRequest {
  contents: string;
}

// 댓글 수정 응답 타입
export interface UpdateCommentResponse {
  id: number;
  contents: string;
}

// 댓글 개수 조회 응답 타입
export interface CommentCountResponse {
  count: number;
}
