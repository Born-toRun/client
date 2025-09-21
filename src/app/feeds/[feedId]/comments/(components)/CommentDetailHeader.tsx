"use client";

import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import BackIcon from "@/icons/back-icon.svg";
import MoreIcon from "@/icons/more-icon.svg";
import ShareIcon from "@/icons/share-icon.svg";

interface CommentDetailHeaderProps {
  commentId: number;
}

export default function CommentDetailHeader({
  commentId,
}: CommentDetailHeaderProps) {
  const router = useRouter();

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
    console.log("moreClickHandler", commentId);
  };

  return (
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
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={moreClickHandler}
          >
            <MoreIcon />
          </button>
        </div>
      }
    />
  );
}
