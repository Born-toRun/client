"use client";

import { ArrowLeft, Share2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  onShare: () => void;
  onMoreClick: () => void;
}

/**
 * 모임 상세 헤더 컴포넌트
 */
export default function ActivityDetailHeader({ onShare, onMoreClick }: Props) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
      <div className="max-w-[786px] mx-auto flex items-center justify-between h-14 px-4">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-n-10 round-xs"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={24} />
        </button>

        {/* 우측 액션 버튼들 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onShare}
            className="p-2 hover:bg-n-10 round-xs"
            aria-label="공유하기"
          >
            <Share2 size={24} />
          </button>
          <button
            onClick={onMoreClick}
            className="p-2 hover:bg-n-10 round-xs"
            aria-label="더보기"
          >
            <MoreVertical size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
