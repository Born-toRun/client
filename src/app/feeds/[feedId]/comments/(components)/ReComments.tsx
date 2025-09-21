"use client";

import { ReCommentDetail } from "@/apis/comment/types";
import FeedHeader from "@/features/feeds/components/FeedHeader";
import CommentBox from "../../(components)/CommentBox";

interface ReCommentsProps {
  reComments: ReCommentDetail[];
  parentCommentId: number;
  feedId: number;
  onRefresh: () => void;
}

export default function ReComments({
  reComments,
  parentCommentId,
  feedId,
  onRefresh,
}: ReCommentsProps) {
  return (
    <div className="flex flex-col">
      <div className="px-4 py-2">
        <h2 className="text-base font-semibold text-n-80">
          답글 {reComments.length}개
        </h2>
      </div>

      <div className="space-y-4 px-4 pb-4">
        {reComments.map((reComment) => (
          <div key={reComment.id} className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-n-20 flex-shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <FeedHeader
                  crewName={reComment.writer.crewName}
                  userName={reComment.writer.userName}
                  profileImageUri={reComment.writer.profileImageUri}
                  registerAt={reComment.registeredAt}
                />
                <div className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                  {reComment.contents}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-n-30">
        <CommentBox
          onSubmit={onRefresh}
          feedId={feedId}
          parentCommentId={parentCommentId}
        />
      </div>
    </div>
  );
}
