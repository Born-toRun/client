"use client";

import CommentIcon from "@/icons/comment-icon.svg";
import ActiveCommentIcon from "@/icons/active-comment-icon.svg";
import { formatFeedCount } from "@/features/feeds/utils/formatCount";
import clsx from "clsx";

interface CommentDetailFooterProps {
  reCommentCount: number;
  hasMyReComment?: boolean;
}

export default function CommentDetailFooter({
  reCommentCount,
  hasMyReComment,
}: CommentDetailFooterProps) {
  return (
    <ul className="px-[16px] flex items-center gap-[8px] justify-start">
      <li className="w-[104px] h-[32px] flex items-center">
        <div className="flex items-center gap-[4px] pl-[16px]">
          {hasMyReComment ? <ActiveCommentIcon /> : <CommentIcon />}
          <span
            className={clsx(
              hasMyReComment ? "text-rg-400" : "text-n-200",
              "body-sm"
            )}
          >
            {formatFeedCount(reCommentCount, "댓글")}
          </span>
        </div>
      </li>
    </ul>
  );
}
