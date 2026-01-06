"use client";

/**
 * 랭킹 탭 타입
 */
export type RankingTabType = "crew" | "member";

/**
 * 랭킹 탭 컴포넌트 Props
 */
interface RankingTabsProps {
  activeTab: RankingTabType;
  onTabChange: (tab: RankingTabType) => void;
}

/**
 * 랭킹 탭 컴포넌트
 * 크루 랭킹과 크루원 랭킹을 전환할 수 있는 탭 네비게이션
 */
export default function RankingTabs({
  activeTab,
  onTabChange,
}: RankingTabsProps) {
  return (
    <div className="flex border-b border-n-20">
      {/* 크루 랭킹 탭 */}
      <button
        onClick={() => onTabChange("crew")}
        className={`flex-1 py-4 text-center title-md transition-colors ${
          activeTab === "crew"
            ? "text-n-900 border-b-2 border-n-900"
            : "text-n-400 hover:text-n-600"
        }`}
        aria-current={activeTab === "crew" ? "page" : undefined}
      >
        크루 랭킹
      </button>

      {/* 크루원 랭킹 탭 */}
      <button
        onClick={() => onTabChange("member")}
        className={`flex-1 py-4 text-center title-md transition-colors ${
          activeTab === "member"
            ? "text-n-900 border-b-2 border-n-900"
            : "text-n-400 hover:text-n-600"
        }`}
        aria-current={activeTab === "member" ? "page" : undefined}
      >
        크루원 랭킹
      </button>
    </div>
  );
}
