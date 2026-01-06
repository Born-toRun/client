"use client";

import Button from "@/components/Button";
import SearchHistoryItem from "./SearchHistoryItem";
import EmptySearchState from "./EmptySearchState";

interface SearchHistoryListProps {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
  onKeywordDelete: (keyword: string) => void;
  onClearAll: () => void;
}

/**
 * 검색 기록 목록 컴포넌트
 * 최대 10개의 최근 검색어 표시
 */
export default function SearchHistoryList({
  keywords,
  onKeywordClick,
  onKeywordDelete,
  onClearAll,
}: SearchHistoryListProps) {
  // 최대 10개만 표시
  const displayedKeywords = keywords.slice(0, 10);

  if (displayedKeywords.length === 0) {
    return <EmptySearchState />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-[16px] py-[12px]">
        <h2 className="title-md text-black">최근 검색어</h2>
        <Button
          onClick={onClearAll}
          variants="text"
          text="전체 삭제"
          size="sm"
          tone="gray"
        />
      </div>
      <div className="flex flex-col">
        {displayedKeywords.map((keyword) => (
          <SearchHistoryItem
            key={keyword}
            keyword={keyword}
            onClick={onKeywordClick}
            onDelete={onKeywordDelete}
          />
        ))}
      </div>
    </div>
  );
}
