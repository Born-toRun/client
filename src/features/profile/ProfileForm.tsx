"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Controller } from "react-hook-form";
import ProfileImageUpload from "./components/ProfileImageUpload";
import { useProfileForm } from "./hooks/useProfileForm";

/**
 * 프로필 수정 폼 컴포넌트
 * 사용자 프로필 이미지와 인스타그램 ID를 수정할 수 있는 폼입니다.
 */
export default function ProfileForm() {
  const router = useRouter();
  const { form, onSubmit, isSubmitting, errorMessage, isLoading } =
    useProfileForm();

  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = form;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-n-500 body-md">로딩 중...</div>
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
          <h1 className="title-md text-n-900">프로필 수정</h1>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="text-rg-400 body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex flex-col min-h-screen pt-14">
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto pb-8">
          <div className="px-4 py-6 flex flex-col gap-8">
            {/* 프로필 이미지 업로드 */}
            <Controller
              name="profileImageUri"
              control={control}
              render={({ field }) => (
                <ProfileImageUpload
                  value={field.value || ""}
                  onChange={(imageUri, fileId) => {
                    field.onChange(imageUri);
                    if (fileId) {
                      setValue("profileImageId", fileId);
                    }
                  }}
                  error={errors.profileImageUri?.message}
                />
              )}
            />

            {/* 구분선 */}
            <div className="h-px bg-n-30" />

            {/* 인스타그램 ID */}
            <div className="flex flex-col gap-2">
              <label htmlFor="instagramId" className="label-md text-black">
                인스타그램 ID <span className="text-n-200">(선택)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-n-500 body-md">
                  @
                </span>
                <input
                  id="instagramId"
                  type="text"
                  placeholder="instagram_id"
                  className="w-full pl-8 pr-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                  {...register("instagramId", {
                    pattern: {
                      value: /^@?[a-zA-Z0-9._]+$/,
                      message:
                        "영문, 숫자, 마침표(.), 밑줄(_)만 사용 가능합니다",
                    },
                    maxLength: {
                      value: 30,
                      message: "인스타그램 ID는 최대 30자까지 입력 가능합니다",
                    },
                  })}
                />
              </div>
              {errors.instagramId && (
                <p className="text-system-r-400 text-sm">
                  {errors.instagramId.message}
                </p>
              )}
              <p className="text-n-200 text-sm">
                인스타그램 ID를 입력하면 프로필에 표시됩니다
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
