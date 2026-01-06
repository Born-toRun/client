"use client";

import { ReCommentDetail } from "@/apis/comment/types";
import { formatRelativeTime } from "@/features/utils/formatDate";
import CommentMenuIcon from "@/icons/comment-menu-icon.svg";
import { Crown } from "lucide-react";
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
              <div className="relative size-[40px] shrink-0">
                {reComment.writer.profileImageUri ? (
                  <Image
                    src={reComment.writer.profileImageUri}
                    width={40}
                    height={40}
                    alt="profile-image"
                    className="rounded-full object-cover border border-[rgba(0,0,0,0.1)]"
                  />
                ) : (
                  <div className="size-[40px] bg-n-30 rounded-full border border-[rgba(0,0,0,0.1)]" />
                )}

                {/* 관리자 왕관 아이콘 */}
                {reComment.writer.isAdmin && (
                  <div
                    className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
                    title="관리자"
                  >
                    <Crown size={14} className="text-yellow-500 fill-yellow-500" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-[4px] py-[2px] w-full">
                <div className="flex items-center gap-2">
                  <p className="body-sm text-black">
                    {reComment.writer.userName}
                  </p>
                  {reComment.writer.isManager && (
                    <span className="inline-block px-2 py-0.5 bg-rg-50 text-rg-400 round-full label-xs flex-shrink-0">
                      운영진
                    </span>
                  )}
                </div>
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
