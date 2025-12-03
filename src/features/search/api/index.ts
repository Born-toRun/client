import { runApi } from "@/client/runClient";
import {
  SearchHistoryResponse,
  RegisterSearchKeywordParams,
  DeleteSearchKeywordParams,
} from "../types";

/**
 * 최근 검색어 조회 API
 * GET /api/v1/recent-search-keywords
 * @returns 최근 검색어 목록
 */
export const getSearchHistory = async (): Promise<SearchHistoryResponse> => {
  const { data } = await runApi.get<SearchHistoryResponse>(
    "/api/v1/recent-search-keywords"
  );
  return data;
};

/**
 * 최근 검색어 등록 API
 * POST /api/v1/recent-search-keywords/{keyword}
 * @param params - 등록할 검색어
 */
export const registerSearchKeyword = async (
  params: RegisterSearchKeywordParams
): Promise<void> => {
  await runApi.post(`/api/v1/recent-search-keywords/${encodeURIComponent(params.keyword)}`);
};

/**
 * 최근 검색어 삭제 API
 * DELETE /api/v1/recent-search-keywords/{keyword}
 * @param params - 삭제할 검색어
 */
export const deleteSearchKeyword = async (
  params: DeleteSearchKeywordParams
): Promise<void> => {
  await runApi.delete(`/api/v1/recent-search-keywords/${encodeURIComponent(params.keyword)}`);
};

/**
 * 최근 검색어 일괄 삭제 API
 * DELETE /api/v1/recent-search-keywords
 */
export const deleteAllSearchKeywords = async (): Promise<void> => {
  await runApi.delete("/api/v1/recent-search-keywords");
};
