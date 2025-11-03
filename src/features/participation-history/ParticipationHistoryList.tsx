"use client";

import { useGetMyParticipationsQuery } from "@/features/running/activities/list/hooks/queries";
import ParticipationHistoryCard from "./ParticipationHistoryCard";
import { Calendar } from "lucide-react";
import { Skeleton } from "@radix-ui/themes";

/**
 * 참여 기록 리스트 컴포넌트 (단순화 버전)
 * 사용자가 참여한 모임 목록을 간단하게 표시합니다.
 *
 * 주요 변경사항:
 * - 복잡한 ActivityCard 대신 간단한 ParticipationHistoryCard 사용
 * - 월별 그룹화 제거로 복잡도 감소
 * - 단순한 리스트 레이아웃
 * - 최소한의 시각적 요소
 */
export default function ParticipationHistoryList() {
  const { data, isLoading, isError, error } = useGetMyParticipationsQuery();

  // 로딩 상태
  if (isLoading) {
    return <ParticipationHistorySkeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <p className="text-n-500 body-md text-center mb-2">
          참여 기록을 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="text-n-400 body-sm text-center">
          {error?.message || "잠시 후 다시 시도해 주세요."}
        </p>
      </div>
    );
  }

  // 빈 상태
  if (!data?.details || data.details.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 bg-n-20 round-full flex items-center justify-center mb-4">
          <Calendar size={32} className="text-n-400" aria-hidden="true" />
        </div>
        <p className="text-n-900 title-md text-center mb-2">
          아직 참여한 모임이 없습니다
        </p>
        <p className="text-n-500 body-sm text-center">
          본투런의 다양한 러닝 모임에 참여해보세요!
        </p>
      </div>
    );
  }

  // 단순한 리스트 렌더링 (월별 그룹화 없음)
  return (
    <div className="divide-y divide-n-20 bg-white">
      {data.details.map((activity) => (
        <ParticipationHistoryCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

/**
 * 참여 기록 스켈레톤 컴포넌트
 * 로딩 중일 때 표시되는 단순화된 스켈레톤 UI
 */
function ParticipationHistorySkeleton() {
  return (
    <div className="divide-y divide-n-20 bg-white">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="px-5 py-5 flex flex-col gap-3">
          {/* 제목 스켈레톤 */}
          <Skeleton width="80%" height="22px" className="!rounded-md" />

          {/* 날짜 및 장소 스켈레톤 */}
          <div className="flex flex-col gap-2">
            <Skeleton width="140px" height="16px" className="!rounded-md" />
            <Skeleton width="100px" height="16px" className="!rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
