/**
 * Search feature type definitions
 */

/**
 * Response from GET /api/v1/recent-search-keywords
 */
export interface SearchHistoryResponse {
  searchKeywords: string[];
}

/**
 * Request body for POST /api/v1/recent-search-keywords/{keyword}
 */
export interface RegisterSearchKeywordParams {
  keyword: string;
}

/**
 * Request params for DELETE /api/v1/recent-search-keywords/{keyword}
 */
export interface DeleteSearchKeywordParams {
  keyword: string;
}
