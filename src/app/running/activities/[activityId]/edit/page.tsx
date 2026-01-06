"use client";

import { use } from "react";
import ActivityForm from "@/features/running/activities/form/ActivityForm";
import { useGetActivityDetailQuery } from "@/features/running/activities/detail/hooks/queries";

interface ActivityEditPageProps {
  params: Promise<{
    activityId: string;
  }>;
}

/**
 * 모임 수정 페이지
 */
export default function ActivityEditPage({ params }: ActivityEditPageProps) {
  const resolvedParams = use(params);
  const activityId = Number(resolvedParams.activityId);

  const { data: activityDetail, isPending, isError } = useGetActivityDetailQuery(activityId);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-n-200 body-md">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (isError || !activityDetail) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-system-r-400 body-md">
            모임 정보를 불러올 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  // 작성자만 수정 가능
  if (!activityDetail.isMyActivity) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-system-r-400 body-md">
            작성자만 수정할 수 있습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ActivityForm
      mode="edit"
      activityId={activityId}
      initialData={activityDetail}
    />
  );
}
