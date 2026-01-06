import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import type {
  MarathonListParams,
  MarathonListResponse,
  MarathonDetail,
  BookmarkResponse,
} from "./types";

/**
 * 마라톤 목록 조회 API
 * @param params 조회 파라미터 (region, course, page, size)
 * @returns 마라톤 목록 및 페이지 정보
 */
export const getMarathonList = async (
  params: MarathonListParams
): Promise<MarathonListResponse> => {
  const response = await runApi.get<MarathonListResponse>(
    apiRoutes.marathons.list,
    {
      params,
    }
  );
  return response.data;
};

/**
 * 마라톤 북마크 추가 API
 * @param marathonId 마라톤 식별자
 * @returns 북마크 추가 결과
 */
export const addBookmark = async (
  marathonId: number
): Promise<BookmarkResponse> => {
  const response = await runApi.post<BookmarkResponse>(
    apiRoutes.marathons.bookmark(marathonId)
  );
  return response.data;
};

/**
 * 마라톤 북마크 취소 API
 * @param marathonId 마라톤 식별자
 * @returns 북마크 취소 결과
 */
export const removeBookmark = async (
  marathonId: number
): Promise<BookmarkResponse> => {
  const response = await runApi.delete<BookmarkResponse>(
    apiRoutes.marathons.bookmark(marathonId)
  );
  return response.data;
};

/**
 * 마라톤 상세 조회 API
 * @param marathonId 마라톤 식별자
 * @returns 마라톤 상세 정보
 */
export const getMarathonDetail = async (
  marathonId: number
): Promise<MarathonDetail> => {
  const response = await runApi.get<MarathonDetail>(
    apiRoutes.marathons.detail(marathonId)
  );
  return response.data;
};
