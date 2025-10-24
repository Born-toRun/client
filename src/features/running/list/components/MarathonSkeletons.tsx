"use client";

/**
 * 마라톤 카드 스켈레톤 컴포넌트
 */
function MarathonCardSkeleton() {
  return (
    <div className="p-4 bg-white round-sm elevation-10 animate-pulse">
      <div className="pr-12">
        {/* 제목 */}
        <div className="h-6 bg-n-30 round-xs mb-3 w-3/4" />

        {/* 일정 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="size-4 bg-n-30 rounded-full" />
          <div className="h-4 bg-n-30 round-xs w-24" />
        </div>

        {/* 장소 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="size-4 bg-n-30 rounded-full" />
          <div className="h-4 bg-n-30 round-xs w-32" />
        </div>

        {/* 코스 */}
        <div className="mt-2">
          <div className="h-6 bg-n-30 round-full w-16" />
        </div>
      </div>

      {/* 북마크 버튼 */}
      <div className="absolute top-4 right-4 size-9 bg-n-30 rounded-full" />
    </div>
  );
}

/**
 * 마라톤 리스트 스켈레톤 컴포넌트
 * 로딩 중 표시되는 스켈레톤 UI
 */
export default function MarathonSkeletons() {
  return (
    <div className="px-4 pb-6">
      <div className="mb-6">
        {/* 월 라벨 */}
        <div className="h-7 bg-n-30 round-xs mb-4 w-32 animate-pulse" />

        {/* 카드들 */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <MarathonCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
