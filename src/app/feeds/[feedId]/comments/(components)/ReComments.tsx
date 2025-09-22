"use client";

import { ReCommentDetail } from "@/apis/comment/types";
import { formatRelativeTime } from "@/features/utils/formatDate";
import CommentMenuIcon from "@/icons/comment-menu-icon.svg";
import Image from "next/image";
import { useState } from "react";
import CommentActionModal from "../(modals)/CommentActionModal";

interface ReCommentsProps {
  reComments: ReCommentDetail[];
  feedId: number;
}

export default function ReComments({ reComments, feedId }: ReCommentsProps) {
  const isEmpty = reComments.length === 0;
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    commentId: number | null;
    position: { top: number; left: number } | null;
  }>({ isOpen: false, commentId: null, position: null });

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
              <button
                className="w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-n-30 rounded-full"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setModalState({
                    isOpen: true,
                    commentId: reComment.id,
                    position: {
                      top: rect.bottom + window.scrollY,
                      left: rect.left + window.scrollX - 172, // 모달 너비(172px)만큼 왼쪽으로 이동
                    },
                  });
                }}
              >
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

      {modalState.isOpen && modalState.commentId && modalState.position && (
        <CommentActionModal
          isOpen={modalState.isOpen}
          onClose={() =>
            setModalState({ isOpen: false, commentId: null, position: null })
          }
          commentId={modalState.commentId}
          feedId={feedId}
          position={modalState.position}
        />
      )}
    </div>
  );
}
