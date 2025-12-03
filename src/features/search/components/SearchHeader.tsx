"use client";

import { useEffect, useRef } from "react";
import CloseIcon from "@/icons/close-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";

interface SearchHeaderProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

/**
 * 검색 헤더 컴포넌트 (닫기 버튼 + 검색창)
 */
export default function SearchHeader({
  value,
  onChange,
  onSearch,
  onClose,
  isLoading = false,
}: SearchHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 입력창에 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="flex items-center gap-[12px] px-[16px] py-[12px] bg-white border-b border-n-100">
      <button
        onClick={onClose}
        className="size-[24px] flex items-center justify-center flex-shrink-0"
        type="button"
        aria-label="검색 닫기"
      >
        <CloseIcon className="size-[20px]" />
      </button>
      <div className="flex-1 flex items-center gap-[8px] px-[12px] py-[8px] bg-n-50 rounded-[8px]">
        <SearchIcon className="size-[20px] text-n-200 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          className="flex-1 body-lg text-black placeholder:text-n-200 bg-transparent outline-none"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
