"use client";
import { useLikeFeed } from "@/app/feeds/[feedId]/(hooks)/useLikeFeed";
import Header from "@/components/header/Header";
import { getFeedDetail } from "@/features/feeds/list/api";
import BackIcon from "@/icons/back-icon.svg";
import ActiveLikeIcon from "@/icons/big-active-like-icon.svg";
import LikeIcon from "@/icons/big-like-icon.svg";
import MoreIcon from "@/icons/more-icon.svg";
import ShareIcon from "@/icons/share-icon.svg";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FeedActionModal from "./FeedActionModal";

export default function FeedDetailHeader({ feedId }: { feedId: number }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: feed } = useQuery({
    queryKey: ["feed", feedId],
    queryFn: () => getFeedDetail(feedId),
    enabled: !!feedId,
  });

  const { toggleLike, isPending } = useLikeFeed({
    feedId,
    currentLikeStatus: feed?.viewer.hasMyRecommendation ?? false,
  });

  const shareClickHandler = async () => {
    try {
      // Web Share API 지원 여부 확인
      if (navigator.share) {
        await navigator.share({
          title: "피드 공유",
          text: "이 피드를 확인해보세요!",
          url: window.location.href,
        });
      } else {
        // Web Share API를 지원하지 않는 경우 클립보드에 복사
        await navigator.clipboard.writeText(window.location.href);
        // 사용자에게 알림 (토스트 메시지 등)
        console.log("링크가 클립보드에 복사되었습니다.");
      }
    } catch (error) {
      console.log("공유 중 오류가 발생했습니다:", error);
    }
  };

  const moreClickHandler = () => {
    setIsModalOpen(true);
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
              className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full disabled:opacity-50"
              onClick={toggleLike}
              disabled={isPending}
            >
              {feed?.viewer.hasMyRecommendation ? (
                <ActiveLikeIcon />
              ) : (
                <LikeIcon />
              )}
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
      <FeedActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feedId={feedId}
      />
    </>
  );
}
