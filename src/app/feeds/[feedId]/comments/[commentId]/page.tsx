"use client";

import { getCommentDetail } from "@/apis/comment";
import FeedHeader from "@/features/feeds/components/FeedHeader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CommentDetailBody from "../(components)/CommentDetailBody";
import CommentDetailFooter from "../(components)/CommentDetailFooter";
import CommentDetailHeader from "../(components)/CommentDetailHeader";
import CommentDetailSkeleton from "../(components)/CommentDetailSkeleton";
import ReComments from "../(components)/ReComments";
import CommentBox from "../../(components)/CommentBox";

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
      <CommentDetailHeader commentId={commentId} feedId={feedId} />
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
              <CommentDetailFooter
                reCommentCount={comment.reComments.length}
                hasMyReComment={comment.reComments.some(
                  (reComment) => reComment.isMyComment
                )}
              />
            </article>
            <div className="h-[1px] bg-n-30 my-2" />
          </>
        )}
        {comment && (
          <ReComments reComments={comment.reComments} feedId={feedId} />
        )}
        <CommentBox
          onSubmit={refetchCommentList}
          feedId={feedId}
          parentCommentId={commentId}
        />
      </main>
    </>
  );
}
