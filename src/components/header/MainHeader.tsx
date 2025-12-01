"use client";

import Header from "./Header";
import Logo from "@/icons/logo.svg";
import ClipboardCheckIcon from "@/icons/clipboard-check-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";
import { FEEDCategory } from "@/features/feeds/list/types";

interface Props {
  selectedTabs?: FEEDCategory;
  isScrolled?: boolean;
}

export default function MainHeader({ selectedTabs, isScrolled }: Props) {
  const tabLabel = selectedTabs === "COMMUNITY" ? "커뮤니티" : "마켓";

  const handleAttendanceClick = () => {
    console.log("출석체크 아이콘 클릭");
    // TODO: 출석체크 또는 활동 페이지로 이동
  };

  const handleSearchClick = () => {
    console.log("검색 아이콘 클릭");
    // TODO: 검색 기능 구현
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[786px] h-[56px] bg-white z-40 pointer-events-none">
      <Header
        left={
          <div className="h-[40px] flex items-center">
            {!isScrolled ? (
              <div className="transition-opacity duration-300 ease-in-out opacity-100">
                <Logo />
              </div>
            ) : (
              <div className="transition-opacity duration-300 ease-in-out opacity-100">
                <span className="title-xl text-black block p-[8px]">
                  {tabLabel}
                </span>
              </div>
            )}
          </div>
        }
        right={
          <div className="flex item-center gap-[8px] relative z-30 pointer-events-auto">
            <button
              onClick={handleAttendanceClick}
              className="size-[40px] flex items-center justify-center relative z-30 cursor-pointer pointer-events-auto"
              type="button"
            >
              <ClipboardCheckIcon />
            </button>

            <button
              onClick={handleSearchClick}
              className="size-[40px] flex items-center justify-center relative z-30 cursor-pointer pointer-events-auto"
              type="button"
            >
              <SearchIcon />
            </button>
          </div>
        }
      />
    </div>
  );
}
