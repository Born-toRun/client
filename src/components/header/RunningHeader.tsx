"use client";

import { useState } from "react";
import Header from "./Header";
import Logo from "@/icons/logo.svg";
import ClipboardCheckIcon from "@/icons/clipboard-check-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";
import SearchOverlay from "@/features/search/SearchOverlay";
import { useSearchContext } from "@/features/running/contexts/SearchContext";

interface Props {
  isScrolled?: boolean;
}

/**
 * 러닝 페이지 헤더 컴포넌트
 * 로고, 출석체크 아이콘, 검색 아이콘을 표시
 */
export default function RunningHeader({ isScrolled }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setSearchKeyword } = useSearchContext();

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleSearch = (keyword: string) => {
    // 검색어를 컨텍스트에 저장하여 RunningContainer에서 필터링
    setSearchKeyword(keyword);
  };

  const handleAttendanceClick = () => {
    // 출석체크 기능 구현
    console.log("출석체크 클릭");
    // TODO: 출석체크 페이지로 이동하거나 모달 표시
    // 예: router.push('/attendance');
  };

  return (
    <>
      <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[786px] bg-white z-20 pointer-events-none">
        <Header
          left={
            <div className="h-[40px] flex items-center">
              <div
                className={`transition-opacity duration-300 ease-in-out ${
                  isScrolled ? "opacity-0 absolute" : "opacity-100"
                }`}
              >
                <Logo />
              </div>
              <div
                className={`transition-opacity duration-300 ease-in-out ${
                  isScrolled ? "opacity-100" : "opacity-0 absolute"
                }`}
              >
                <span className="title-xl text-black block p-[8px]">러닝</span>
              </div>
            </div>
          }
          right={
            <div className="flex items-center gap-[8px] pointer-events-auto">
              <button
                onClick={handleAttendanceClick}
                className="size-[40px] flex items-center justify-center cursor-pointer hover:bg-n-10 rounded-full transition-colors"
                aria-label="출석체크"
              >
                <ClipboardCheckIcon />
              </button>
              <button
                onClick={handleSearchClick}
                className="size-[40px] flex items-center justify-center cursor-pointer hover:bg-n-10 rounded-full transition-colors"
                aria-label="검색"
              >
                <SearchIcon />
              </button>
            </div>
          }
        />
      </div>

      {/* 검색 오버레이 */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={handleSearchClose}
        onSearch={handleSearch}
      />
    </>
  );
}
