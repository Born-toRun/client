"use client";

import { ReCommentDetail } from "@/apis/comment/types";
import { formatRelativeTime } from "@/features/utils/formatDate";
import CommentMenuIcon from "@/icons/comment-menu-icon.svg";
import Image from "next/image";

interface ReCommentsProps {
  reComments: ReCommentDetail[];
}

export default function ReComments({ reComments }: ReCommentsProps) {
  const isEmpty = reComments.length === 0;

  return (
    <div className="bg-white pb-16">
      {isEmpty ? (
        <div className="px-4 py-4 text-n-60 body-sm ">
          {"여러분의 생각을 남겨주세요 :)"}
        </div>
      ) : (
        reComments.map((reComment) => (
          <div
            className={`flex flex-col gap-2 ${
              reComment.isMyComment ? "bg-n-10" : ""
            }`}
            key={reComment.id}
          >
            <div className="flex items-center gap-[8px] px-4 pt-2">
              <div className="relative overflow-hidden size-[40px] shrink-0 rounded-full border border-[rgba(0,0,0,0.1)]">
                {reComment.writer.profileImageUri ? (
                  <Image
                    src={reComment.writer.profileImageUri}
                    fill
                    alt="profile-image"
                    className="rounded-full"
                  />
                ) : (
                  <div className="absolute w-full h-full" />
                )}
              </div>
              <div className="flex flex-col gap-[4px] py-[2px] w-full">
                <p className="body-sm text-black">
                  {reComment.writer.userName}
                </p>
                <div className="flex items-center body-sm text-n-60 gap-[4px]">
                  <p>{reComment.writer.crewName}</p>
                  <span>·</span>
                  <p>{formatRelativeTime(reComment.registeredAt)}</p>
                </div>
              </div>
              <button type="button">
                <CommentMenuIcon />
              </button>
            </div>
            <div className="px-5 flex gap-2 relative">
              <div className="w-8 flex justify-center relative">
                <div className="w-1 absolute top-0 bottom-0 bg-n-30 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1 grow">
                <p className="body-md text-black pb-6">{reComment.contents}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
