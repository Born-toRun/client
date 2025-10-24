"use client";

/**
 * 모임 스켈레톤 컴포넌트
 * 로딩 중 표시할 스켈레톤 UI
 */
export default function ActivitySkeletons() {
  return (
    <div className="px-4">
      {/* 월 헤더 스켈레톤 */}
      <div className="mb-3 h-7 w-24 bg-n-30 animate-pulse round-xs" />

      {/* 카드 스켈레톤 */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 bg-white round-sm elevation-10"
          >
            {/* 제목 */}
            <div className="h-6 w-3/4 bg-n-30 animate-pulse round-xs mb-3" />

            {/* 정보들 */}
            <div className="flex flex-col gap-2">
              <div className="h-5 w-1/2 bg-n-30 animate-pulse round-xs" />
              <div className="h-5 w-1/3 bg-n-30 animate-pulse round-xs" />

              {/* 배지들 */}
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-16 bg-n-30 animate-pulse round-full" />
                <div className="h-6 w-20 bg-n-30 animate-pulse round-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
