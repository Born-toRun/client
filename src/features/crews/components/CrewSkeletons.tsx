"use client";

/**
 * 크루 목록 로딩 스켈레톤 컴포넌트
 * 크루 데이터 로딩 중 표시되는 스켈레톤 UI
 */
export default function CrewSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-3 px-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="p-4 bg-white round-sm elevation-10 animate-pulse"
        >
          <div className="flex items-start gap-4">
            {/* 로고 스켈레톤 */}
            <div className="w-16 h-16 bg-n-40 round-sm flex-shrink-0" />

            {/* 정보 스켈레톤 */}
            <div className="flex-1">
              {/* 크루명 스켈레톤 */}
              <div className="h-6 bg-n-40 round-sm mb-2 w-3/4" />

              {/* 지역 스켈레톤 */}
              <div className="h-5 bg-n-40 round-sm w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
