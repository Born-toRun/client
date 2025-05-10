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
          <div>
            {isScrolled ? (
              <span className="title-xl text-black block p-[8px]">
                {tabLabel}
              </span>
            ) : (
              <Logo />
            )}
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
