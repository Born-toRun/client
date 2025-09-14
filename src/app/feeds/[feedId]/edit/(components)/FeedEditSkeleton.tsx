export default function FeedEditSkeleton() {
  return (
    <div className="flex flex-col h-screen pt-14 w-full">
      <div className="flex flex-col gap-4 py-4">
        {/* 헤더 스켈레톤 */}
        <div className="px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* 이미지 스켈레톤 */}
        <div className="px-4">
          <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* 텍스트 영역 스켈레톤 */}
        <div className="px-4">
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 카테고리 및 접근 레벨 스켈레톤 */}
        <div className="px-4">
          <div className="flex gap-4">
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
