"use client";

import { Controller } from "react-hook-form";
import ActivityFormHeader from "./components/ActivityFormHeader";
import CourseSelector from "./components/CourseSelector";
import ImageUpload from "./components/ImageUpload";
import SubmitButton from "./components/SubmitButton";
import { useActivityForm } from "./hooks/useActivityForm";
import type { ActivityFormMode } from "./types";
import type { ActivityDetail } from "@/apis/activity/types";

interface ActivityFormProps {
  mode: ActivityFormMode;
  activityId?: number;
  initialData?: ActivityDetail;
}

/**
 * 모임 등록/수정 폼 컴포넌트
 */
export default function ActivityForm({
  mode,
  activityId,
  initialData,
}: ActivityFormProps) {
  const { form, onSubmit, isSubmitting } = useActivityForm({
    mode,
    activityId,
    initialData,
  });

  const {
    register,
    control,
    formState: { errors, isValid },
  } = form;

  return (
    <>
      <ActivityFormHeader
        title={mode === "create" ? "모임 만들기" : "모임 수정"}
        isSubmitting={isSubmitting}
      />
      <main className="flex flex-col h-screen pt-14 pb-4">
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 pb-[140px] flex flex-col gap-6">
            {/* 이미지 업로드 */}
            <Controller
              name="imageIds"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.imageIds?.message}
                />
              )}
            />

            {/* 제목 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="label-md text-black">
                제목 <span className="text-system-r-400">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="모임 제목을 입력해주세요 (2-50자)"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("title", {
                  required: "제목은 필수입니다",
                  minLength: {
                    value: 2,
                    message: "제목은 최소 2자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 50,
                    message: "제목은 최대 50자까지 입력 가능합니다",
                  },
                })}
              />
              {errors.title && (
                <p className="text-system-r-400 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* 내용 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contents" className="label-md text-black">
                내용 <span className="text-system-r-400">*</span>
              </label>
              <textarea
                id="contents"
                placeholder="모임 내용을 입력해주세요 (10-2000자)"
                rows={6}
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400 resize-none"
                {...register("contents", {
                  required: "내용은 필수입니다",
                  minLength: {
                    value: 10,
                    message: "내용은 최소 10자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 2000,
                    message: "내용은 최대 2000자까지 입력 가능합니다",
                  },
                })}
              />
              {errors.contents && (
                <p className="text-system-r-400 text-sm">
                  {errors.contents.message}
                </p>
              )}
            </div>

            {/* 시작 일시 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="startAt" className="label-md text-black">
                시작 일시 <span className="text-system-r-400">*</span>
              </label>
              <input
                id="startAt"
                type="datetime-local"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md focus:outline-none focus:border-rg-400"
                {...register("startAt", {
                  required: "시작 일시는 필수입니다",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const now = new Date();
                    return (
                      selectedDate > now ||
                      "시작 일시는 현재 시간 이후여야 합니다"
                    );
                  },
                })}
              />
              {errors.startAt && (
                <p className="text-system-r-400 text-sm">
                  {errors.startAt.message}
                </p>
              )}
            </div>

            {/* 장소 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="venue" className="label-md text-black">
                장소 <span className="text-system-r-400">*</span>
              </label>
              <input
                id="venue"
                type="text"
                placeholder="장소를 입력해주세요"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("venue", {
                  required: "장소는 필수입니다",
                })}
              />
              {errors.venue && (
                <p className="text-system-r-400 text-sm">
                  {errors.venue.message}
                </p>
              )}
            </div>

            {/* 장소 URL */}
            <div className="flex flex-col gap-2">
              <label htmlFor="venueUrl" className="label-md text-black">
                장소 URL (지도 링크) <span className="text-system-r-400">*</span>
              </label>
              <input
                id="venueUrl"
                type="url"
                placeholder="https://map.naver.com/..."
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("venueUrl", {
                  required: "장소 URL은 필수입니다",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "올바른 URL 형식을 입력해주세요",
                  },
                })}
              />
              {errors.venueUrl && (
                <p className="text-system-r-400 text-sm">
                  {errors.venueUrl.message}
                </p>
              )}
            </div>

            {/* 코스 */}
            <Controller
              name="course"
              control={control}
              rules={{ required: "코스는 필수입니다" }}
              render={({ field }) => (
                <CourseSelector
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.course?.message}
                />
              )}
            />

            {/* 코스 설명 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="courseDetail" className="label-md text-black">
                코스 설명 (선택)
              </label>
              <input
                id="courseDetail"
                type="text"
                placeholder="코스에 대한 추가 설명을 입력해주세요"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("courseDetail")}
              />
            </div>

            {/* 모집 인원 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="participantsLimit" className="label-md text-black">
                모집 인원 <span className="text-system-r-400">*</span>
              </label>
              <input
                id="participantsLimit"
                type="number"
                min="2"
                max="50"
                placeholder="2-50명"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("participantsLimit", {
                  required: "모집 인원은 필수입니다",
                  valueAsNumber: true,
                  min: {
                    value: 2,
                    message: "최소 2명 이상이어야 합니다",
                  },
                  max: {
                    value: 50,
                    message: "최대 50명까지 모집 가능합니다",
                  },
                })}
              />
              {errors.participantsLimit && (
                <p className="text-system-r-400 text-sm">
                  {errors.participantsLimit.message}
                </p>
              )}
            </div>

            {/* 회비 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="participationFee" className="label-md text-black">
                회비 (원) <span className="text-system-r-400">*</span>
              </label>
              <input
                id="participationFee"
                type="number"
                min="0"
                placeholder="0"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("participationFee", {
                  required: "회비는 필수입니다 (무료인 경우 0 입력)",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "회비는 0원 이상이어야 합니다",
                  },
                })}
              />
              {errors.participationFee && (
                <p className="text-system-r-400 text-sm">
                  {errors.participationFee.message}
                </p>
              )}
            </div>

            {/* 경로 */}
            <div className="flex flex-col gap-2">
              <label htmlFor="path" className="label-md text-black">
                경로 (선택)
              </label>
              <input
                id="path"
                type="text"
                placeholder="경로 정보를 입력해주세요"
                className="w-full px-4 py-3 border border-n-40 rounded-[8px] body-md placeholder:text-n-200 focus:outline-none focus:border-rg-400"
                {...register("path")}
              />
              <p className="text-n-200 text-sm">
                경로 이미지 URL 또는 경로 설명을 입력해주세요
              </p>
            </div>
          </div>
        </form>
      </main>

      {/* 홈 탭 글쓰기 버튼과 동일한 스타일 */}
      <div className="fixed bottom-[58px] left-1/2 -translate-x-1/2 w-full max-w-[786px] flex justify-end px-[16px] pb-[24px] z-2">
        <SubmitButton
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
          mode={mode}
        />
      </div>
    </>
  );
}
