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
 * 한국어 날짜 문자열을 Date 객체로 변환
 * 예: "2025년3월1일 출발시간:오후1시" -> Date(2025, 2, 1)
 */
function parseKoreanDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // "2025년3월1일" 형식에서 년, 월, 일 추출
  const match = dateStr.match(/(\d{4})년(\d{1,2})월(\d{1,2})일/);
  if (!match) return null;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // JavaScript Date는 0부터 시작
  const day = parseInt(match[3], 10);

  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
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
      // 한국어 날짜 문자열을 Date 객체로 변환
      const date = parseKoreanDate(marathon.schedule);
      if (!date) return;

      const monthKey = format(date, "yyyy-MM");
      const existing = groups.get(monthKey) || [];
      groups.set(monthKey, [...existing, marathon]);
    });

    // Map을 배열로 변환하고 날짜순 정렬
    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, marathons]) => ({
        month,
        marathons: marathons.sort((a, b) => {
          const dateA = parseKoreanDate(a.schedule);
          const dateB = parseKoreanDate(b.schedule);
          if (!dateA || !dateB) return 0;
          return dateA.getTime() - dateB.getTime();
        }),
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
