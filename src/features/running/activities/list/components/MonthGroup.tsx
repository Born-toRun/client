"use client";

import { Activity } from "@/apis/activity/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import ActivityCard from "./ActivityCard";

interface Props {
  month: string; // "YYYY-MM" 형식
  activities: Activity[];
}

/**
 * 월별 모임 그룹 컴포넌트
 * 같은 월의 모임들을 그룹화하여 표시
 */
export default function MonthGroup({ month, activities }: Props) {
  // 월 라벨 포맷팅 (예: "2024년 1월")
  const monthLabel = format(new Date(month + "-01"), "yyyy년 M월", {
    locale: ko,
  });

  return (
    <section className="mb-6">
      {/* 월 헤더 */}
      <h2 className="px-4 mb-3 title-lg text-n-900">{monthLabel}</h2>

      {/* 모임 카드 리스트 */}
      <div className="flex flex-col gap-3 px-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
}
