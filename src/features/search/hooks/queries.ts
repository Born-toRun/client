import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSearchHistory,
  registerSearchKeyword,
  deleteSearchKeyword,
  deleteAllSearchKeywords,
} from "../api";
import {
  RegisterSearchKeywordParams,
  DeleteSearchKeywordParams,
  SearchHistoryResponse,
} from "../types";

/**
 * Query key for search history
 */
const SEARCH_HISTORY_KEY = ["searchHistory"] as const;

/**
 * 최근 검색어 조회 훅
 * @param enabled - Query 활성화 여부 (기본: true)
 */
export const useSearchHistoryQuery = (enabled: boolean = true) => {
  return useQuery<SearchHistoryResponse, Error>({
    queryKey: SEARCH_HISTORY_KEY,
    queryFn: getSearchHistory,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

/**
 * 최근 검색어 등록 훅
 */
export const useRegisterSearchKeywordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, RegisterSearchKeywordParams>({
    mutationFn: registerSearchKeyword,
    onSuccess: () => {
      // 검색어 등록 후 목록 갱신
      queryClient.invalidateQueries({ queryKey: SEARCH_HISTORY_KEY });
    },
  });
};

/**
 * 최근 검색어 삭제 훅
 */
export const useDeleteSearchKeywordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteSearchKeywordParams>({
    mutationFn: deleteSearchKeyword,
    onSuccess: () => {
      // 검색어 삭제 후 목록 갱신
      queryClient.invalidateQueries({ queryKey: SEARCH_HISTORY_KEY });
    },
  });
};

/**
 * 최근 검색어 일괄 삭제 훅
 */
export const useDeleteAllSearchKeywordsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: deleteAllSearchKeywords,
    onSuccess: () => {
      // 전체 삭제 후 목록 갱신
      queryClient.invalidateQueries({ queryKey: SEARCH_HISTORY_KEY });
    },
  });
};
