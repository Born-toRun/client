"use client";

import CloseIcon from "@/icons/close-icon.svg";

interface SearchHistoryItemProps {
  keyword: string;
  onClick: (keyword: string) => void;
  onDelete: (keyword: string) => void;
}

/**
 * 개별 검색 기록 아이템 컴포넌트
 */
export default function SearchHistoryItem({
  keyword,
  onClick,
  onDelete,
}: SearchHistoryItemProps) {
  const handleClick = () => {
    onClick(keyword);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    onDelete(keyword);
  };

  return (
    <div
      className="flex items-center justify-between px-[16px] py-[12px] hover:bg-n-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <span className="body-lg text-black flex-1 truncate">{keyword}</span>
      <button
        onClick={handleDelete}
        className="ml-[8px] size-[24px] flex items-center justify-center flex-shrink-0"
        type="button"
        aria-label={`${keyword} 삭제`}
      >
        <CloseIcon className="size-[16px]" />
      </button>
    </div>
  );
}
