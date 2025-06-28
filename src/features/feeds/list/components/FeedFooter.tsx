"use client";

import CommentIcon from "@/icons/comment-icon.svg";
import LikeIcon from "@/icons/like-icon.svg";
import ViewIcon from "@/icons/view-icon.svg";
import ActiveCommentIcon from "@/icons/active-comment-icon.svg";
import ActiveLikeIcon from "@/icons/active-like-icon.svg";

import { formatFeedCount } from "../../utils/formatCount";
import clsx from "clsx";

interface Props {
  recommendationQty?: number;
  viewQty?: number;
  commentQty?: number;
  hasMyComment?: boolean;
  hasMyRecommendation?: boolean;
}

export default function FeedFooter({
  commentQty,
  recommendationQty,
  viewQty,
  hasMyComment,
  hasMyRecommendation,
}: Props) {
  return (
    <ul className="px-[16px] flex items-center gap-[8px] justify-between">
      <li className="w-[104px] h-[32px] flex items-center">
        <div className="flex items-center gap-[4px] pl-[16px]">
          {hasMyComment ? <ActiveCommentIcon /> : <CommentIcon />}
          <span
            className={clsx(
              hasMyComment ? "text-rg-400" : "text-n-200",
              "body-sm"
            )}
          >
            {formatFeedCount(commentQty, "댓글")}
          </span>
        </div>
      </li>
      <li className="w-[104px] h-[32px] flex items-center">
        <button
          type="button"
          className="flex items-center gap-[4px] justify-center w-full"
        >
          {hasMyRecommendation ? <ActiveLikeIcon /> : <LikeIcon />}
          <span
            className={clsx(
              hasMyRecommendation ? "text-rg-400" : "text-n-200",
              "body-sm"
            )}
          >
            {formatFeedCount(recommendationQty, "좋아요")}
          </span>
        </button>
      </li>
      <li className="w-[104px] h-[32px] flex items-center">
        <div className="flex items-center gap-[4px] pr-[16px] justify-end w-full">
          <ViewIcon />
          <span className="text-n-200 body-sm">
            {formatFeedCount(viewQty, "조회")}
          </span>
        </div>
      </li>
    </ul>
  );
}
