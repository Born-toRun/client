"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, getMyUser, updateUser } from "@/apis/users";
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
