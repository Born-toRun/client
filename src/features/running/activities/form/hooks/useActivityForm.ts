import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import type { ActivityFormData, ActivityFormMode } from "../types";
import type { ActivityDetail } from "@/apis/activity/types";
import { useCreateActivityMutation, useUpdateActivityMutation } from "./queries";
import { pageRoutes } from "@/constants/route";

interface UseActivityFormProps {
  mode: ActivityFormMode;
  activityId?: number;
  initialData?: ActivityDetail;
}

/**
 * 모임 폼 관리 훅
 * 등록/수정 로직을 공통으로 처리
 */
export const useActivityForm = ({
  mode,
  activityId,
  initialData,
}: UseActivityFormProps) => {
  const router = useRouter();
  const createMutation = useCreateActivityMutation();
  const updateMutation = useUpdateActivityMutation();

  // 초기 데이터 변환 (수정 모드일 때)
  const getDefaultValues = (): ActivityFormData => {
    if (mode === "edit" && initialData) {
      // ISO 8601 날짜를 datetime-local 형식으로 변환
      const startAtDate = new Date(initialData.startAt);
      const formattedStartAt = format(startAtDate, "yyyy-MM-dd'T'HH:mm");

      return {
        title: initialData.title,
        contents: initialData.contents,
        startAt: formattedStartAt,
        venue: initialData.venue,
        venueUrl: initialData.venueUrl || "",
        participantsLimit: initialData.participantsLimit,
        participationFee: initialData.entryFee || 0,
        course: initialData.course,
        courseDetail: "",
        path: initialData.routeImageUrl || "",
      };
    }

    // 등록 모드 기본값
    return {
      title: "",
      contents: "",
      startAt: "",
      venue: "",
      venueUrl: "",
      participantsLimit: 10,
      participationFee: 0,
      course: "5km",
      courseDetail: "",
      path: "",
    };
  };

  const form = useForm<ActivityFormData>({
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: ActivityFormData) => {
    try {
      // datetime-local 형식을 ISO 8601로 변환
      const startAtDate = new Date(data.startAt);
      const isoStartAt = startAtDate.toISOString();

      const requestData = {
        title: data.title,
        contents: data.contents,
        startAt: isoStartAt,
        venue: data.venue,
        venueUrl: data.venueUrl || "",
        participantsLimit: data.participantsLimit,
        participationFee: data.participationFee,
        course: data.course || undefined,
        courseDetail: data.courseDetail || undefined,
        path: data.path || undefined,
      };

      if (mode === "create") {
        const response = await createMutation.mutateAsync(requestData);
        // 생성된 모임 상세 페이지로 이동
        router.push(pageRoutes.running.activities.detail(response.activityId));
      } else if (mode === "edit" && activityId) {
        await updateMutation.mutateAsync({
          activityId,
          data: requestData,
        });
        // 수정된 모임 상세 페이지로 이동
        router.push(pageRoutes.running.activities.detail(activityId));
      }
    } catch (error) {
      console.error("모임 저장 실패:", error);
      alert("모임 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};
