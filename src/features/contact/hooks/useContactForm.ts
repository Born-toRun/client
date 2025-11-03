"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateFeedbackMutation } from "@/apis/feedback/hooks/useCreateFeedback";
import { pageRoutes } from "@/constants/route";
import type { FeedbackType } from "@/apis/feedback/types";

/**
 * 문의 폼 데이터 인터페이스
 */
export interface ContactFormData {
  /**
   * 피드백 유형 (문의/버그/아이디어)
   */
  feedbackType: FeedbackType;
  /**
   * 피드백 내용 (최대 1000자)
   */
  content: string;
}

/**
 * 개발자 문의 폼 커스텀 훅
 * React Hook Form과 React Query를 사용한 폼 상태 관리 및 제출 로직
 */
export const useContactForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 피드백 등록 뮤테이션
  const createFeedbackMutation = useCreateFeedbackMutation();

  // React Hook Form 초기화
  const form = useForm<ContactFormData>({
    mode: "onChange",
    defaultValues: {
      feedbackType: undefined,
      content: "",
    },
  });

  // 폼 제출 핸들러
  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 피드백 등록 API 호출
      await createFeedbackMutation.mutateAsync({
        feedbackType: data.feedbackType,
        content: data.content,
      });

      // 성공 토스트 표시
      toast.success("문의가 성공적으로 전송되었습니다.");

      // 폼 초기화
      form.reset();

      // 성공 시 마이페이지로 이동
      router.push(pageRoutes.myPage.main);
    } catch (error) {
      console.error("문의 전송 실패:", error);
      const errorMsg = "문의 전송에 실패했습니다. 다시 시도해주세요.";
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
  };
};
