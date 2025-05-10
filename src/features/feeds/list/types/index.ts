import { feedCategoryLabel } from "./../../constants/index";
export interface FeedListParams {
  category?: FEEDCategory;
  searchKeyword?: string;
  isMyCrew: boolean;
  size?: number; // 쿼리스트링
  lastFeedId?: number; // 쿼리스트링
}

export interface FeedListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: FeedContent[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export type FeedContent = {
  id: number;
  imageUris: string[];
  contents: string;
  viewQty: number;
  recommendationQty: number;
  commentQty: number;
  registeredAt: string;
  writer: {
    userName: string;
    crewName: string;
    profileImageUri: string;
    isAdmin: boolean;
    isManager: boolean;
  };
  viewer: {
    hasMyRecommendation: boolean;
    hasMyComment: boolean;
  };
};
export type FEEDCategory = keyof typeof feedCategoryLabel;
