export interface CommentListResponse {
  details: CommentDetail[];
}

export interface CommentDetail {
  id: number;
  parentId: number | null;
  reCommentQty: number;
  writer: {
    userId: number;
    userName: string;
    profileImageUri: string;
    crewName: string;
    isAdmin: boolean;
    isManager: boolean;
  };
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
