"use client";

import { useState } from "react";
import { useGetFeesListQuery } from "./hooks/queries";
import { useIntersectionObserver } from "@/features/hooks/useIntersectionObserver";

import MainHeader from "@/components/header/MainHeader";
import Tabs from "@/components/Tabs";
import FeedList from "./components/FeedList";
import CheckBox from "@/components/CheckBox";

import { FEEDCategory } from "./types";
import { feedCategoryLabel } from "../constants";

export default function FeedContainer() {
  const [selectedTabs, setSelectedTabs] = useState<FEEDCategory>(
    feedCategoryLabel.COMMUNITY
  );
  const [isMyCrew, setIsMyCrew] = useState(false);

  const { data, isPending, hasNextPage, fetchNextPage } = useGetFeesListQuery({
    isMyCrew,
    category: selectedTabs as FEEDCategory,
  });

  const { setTargetRef } = useIntersectionObserver({
    onIntersect: () => {
      if (!isPending && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  const feedList = data?.pages.flatMap((feed) => feed.content) ?? [];

  return (
    <div>
      <MainHeader />
      <Tabs
        options={feedListTabOptions}
        selectedTabs={selectedTabs}
        onSelectedTab={setSelectedTabs}
      />
      <div className="px-[16px] flex items-center h-[40px]">
        <CheckBox
          text="크루 공개 글 보기"
          onChange={() => setIsMyCrew((prev) => !prev)}
          checked={isMyCrew}
        />
      </div>
      <div className="">
        <FeedList list={feedList} />
        {feedList && feedList.length > 0 && <div ref={setTargetRef} />}
      </div>
    </div>
  );
}

const feedListTabOptions: { key: FEEDCategory; label: string }[] = [
  {
    key: feedCategoryLabel.COMMUNITY,
    label: "커뮤니티",
  },
  {
    key: feedCategoryLabel.MARKET,
    label: "마켓",
  },
];
