"use client";
import CheckBox from "@/components/CheckBox";
import Header from "@/components/header/Header";
import CloseIcon from "@/icons/close-icon.svg";
import ArrowDownIcon from "@/icons/arrow-down-icon.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategorySelectModal from "./CategorySelectModal";
import { feedCategoryLabel } from "../feeds/constants";

export default function WriteContainer() {
  const router = useRouter();
  const [seeOnlyMyCrew, setSeeOnlyMyCrew] = useState(false); // IN_CREW or ALL
  const [contents, setContents] = useState("");
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    feedCategoryLabel.COMMUNITY
  );

  const categorySelectClickHandler = () => {
    setIsCategorySelectOpen((prev) => !prev);
  };

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
  };

  const categorySelectModalOpenChangeHandler = (isOpen: boolean) => {
    setIsCategorySelectOpen(isOpen);
  };

  const postingClickHandler = () => {
    const isInCrew = seeOnlyMyCrew ? "IN_CREW" : "ALL";
    console.log(selectedCategory, contents, isInCrew);
  };

  const CATEGORY_OPTIONS = [
    {
      value: feedCategoryLabel.COMMUNITY,
      label: "커뮤니티",
    },
    {
      value: feedCategoryLabel.MARKET,
      label: "마켓",
    },
  ];

  return (
    <main>
      <Header
        left={
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <CloseIcon />
          </button>
        }
        title="글쓰기"
        right={
          <button
            className="px-4 py-[11.5px] bg-rg-400 rounded-[8px] disabled:bg-n-40 cursor-pointer"
            disabled={!contents}
            onClick={postingClickHandler}
          >
            <p className="text-white title-md leading-[17px]">게시</p>
          </button>
        }
      />
      <div className="h-16 px-4 flex items-center justify-between border-t border-n-30">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={categorySelectClickHandler}
        >
          <p className="label-md">
            {selectedCategory === feedCategoryLabel.COMMUNITY
              ? "커뮤니티"
              : "마켓"}
          </p>
          {isCategorySelectOpen ? (
            <ArrowDownIcon className="rotate-180" />
          ) : (
            <ArrowDownIcon />
          )}
        </div>
        <div>
          <CheckBox
            text="크루만 공개하기"
            onChange={() => setSeeOnlyMyCrew((prev) => !prev)}
            checked={seeOnlyMyCrew}
          />
        </div>
      </div>
      <div className="h-[96px] px-4 flex items-center gap-2 border-t border-n-30">
        <div className="w-[64px] h-[64px] bg-n-30 rounded-[8px]" />
        <div>이미지 추가</div>
      </div>
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        className="w-full h-[calc(100dvh-216px)] px-4 py-3 border-t border-n-30"
        placeholder="러닝 후기를 공유해 보세요!"
      />
      <CategorySelectModal
        open={isCategorySelectOpen}
        onOpenChange={categorySelectModalOpenChangeHandler}
        options={CATEGORY_OPTIONS}
        value={selectedCategory}
        onChange={handleCategorySelect}
      />
    </main>
  );
}

// 56 + 64 + 96 = 216
