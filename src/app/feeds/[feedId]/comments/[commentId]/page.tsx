"use client";

import { getCommentDetail } from "@/apis/comment";
import FeedHeader from "@/features/feeds/components/FeedHeader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CommentDetailBody from "../(components)/CommentDetailBody";
import CommentDetailHeader from "../(components)/CommentDetailHeader";
import CommentDetailSkeleton from "../(components)/CommentDetailSkeleton";
import ReComments from "../(components)/ReComments";

export default function CommentDetailPage() {
  const params = useParams();
  const feedId = Number(params.feedId);
  const commentId = Number(params.commentId);

  const {
    data: comment,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => getCommentDetail(commentId),
    enabled: !!commentId,
  });

  const refetchCommentList = () => {
    refetch();
  };

  return (
    <>
      <CommentDetailHeader commentId={commentId} />
      <main className="flex flex-col pt-14 w-full">
        {isLoading && <CommentDetailSkeleton />}
        {comment && (
          <>
            <article className="flex flex-col gap-4 py-4">
              <div className="px-4">
                <FeedHeader
                  crewName={comment.writer.crewName}
                  userName={comment.writer.userName}
                  profileImageUri={comment.writer.profileImageUri}
                  registerAt={comment.registeredAt}
                />
              </div>
              <CommentDetailBody contents={comment.contents} />
            </article>
            <div className="h-[1px] bg-n-30 my-2" />
            <ReComments
              reComments={comment.reComments}
              parentCommentId={comment.id}
              feedId={feedId}
              onRefresh={refetchCommentList}
            />
          </>
        )}
      </main>
    </>
  );
}
