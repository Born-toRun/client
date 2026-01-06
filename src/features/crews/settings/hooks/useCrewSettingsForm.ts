"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetCrewDetailQuery, useGetMyCrewQuery } from "../../hooks/queries";
import { useUpdateCrewMutation } from "../../hooks/mutations";
import { pageRoutes } from "@/constants/route";
import { useAuth } from "@/hooks/useAuth";

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
  const { isAuthenticated } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 크루 상세 정보 조회
  const { data: crew, isPending: isCrewLoading } = useGetCrewDetailQuery(crewId);

  // 내 크루 조회 (운영진 및 관리자 여부 확인용)
  const { data: myCrew, isPending: isMyCrewLoading } = useGetMyCrewQuery();

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

  // 디버깅: API 응답 및 권한 확인
  if (process.env.NODE_ENV === "development") {
    console.group("=== 크루 설정 페이지 권한 디버깅 ===");
    console.log("1. 인증 상태:", isAuthenticated);
    console.log("2. 내 크루 정보:", JSON.stringify(myCrew, null, 2));
    console.log("3. 현재 페이지 crewId:", crewId, `(타입: ${typeof crewId})`);

    if (myCrew) {
      console.log("4. 내 크루 ID:", myCrew.id, `(타입: ${typeof myCrew.id})`);
      console.log("5. ID 일치 여부:", {
        "엄격한 비교 (===)": myCrew.id === crewId,
        "느슨한 비교 (==)": myCrew.id == crewId,
      });
      console.log("6. 권한 정보:", {
        isManager: myCrew.isManager,
        isAdmin: myCrew.isAdmin,
        "isManager 타입": typeof myCrew.isManager,
        "isAdmin 타입": typeof myCrew.isAdmin,
      });
    }
    console.groupEnd();
  }

  // 현재 사용자가 이 크루의 운영진 또는 관리자인지 확인
  // 조건: 로그인 상태 && 내 크루가 존재 && 현재 크루 ID와 일치 && (운영진 권한 또는 관리자 권한 보유)
  const isManager =
    isAuthenticated &&
    myCrew != null &&
    myCrew.id === crewId &&
    (myCrew.isManager === true || myCrew.isAdmin === true);

  if (process.env.NODE_ENV === "development") {
    console.log("7. 최종 권한 확인 결과:", isManager);
  }

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
    isLoading: isCrewLoading || isMyCrewLoading,
    isManager,
    crew,
    crewId,
  };
};
