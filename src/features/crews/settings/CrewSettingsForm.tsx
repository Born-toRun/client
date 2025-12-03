"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Controller } from "react-hook-form";
import Button from "@/components/Button";
import CrewImageUpload from "./components/CrewImageUpload";
import { useCrewSettingsForm } from "./hooks/useCrewSettingsForm";
import { pageRoutes } from "@/constants/route";

/**
 * 크루 설정 폼 컴포넌트
 * 운영진 및 관리자가 크루 정보를 수정할 수 있는 폼입니다.
 */
export default function CrewSettingsForm() {
  const router = useRouter();
  const {
    form,
    onSubmit,
    isSubmitting,
    errorMessage,
    isLoading,
    isManager,
    crewId,
  } = useCrewSettingsForm();

  const {
    register,
    control,
    formState: { errors, isValid },
  } = form;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-n-500 body-md">로딩 중...</div>
      </div>
    );
  }

  // 권한이 없는 경우
  if (!isManager) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-n-500 body-md text-center">
          크루 설정은 운영진 및 관리자만 접근할 수 있습니다.
        </div>
        <Button
          onClick={() => router.push(pageRoutes.crews.detail(crewId))}
          variants="secondary"
          text="돌아가기"
          size="md"
          tone="gray"
        />
      </div>
    );
  }

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
          <h1 className="title-md text-n-900">크루 설정</h1>
          <div className="size-10" />
        </div>
      </header>

      {/* 본문 */}
      <main className="flex flex-col min-h-screen pt-14">
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto pb-24">
          <div className="px-4 py-6 flex flex-col gap-6">
            {/* 대표 이미지 업로드 */}
            <Controller
              name="imageId"
              control={control}
              render={({ field }) => (
                <CrewImageUpload
                  imageId={field.value}
                  imageUri={form.watch("imageUri")}
                  onChange={(imageId, imageUri) => {
                    field.onChange(imageId);
                    form.setValue("imageUri", imageUri);
                  }}
                  label="대표 이미지"
                  aspectRatio="16/9"
                  error={errors.imageId?.message}
                />
              )}
            />

            {/* 로고 이미지 업로드 */}
            <Controller
              name="logoId"
              control={control}
              render={({ field }) => (
                <CrewImageUpload
                  imageId={field.value}
                  imageUri={form.watch("logoUri")}
                  onChange={(logoId, logoUri) => {
                    field.onChange(logoId);
                    form.setValue("logoUri", logoUri);
                  }}
                  label="로고 이미지"
                  aspectRatio="1/1"
                  error={errors.logoId?.message}
                />
              )}
            />

            {/* 크루명 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="crewName" className="label-md text-black">
                크루명 <span className="text-system-r-400">*</span>
              </label>
              <input
                id="crewName"
                type="text"
                placeholder="크루 이름을 입력해주세요 (2자 이상)"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("name", {
                  required: "크루명은 필수입니다",
                  minLength: {
                    value: 2,
                    message: "크루명은 최소 2자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 50,
                    message: "크루명은 최대 50자까지 입력 가능합니다",
                  },
                })}
              />
              {errors.name && (
                <p className="text-system-r-400 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 활동 지역 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="region" className="label-md text-black">
                활동 지역 <span className="text-system-r-400">*</span>
              </label>
              <input
                id="region"
                type="text"
                placeholder="활동 지역을 입력해주세요"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("region", {
                  required: "활동 지역은 필수입니다",
                })}
              />
              {errors.region && (
                <p className="text-system-r-400 text-sm">
                  {errors.region.message}
                </p>
              )}
            </div>

            {/* 크루 소개 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contents" className="label-md text-black">
                크루 소개 <span className="text-system-r-400">*</span>
              </label>
              <textarea
                id="contents"
                placeholder="크루 소개를 입력해주세요 (10자 이상)"
                rows={8}
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400 resize-none"
                {...register("contents", {
                  required: "크루 소개는 필수입니다",
                  minLength: {
                    value: 10,
                    message: "크루 소개는 최소 10자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 2000,
                    message: "크루 소개는 최대 2000자까지 입력 가능합니다",
                  },
                })}
              />
              {errors.contents && (
                <p className="text-system-r-400 text-sm">
                  {errors.contents.message}
                </p>
              )}
            </div>

            {/* SNS URI */}
            <div className="flex flex-col gap-2">
              <label htmlFor="crewSnsUri" className="label-md text-black">
                크루 SNS 링크 <span className="text-n-200">(선택)</span>
              </label>
              <input
                id="crewSnsUri"
                type="url"
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("sns", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "올바른 URL 형식을 입력해주세요",
                  },
                })}
              />
              {errors.sns && (
                <p className="text-system-r-400 text-sm">
                  {errors.sns.message}
                </p>
              )}
              <p className="text-n-200 text-sm">
                인스타그램, 블로그 등 크루 SNS 링크를 입력해주세요
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

        {/* 저장 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-n-30 z-10">
          <div className="max-w-[786px] mx-auto">
            <Button
              onClick={onSubmit}
              variants="primary"
              text={isSubmitting ? "저장 중..." : "저장하기"}
              size="lg"
              tone="green"
              disabled={!isValid || isSubmitting}
            />
          </div>
        </div>
      </main>
    </>
  );
}
