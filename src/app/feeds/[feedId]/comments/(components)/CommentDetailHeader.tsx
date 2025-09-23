"use client";

import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import BackIcon from "@/icons/back-icon.svg";
import MoreIcon from "@/icons/more-icon.svg";
import ShareIcon from "@/icons/share-icon.svg";
import CommentActionModal from "../(modals)/CommentActionModal";
import { useState, useRef } from "react";

interface CommentDetailHeaderProps {
  commentId: number;
  feedId: number;
}

export default function CommentDetailHeader({
  commentId,
  feedId,
}: CommentDetailHeaderProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const shareClickHandler = async () => {
    try {
      await navigator.share({
        title: "피드 공유",
        text: "이 댓글을 확인해보세요!",
        url: window.location.href,
      });
    } catch (error) {
      console.log("공유 중 오류가 발생했습니다:", error);
    }
  };

  const moreClickHandler = () => {
    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      const container = document.getElementById("app-container");
      const containerRect = container?.getBoundingClientRect();

      if (containerRect) {
        setModalPosition({
          top: rect.bottom - containerRect.top + 8,
          left: rect.right - containerRect.left - 172, // 모달 너비만큼 왼쪽으로 이동
        });
      }
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header
        left={
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <BackIcon />
          </button>
        }
        title=""
        right={
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
              onClick={shareClickHandler}
            >
              <ShareIcon />
            </button>
            <button
              ref={moreButtonRef}
              className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
              onClick={moreClickHandler}
            >
              <MoreIcon />
            </button>
          </div>
        }
      />
      <CommentActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        commentId={commentId}
        feedId={feedId}
        position={modalPosition}
      />
    </>
  );
}
