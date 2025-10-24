"use client";

import { Marathon } from "@/apis/marathon/types";
import { useMemo } from "react";
import MonthGroup from "./MonthGroup";
import { format } from "date-fns";

interface Props {
  marathons: Marathon[];
  onBookmarkClick: (marathonId: number, isBookmarking: boolean) => void;
  isBookmarkDisabled?: boolean;
}

/**
 * 마라톤 리스트 컴포넌트
 * 마라톤을 월별로 그룹화하여 표시
 */
export default function MarathonList({
  marathons,
  onBookmarkClick,
  isBookmarkDisabled,
}: Props) {
  // 월별로 마라톤 그룹화 (메모이제이션)
  const groupedMarathons = useMemo(() => {
    const groups = new Map<string, Marathon[]>();

    marathons.forEach((marathon) => {
      const monthKey = format(new Date(marathon.schedule), "yyyy-MM");
      const existing = groups.get(monthKey) || [];
      groups.set(monthKey, [...existing, marathon]);
    });

    // Map을 배열로 변환하고 날짜순 정렬
    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, marathons]) => ({
        month,
        marathons: marathons.sort(
          (a, b) =>
            new Date(a.schedule).getTime() - new Date(b.schedule).getTime()
        ),
      }));
  }, [marathons]);

  if (marathons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <p className="title-md text-n-500 text-center">
          해당 조건의 마라톤이 없어요
        </p>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {groupedMarathons.map(({ month, marathons }) => (
        <MonthGroup
          key={month}
          month={month}
          marathons={marathons}
          onBookmarkClick={onBookmarkClick}
          isBookmarkDisabled={isBookmarkDisabled}
        />
      ))}
    </div>
  );
}
