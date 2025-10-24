"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

interface Props {
  isBookmarking: boolean;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

/**
 * 북마크 버튼 컴포넌트
 * 마라톤 카드 우측 상단에 표시되는 북마크 토글 버튼
 */
export default function BookmarkButton({
  isBookmarking,
  onClick,
  disabled = false,
}: Props) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="p-2 round-full bg-white elevation-10 hover:elevation-20 transition-shadow disabled:opacity-50"
      whileTap={{ scale: 0.9 }}
      aria-label={isBookmarking ? "북마크 취소" : "북마크 추가"}
      aria-pressed={isBookmarking}
    >
      <Bookmark
        size={20}
        className={isBookmarking ? "fill-rg-400 stroke-rg-400" : "stroke-n-500"}
      />
    </motion.button>
  );
}
