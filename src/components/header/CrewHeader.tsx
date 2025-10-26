"use client";

import Header from "./Header";
import Logo from "@/icons/logo.svg";
import ClipboardCheckIcon from "@/icons/clipboard-check-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";

interface Props {
  isScrolled?: boolean;
}

/**
 * 크루 페이지 헤더 컴포넌트
 * 로고/크루 타이틀, 출석체크 아이콘, 검색 아이콘을 표시합니다.
 */
export default function CrewHeader({ isScrolled }: Props) {
  return (
    <div className="fixed w-full bg-white z-20">
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
              <span className="title-xl text-black block p-[8px]">크루</span>
            </div>
          </div>
        }
        right={
          <div className="flex item-center gap-[8px]">
            <button className="size-[40px] flex items-center justify-center">
              <ClipboardCheckIcon />
            </button>

            <button className="size-[40px] flex items-center justify-center">
              <SearchIcon />
            </button>
          </div>
        }
      />
    </div>
  );
}
