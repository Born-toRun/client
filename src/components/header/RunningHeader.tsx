"use client";

import Header from "./Header";
import Logo from "@/icons/logo.svg";
import ClipboardCheckIcon from "@/icons/clipboard-check-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";

interface Props {
  isScrolled?: boolean;
}

/**
 * 러닝 페이지 헤더 컴포넌트
 * 로고, 출석체크 아이콘, 검색 아이콘을 표시
 */
export default function RunningHeader({ isScrolled }: Props) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[786px] bg-white z-20">
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
          <div className="flex items-center gap-[8px]">
            <button
              className="size-[40px] flex items-center justify-center"
              aria-label="출석체크"
            >
              <ClipboardCheckIcon />
            </button>
            <button
              className="size-[40px] flex items-center justify-center"
              aria-label="검색"
            >
              <SearchIcon />
            </button>
          </div>
        }
      />
    </div>
  );
}
