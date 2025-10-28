import { runApi } from "@/client/runClient";
import { apiRoutes } from "@/constants/route";
import type {
  ActivityListParams,
  ActivityListResponse,
  ActivityDetail,
  ParticipantsResponse,
  ParticipationResponse,
  CreateActivityRequest,
  CreateActivityResponse,
  UpdateActivityRequest,
  OpenActivityResponse,
} from "./types";

/**
 * 모임 목록 조회 API
 * @param params 조회 파라미터 (courses, recruitmentType)
 * @returns 모임 목록
 */
export const getActivityList = async (
  params: ActivityListParams
): Promise<ActivityListResponse> => {
  const response = await runApi.get<ActivityListResponse>(
    apiRoutes.activities.list,
    {
      params,
    }
  );
  return response.data;
};

/**
 * 크루별 모임 목록 조회 API
 * @param crewId 크루 식별자
 * @param params 조회 파라미터 (courses, recruitmentType)
 * @returns 크루의 모임 목록
 */
export const getCrewActivities = async (
  crewId: number,
  params?: ActivityListParams
): Promise<ActivityListResponse> => {
  const response = await runApi.get<ActivityListResponse>(
    apiRoutes.activities.crew(crewId),
    {
      params,
    }
  );
  return response.data;
};

/**
 * 모임 상세 조회 API
 * @param activityId 모임 식별자
 * @returns 모임 상세 정보
 */
export const getActivityDetail = async (
  activityId: number
): Promise<ActivityDetail> => {
  const response = await runApi.get<ActivityDetail>(
    apiRoutes.activities.detail(activityId)
  );
  return response.data;
};

/**
 * 참여자 목록 조회 API
 * @param activityId 모임 식별자
 * @returns 참여자 목록
 */
export const getParticipants = async (
  activityId: number
): Promise<ParticipantsResponse> => {
  const response = await runApi.get<ParticipantsResponse>(
    apiRoutes.activities.participants(activityId)
  );
  return response.data;
};

/**
 * 참여 예약 API
 * @param activityId 모임 식별자
 * @returns 참여 예약 결과
 */
export const joinActivity = async (
  activityId: number
): Promise<ParticipationResponse> => {
  const response = await runApi.post<ParticipationResponse>(
    apiRoutes.activities.join(activityId)
  );
  return response.data;
};

/**
 * 참여 취소 API
 * @param activityId 모임 식별자
 * @returns 참여 취소 결과
 */
export const cancelParticipation = async (
  activityId: number
): Promise<ParticipationResponse> => {
  const response = await runApi.post<ParticipationResponse>(
    apiRoutes.activities.cancel(activityId)
  );
  return response.data;
};

/**
 * 모임 취소(삭제) API
 * @param activityId 모임 식별자
 */
export const deleteActivity = async (activityId: number): Promise<void> => {
  await runApi.delete(apiRoutes.activities.delete(activityId));
};

/**
 * 모임 등록 API
 * @param data 모임 등록 데이터
 * @returns 생성된 모임 ID
 */
export const createActivity = async (
  data: CreateActivityRequest
): Promise<CreateActivityResponse> => {
  const response = await runApi.post<CreateActivityResponse>(
    apiRoutes.activities.list,
    data
  );
  return response.data;
};

/**
 * 모임 수정 API
 * @param activityId 모임 식별자
 * @param data 모임 수정 데이터
 */
export const updateActivity = async (
  activityId: number,
  data: UpdateActivityRequest
): Promise<void> => {
  await runApi.put(apiRoutes.activities.detail(activityId), data);
};

/**
 * 출석 코드 생성 API
 * @param activityId 모임 식별자
 * @returns 출석 코드 및 만료 시간
 */
export const openActivity = async (
  activityId: number
): Promise<OpenActivityResponse> => {
  const response = await runApi.put<OpenActivityResponse>(
    apiRoutes.activities.open(activityId)
  );
  return response.data;
};

/**
 * 출석 체크 API
 * @param activityId 모임 식별자
 * @param code 출석 코드
 */
export const checkAttendance = async (
  activityId: number,
  code: string
): Promise<void> => {
  await runApi.post(
    apiRoutes.activities.attendance(activityId),
    { code }
  );
};
