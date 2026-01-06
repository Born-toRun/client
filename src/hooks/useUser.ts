"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, getMyUser, updateUser, deleteUser } from "@/apis/users";
import type { UserUpdateRequest } from "@/apis/users/types";

/**
 * React Query 쿼리 키 상수
 */
export const userKeys = {
  all: ["user"] as const,
  detail: () => [...userKeys.all, "detail"] as const,
  myDetail: () => [...userKeys.all, "my"] as const,
};

/**
 * 사용자 정보 조회 쿼리 훅 (레거시)
 * @deprecated 대신 useGetMyUserQuery를 사용하세요
 * 현재 로그인한 사용자의 정보를 조회합니다.
 *
 * @example
 * ```tsx
 * const { data: user, isPending } = useGetUserQuery();
 * ```
 */
export const useGetUserQuery = () => {
  return useQuery({
    queryKey: userKeys.detail(),
    queryFn: getUser,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 내 정보 조회 쿼리 훅
 * 현재 로그인한 사용자의 상세 정보를 조회합니다.
 * 프로필 이미지와 인스타그램 URI를 포함합니다.
 *
 * @example
 * ```tsx
 * const { data: myUser, isPending } = useGetMyUserQuery();
 * ```
 */
export const useGetMyUserQuery = () => {
  return useQuery({
    queryKey: userKeys.myDetail(),
    queryFn: getMyUser,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 사용자 정보 수정 뮤테이션 훅
 * 프로필 이미지와 인스타그램 ID를 수정합니다.
 *
 * @example
 * ```tsx
 * const updateUserMutation = useUpdateUserMutation();
 *
 * const handleSubmit = async (data: UserUpdateRequest) => {
 *   await updateUserMutation.mutateAsync(data);
 * };
 * ```
 */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateRequest) => updateUser(data),
    onSuccess: () => {
      // 사용자 정보 쿼리 무효화하여 최신 데이터 다시 불러오기
      queryClient.invalidateQueries({ queryKey: userKeys.detail() });
      queryClient.invalidateQueries({ queryKey: userKeys.myDetail() });
    },
  });
};

/**
 * 회원탈퇴 뮤테이션 훅
 * 현재 로그인한 사용자의 계정을 삭제합니다.
 *
 * 주의사항:
 * - 탈퇴 후 모든 사용자 데이터가 삭제되며 복구할 수 없습니다.
 * - 탈퇴 성공 후 onSuccess 콜백에서 로그아웃 및 리다이렉트 처리가 필요합니다.
 * - 에러 발생 시 onError 콜백에서 적절한 에러 처리가 필요합니다.
 *
 * @example
 * ```tsx
 * const deleteUserMutation = useDeleteUserMutation();
 *
 * const handleWithdraw = async () => {
 *   try {
 *     await deleteUserMutation.mutateAsync();
 *     // 성공 처리: 토큰 삭제, 홈으로 리다이렉트 등
 *     TokenManager.removeAccessToken();
 *     router.push("/");
 *   } catch (error) {
 *     // 에러 처리
 *     toast.error("회원탈퇴에 실패했습니다.");
 *   }
 * };
 * ```
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // 모든 사용자 관련 쿼리 캐시 초기화
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.removeQueries({ queryKey: userKeys.all });
    },
  });
};
