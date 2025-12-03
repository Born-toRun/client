"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetCrewDetailQuery, useGetCrewMembersQuery } from "../../hooks/queries";
import { useUpdateCrewMutation } from "../../hooks/mutations";
import { pageRoutes } from "@/constants/route";
import type { CrewUpdateRequest } from "../../types";

interface CrewSettingsFormData {
  name: string;
  region: string;
  contents: string;
  sns?: string;
  imageId?: number;
  logoId?: number;
  imageUri?: string; // 미리보기용
  logoUri?: string;  // 미리보기용
}

/**
 * 크루 설정 폼 커스텀 훅
 * 운영진 및 관리자를 위한 크루 정보 수정 폼의 상태 관리 및 제출 로직을 담당합니다.
 */
export const useCrewSettingsForm = () => {
  const params = useParams();
  const router = useRouter();
  const crewId = Number(params.crewId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 크루 상세 정보 조회
  const { data: crew, isPending: isCrewLoading } = useGetCrewDetailQuery(crewId);

  // 크루 멤버 목록 조회 (권한 확인용)
  const { data: membersData, isPending: isMembersLoading } = useGetCrewMembersQuery(crewId);

  // 크루 수정 뮤테이션
  const updateCrewMutation = useUpdateCrewMutation();

  // React Hook Form 초기화
  const form = useForm<CrewSettingsFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      region: "",
      contents: "",
      sns: "",
      imageId: undefined,
      logoId: undefined,
      imageUri: "",
      logoUri: "",
    },
  });

  // 크루 데이터가 로드되면 폼에 초기값 설정
  useEffect(() => {
    if (crew) {
      form.reset({
        name: crew.crewName,
        region: crew.region,
        contents: crew.contents,
        sns: crew.crewSnsUri || "",
        imageId: undefined,
        logoId: undefined,
        imageUri: crew.imageUri || "",
        logoUri: crew.logoUri || "",
      });
    }
  }, [crew, form]);

  // 운영진 또는 관리자 권한 확인
  const isManager = membersData?.members.some((member) => member.isManager || member.isAdmin) || false;

  // 폼 제출 핸들러
  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 크루 수정 API 호출
      await updateCrewMutation.mutateAsync({
        crewId,
        data: {
          name: data.name,
          region: data.region,
          contents: data.contents,
          sns: data.sns || undefined,
          imageId: data.imageId || undefined,
          logoId: data.logoId || undefined,
        },
      });

      // 성공 시 크루 상세 페이지로 이동
      router.push(pageRoutes.crews.detail(crewId));
    } catch (error) {
      console.error("크루 수정 실패:", error);
      setErrorMessage("크루 정보 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting,
    errorMessage,
    isLoading: isCrewLoading || isMembersLoading,
    isManager,
    crew,
    crewId,
  };
};
