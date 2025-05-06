"use client";

import Header from "./Header";
import Logo from "@/icons/logo.svg";
import ClipboardCheckIcon from "@/icons/clipboard-check-icon.svg";
import SearchIcon from "@/icons/search-icon.svg";

export default function MainHeader() {
  return (
    <Header
      left={<Logo />}
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
  );
}
