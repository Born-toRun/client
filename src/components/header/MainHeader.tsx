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
              <span className="title-xl text-black block p-[8px]">
                {tabLabel}
              </span>
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
