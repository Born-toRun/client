export default function CommentDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4 py-4 animate-pulse">
      <div className="px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-n-20 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-n-20 rounded w-24" />
            <div className="h-3 bg-n-20 rounded w-16" />
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="space-y-2">
          <div className="h-4 bg-n-20 rounded w-full" />
          <div className="h-4 bg-n-20 rounded w-3/4" />
          <div className="h-4 bg-n-20 rounded w-1/2" />
        </div>
      </div>
      <div className="h-[1px] bg-n-30 my-2" />
      <div className="px-4 space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-n-20 rounded-full" />
              <div className="flex flex-col gap-1">
                <div className="h-3 bg-n-20 rounded w-20" />
                <div className="h-3 bg-n-20 rounded w-14" />
              </div>
            </div>
            <div className="ml-11">
              <div className="h-4 bg-n-20 rounded w-full" />
              <div className="h-4 bg-n-20 rounded w-2/3 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
