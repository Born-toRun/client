"use client";

import { Activity } from "@/apis/activity/types";
import { useMemo } from "react";
import { format } from "date-fns";
import MonthGroup from "./MonthGroup";

interface Props {
  activities: Activity[];
}

/**
 * 모임 리스트 컴포넌트
 * 월별로 그룹화된 모임 리스트를 표시
 */
export default function ActivityList({ activities }: Props) {
  // 월별 그룹화
  const groupedActivities = useMemo(() => {
    const groups: Record<string, Activity[]> = {};

    activities.forEach((activity) => {
      const month = format(new Date(activity.startAt), "yyyy-MM");
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(activity);
    });

    // 월 기준 정렬 (최신순)
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [activities]);

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <p className="text-n-500 body-md text-center mb-4">
          조건에 맞는 모임이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {groupedActivities.map(([month, monthActivities]) => (
        <MonthGroup
          key={month}
          month={month}
          activities={monthActivities}
        />
      ))}
    </div>
  );
}
