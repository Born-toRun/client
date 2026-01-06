"use client";

import { Marathon } from "@/apis/marathon/types";
import MarathonCard from "./MarathonCard";

interface Props {
  month: string; // "2025-01" 형식
  marathons: Marathon[];
  onBookmarkClick: (marathonId: number, isBookmarking: boolean) => void;
  isBookmarkDisabled?: boolean;
}

/**
 * 월별 마라톤 그룹 컴포넌트
 * 같은 월의 마라톤들을 그룹화하여 표시
 */
export default function MonthGroup({
  month,
  marathons,
  onBookmarkClick,
  isBookmarkDisabled,
}: Props) {
  // "2025-01" -> "2025년 1월"
  const [year, monthNum] = month.split("-");
  const monthLabel = `${year}년 ${parseInt(monthNum)}월`;

  return (
    <section className="mb-6">
      <h2 className="title-lg text-n-900 mb-4 px-4">{monthLabel}</h2>
      <div className="flex flex-col gap-3 px-4">
        {marathons.map((marathon) => (
          <MarathonCard
            key={marathon.id}
            marathon={marathon}
            onBookmarkClick={onBookmarkClick}
            isBookmarkDisabled={isBookmarkDisabled}
          />
        ))}
      </div>
    </section>
  );
}
