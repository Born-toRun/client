"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Controller } from "react-hook-form";
import { useContactForm } from "./hooks/useContactForm";
import type { FeedbackType } from "@/apis/feedback/types";

/**
 * 피드백 유형 라벨 매핑
 */
const FEEDBACK_TYPE_LABELS: Record<FeedbackType, string> = {
  INQUIRY: "문의",
  BUG: "버그",
  IDEA: "아이디어",
};

/**
 * 개발자 문의 폼 컴포넌트
 * 사용자가 문의, 버그 리포트, 아이디어를 제출할 수 있는 폼입니다.
 */
export default function ContactForm() {
  const router = useRouter();
  const { form, onSubmit, isSubmitting, errorMessage } = useContactForm();

  const {
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = form;

  // 현재 입력된 내용의 길이 추적
  const content = watch("content");
  const contentLength = content?.length || 0;

  return (
    <>
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-n-30">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => router.back()}
            className="size-10 flex items-center justify-center"
            aria-label="뒤로가기"
            disabled={isSubmitting}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="title-md text-n-900">개발자 문의</h1>
          <button
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className="text-rg-400 body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "전송 중..." : "완료"}
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex flex-col min-h-screen pt-14">
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto pb-8">
          <div className="px-4 py-6 flex flex-col gap-6">
            {/* 피드백 유형 선택 */}
            <div className="flex flex-col gap-3">
              <label className="label-md text-black">
                문의 유형 <span className="text-system-r-400">*</span>
              </label>
              <Controller
                name="feedbackType"
                control={control}
                rules={{
                  required: "피드백 유형을 선택해주세요",
                }}
                render={({ field }) => (
                  <div className="flex gap-2">
                    {(Object.keys(FEEDBACK_TYPE_LABELS) as FeedbackType[]).map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => field.onChange(type)}
                          className={`flex-1 py-3 px-4 rounded-[8px] border transition-colors body-md font-medium ${
                            field.value === type
                              ? "border-rg-400 bg-rg-50 text-rg-400"
                              : "border-n-40 bg-white text-n-500"
                          }`}
                        >
                          {FEEDBACK_TYPE_LABELS[type]}
                        </button>
                      )
                    )}
                  </div>
                )}
              />
              {errors.feedbackType && (
                <p className="text-system-r-400 text-sm">
                  {errors.feedbackType.message}
                </p>
              )}
            </div>

            {/* 내용 입력 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="label-md text-black">
                내용 <span className="text-system-r-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="content"
                  placeholder="문의 내용을 입력해주세요 (최대 1000자)"
                  rows={10}
                  className={`w-full px-4 py-3 border rounded-[8px] body-md placeholder:text-n-200 focus:outline-none resize-none ${
                    errors.content
                      ? "border-system-r-400 focus:border-system-r-400"
                      : "border-n-40 focus:border-rg-400"
                  }`}
                  {...register("content", {
                    required: "내용을 입력해주세요",
                    maxLength: {
                      value: 1000,
                      message: "최대 1000자까지 입력 가능합니다",
                    },
                  })}
                />
                {/* 글자 수 카운터 */}
                <div className="absolute bottom-3 right-3">
                  <span
                    className={`text-sm ${
                      contentLength > 1000
                        ? "text-system-r-400"
                        : contentLength > 900
                          ? "text-system-y-400"
                          : "text-n-200"
                    }`}
                  >
                    {contentLength} / 1000
                  </span>
                </div>
              </div>
              {errors.content && (
                <p className="text-system-r-400 text-sm">
                  {errors.content.message}
                </p>
              )}
              <p className="text-n-200 text-sm">
                문의하신 내용은 검토 후 빠른 시일 내에 답변드리겠습니다.
              </p>
            </div>

            {/* 에러 메시지 */}
            {errorMessage && (
              <div className="p-4 bg-system-r-50 border border-system-r-200 rounded-lg">
                <p className="text-system-r-400 body-md">{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
