"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/**
 * 크루 목록 하단 공유 섹션 컴포넌트
 * 본투런을 친구에게 공유하도록 유도합니다.
 */
export default function ShareSection() {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);

    try {
      const shareData = {
        title: "Born-to-Run",
        text: "본투런에서 러닝 크루를 만나보세요!",
        url: window.location.origin,
      };

      // Web Share API가 사용 가능한 경우
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: 클립보드에 복사
        await navigator.clipboard.writeText(window.location.origin);
        toast.success("링크가 클립보드에 복사되었습니다!");
      }
    } catch (error) {
      // 사용자가 공유를 취소한 경우는 에러로 처리하지 않음
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("공유 실패:", error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <section className="px-4 py-8 bg-n-10">
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="title-lg text-n-900 mb-2">본투런을 알려주세요</h3>
        <p className="body-md text-n-500 mb-6">
          친구에게 공유하여 크루를 등록해주세요!
        </p>
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rg-400 text-white round-md hover:bg-rg-500 active:bg-rg-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="본투런 공유하기"
        >
          <Share2 size={20} aria-hidden="true" />
          <span className="label-md">공유하기</span>
        </button>
      </div>
    </section>
  );
}
