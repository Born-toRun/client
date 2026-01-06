"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetMyUserQuery, useUpdateUserMutation } from "@/hooks/useUser";
import { pageRoutes } from "@/constants/route";
import type { UserUpdateRequest } from "@/apis/users/types";

interface ProfileFormData {
  profileImageUri?: string;
  profileImageId?: number;
  instagramId?: string;
  // 프로필 이미지 변경 여부를 추적하기 위한 플래그
  profileImageChanged?: boolean;
}

/**
 * 인스타그램 URI에서 사용자 ID를 추출하는 유틸리티 함수
 * @param instagramUri - 인스타그램 프로필 URL (예: https://www.instagram.com/instagramId)
 * @returns 인스타그램 ID 또는 undefined
 */
const extractInstagramId = (instagramUri: string | undefined): string => {
  if (!instagramUri) return "";

  try {
    // URL 파싱
    const url = new URL(instagramUri);
    // 경로명에서 슬래시 제거 및 ID 추출
    const pathname = url.pathname.replace(/^\/|\/$/g, "");
    return pathname || "";
  } catch (error) {
    // URL 파싱 실패 시 빈 문자열 반환
    console.warn("인스타그램 URI 파싱 실패:", instagramUri, error);
    return "";
  }
};

/**
 * 프로필 수정 폼 커스텀 훅
 * 사용자 정보 수정 폼의 상태 관리 및 제출 로직을 담당합니다.
 */
export const useProfileForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 사용자 정보 조회 (GET /api/v1/users/my)
  const { data: myUser, isPending: isUserLoading } = useGetMyUserQuery();

  // 사용자 정보 수정 뮤테이션
  const updateUserMutation = useUpdateUserMutation();

  // React Hook Form 초기화
  const form = useForm<ProfileFormData>({
    mode: "onChange",
    defaultValues: {
      profileImageUri: "",
      profileImageId: undefined,
      instagramId: "",
      profileImageChanged: false,
    },
  });

  // 사용자 데이터가 로드되면 폼에 초기값 설정
  useEffect(() => {
    if (myUser) {
      // API 응답에서 instagramId를 직접 사용
      // instagramId가 없으면 instagramUri에서 추출 (하위 호환성)
      const instagramId =
        myUser.instagramId || extractInstagramId(myUser.instagramUri);

      form.reset({
        profileImageUri: myUser.profileImageUri || "",
        profileImageId: undefined, // 초기 로드 시 fileId는 undefined
        instagramId: instagramId,
        profileImageChanged: false, // 초기 로드 시 변경 없음
      });
    }
  }, [myUser, form]);

  // 폼 제출 핸들러
  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 인스타그램 ID에서 @ 제거 (있을 경우)
      const cleanedInstagramId = data.instagramId
        ? data.instagramId.replace(/^@/, "")
        : undefined;

      // 수정할 데이터 준비 (변경된 필드만 전송)
      const updateData: UserUpdateRequest = {};

      // 기존 인스타그램 ID 가져오기
      // API 응답에서 instagramId를 직접 사용, 없으면 instagramUri에서 추출
      const currentInstagramId =
        myUser?.instagramId || extractInstagramId(myUser?.instagramUri);

      // 프로필 이미지 처리
      // profileImageChanged가 true일 때만 API 요청에 포함
      if (data.profileImageChanged) {
        // 프로필 이미지를 새로 업로드했거나 삭제한 경우
        updateData.profileImageId = data.profileImageId || null;
      }
      // profileImageChanged가 false면 프로필 이미지는 변경하지 않음 (API 요청에 포함하지 않음)

      // 인스타그램 ID가 변경되었으면 포함
      if (cleanedInstagramId !== currentInstagramId) {
        updateData.instagramId = cleanedInstagramId;
      }

      // 변경사항이 없으면 API 호출 없이 돌아가기
      if (Object.keys(updateData).length === 0) {
        router.back();
        return;
      }

      // 사용자 정보 수정 API 호출
      await updateUserMutation.mutateAsync(updateData);

      // 성공 토스트 표시
      toast.success("프로필이 수정되었습니다.");

      // 성공 시 마이페이지로 이동
      router.push(pageRoutes.myPage.main);
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      const errorMsg = "프로필 수정에 실패했습니다. 다시 시도해주세요.";
      setErrorMessage(errorMsg);

      // 실패 토스트 표시
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting,
    errorMessage,
    isLoading: isUserLoading,
    myUser,
  };
};
