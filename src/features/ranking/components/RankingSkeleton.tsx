import { Skeleton } from "@radix-ui/themes";

/**
 * 랭킹 스켈레톤 컴포넌트
 * 랭킹 데이터 로딩 중일 때 표시되는 스켈레톤 UI
 */
export default function RankingSkeleton() {
  return (
    <div className="divide-y divide-n-20">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="px-5 py-6 flex items-center gap-4">
          {/* 순위 스켈레톤 */}
          <Skeleton width="40px" height="24px" className="!rounded-md" />

          {/* 프로필/로고 스켈레톤 */}
          <Skeleton width="48px" height="48px" className="!rounded-full" />

          {/* 정보 스켈레톤 */}
          <div className="flex-1 space-y-2">
            <Skeleton width="120px" height="20px" className="!rounded-md" />
            <Skeleton width="80px" height="16px" className="!rounded-md" />
          </div>

          {/* 카운트 스켈레톤 */}
          <div className="text-right space-y-2">
            <Skeleton width="60px" height="16px" className="!rounded-md" />
            <Skeleton width="40px" height="20px" className="!rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
