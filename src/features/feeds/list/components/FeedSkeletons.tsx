import { Skeleton } from "@radix-ui/themes";
import FeedFooter from "./FeedFooter";

export default function FeedSkeletons() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="py-4 flex flex-col gap-4 border-b border-n-40"
        >
          <div className="flex items-center gap-2 px-4">
            <Skeleton width="40px" height="40px" className="!rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton width="64px" height="16px" className="!rounded-md" />
              <Skeleton width="104px" height="16px" className="!rounded-md" />
            </div>
          </div>
          <div className="px-4 flex flex-col gap-1">
            <Skeleton width="full" height="20px" className="!rounded-md" />
            <Skeleton width="full" height="20px" className="!rounded-md" />
          </div>
          <FeedFooter
            commentQty={0}
            recommendationQty={0}
            viewQty={0}
            hasMyComment={false}
            hasMyRecommendation={false}
          />
        </div>
      ))}
    </>
  );
}
