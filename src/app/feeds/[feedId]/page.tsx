"use client";

import FeedHeader from "@/features/feeds/components/FeedHeader";
import { getFeedDetail } from "@/features/feeds/list/api";
import FeedFooter from "@/features/feeds/list/components/FeedFooter";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import FeedDetailHeader from "./(components)/FeedDetailHeader";
import FeedDetailSkeleton from "./(components)/FeedDetailSkeleton";
import FeedBody from "./(components)/FeedBody";

export default function FeedDetailPage() {
  const params = useParams();
  const feedId = Number(params.feedId);

  const { data: feed, isLoading } = useQuery({
    queryKey: ["feed", feedId],
    queryFn: () => getFeedDetail(feedId),
    enabled: !!feedId,
  });

  return (
    <main className="flex flex-col h-screen pt-14 w-full">
      <FeedDetailHeader />
      {isLoading && <FeedDetailSkeleton />}
      {feed && (
        <>
          <article className="flex flex-col gap-4 py-4">
            <div className="px-4">
              <FeedHeader
                crewName={feed.writer.crewName}
                userName={feed.writer.userName}
                profileImageUri={feed.writer.profileImageUri}
                registerAt={feed.registeredAt}
              />
            </div>
            <FeedBody
              contents={feed.contents}
              imageUrl={feed.images?.map((img) => img.imageUri)}
            />
            <FeedFooter
              commentQty={feed.commentQty}
              recommendationQty={feed.recommendationQty}
              viewQty={feed.viewQty}
              hasMyComment={feed.viewer.hasMyComment}
              hasMyRecommendation={feed.viewer.hasMyRecommendation}
            />
          </article>
          <div className="h-[1px] bg-n-30 my-2" />
        </>
      )}
      <div className="px-4 py-4 text-n-60 body-sm ">
        {"여러분의 생각을 남겨주세요 :)"}
      </div>
    </main>
  );
}
