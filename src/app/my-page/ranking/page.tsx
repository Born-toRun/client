"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import RankingTabs, {
  type RankingTabType,
} from "@/features/ranking/components/RankingTabs";
import CrewRankingCard from "@/features/ranking/components/CrewRankingCard";
import MemberRankingCard from "@/features/ranking/components/MemberRankingCard";
import RankingEmptyState from "@/features/ranking/components/RankingEmptyState";
import RankingSkeleton from "@/features/ranking/components/RankingSkeleton";
import { useCrewRankings } from "@/apis/crews/hooks/useCrewRankings";
import { useMemberRankings } from "@/apis/crews/hooks/useMemberRankings";

/**
 * 랭킹 페이지
 * 크루 랭킹과 크루원 랭킹을 탭으로 전환하여 조회할 수 있습니다.
 *
 * - 크루 랭킹: 활동 횟수 기준으로 정렬된 크루 목록
 * - 크루원 랭킹: 참여 횟수 기준으로 정렬된 크루원 목록
 * - 1-3위는 트로피/메달 아이콘과 색상으로 표시
 * - 4위 이하는 숫자로 순위 표시
 */
export default function RankingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RankingTabType>("crew");

  // 크루 랭킹 데이터 조회 (크루 탭이 활성화된 경우에만)
  const {
    data: crewData,
    isPending: isCrewPending,
    isError: isCrewError,
  } = useCrewRankings();

  // 크루원 랭킹 데이터 조회 (크루원 탭이 활성화된 경우에만)
  const {
    data: memberData,
    isPending: isMemberPending,
    isError: isMemberError,
  } = useMemberRankings();

  // 현재 탭에 따른 데이터와 상태
  const isLoading = activeTab === "crew" ? isCrewPending : isMemberPending;
  const isError = activeTab === "crew" ? isCrewError : isMemberError;
  const crewRankings = crewData?.rankings ?? [];
  const memberRankings = memberData?.rankings ?? [];
  const hasData =
    activeTab === "crew" ? crewRankings.length > 0 : memberRankings.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
        <div className="max-w-[786px] mx-auto flex items-center justify-between h-14 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-n-10 round-xs"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="title-lg text-n-900 absolute left-1/2 transform -translate-x-1/2">
            랭킹
          </h1>
          <div />
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-white">
        <div className="max-w-[786px] mx-auto">
          <RankingTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="pt-[112px]">
        {/* 로딩 상태 */}
        {isLoading && <RankingSkeleton />}

        {/* 에러 상태 */}
        {!isLoading && isError && (
          <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-4">
            <div className="text-center">
              <p className="title-md text-n-900 mb-2">
                랭킹을 불러오지 못했어요
              </p>
              <p className="body-md text-n-500">
                잠시 후 다시 시도해주세요.
              </p>
            </div>
          </div>
        )}

        {/* 크루 랭킹 목록 */}
        {!isLoading && !isError && activeTab === "crew" && (
          <>
            {hasData ? (
              <div className="divide-y divide-n-20">
                {crewRankings.map((item) => (
                  <CrewRankingCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <RankingEmptyState type="crew" />
            )}
          </>
        )}

        {/* 크루원 랭킹 목록 */}
        {!isLoading && !isError && activeTab === "member" && (
          <>
            {hasData ? (
              <div className="divide-y divide-n-20">
                {memberRankings.map((item) => (
                  <MemberRankingCard key={item.userId} item={item} />
                ))}
              </div>
            ) : (
              <RankingEmptyState type="member" />
            )}
          </>
        )}
      </main>
    </div>
  );
}
