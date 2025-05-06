"use client";

import { useState } from "react";
import { useGetFeesListQuery } from "./hooks/queries";

import MainHeader from "@/components/header/MainHeader";
import Tabs from "@/components/Tabs";
import FeedList from "./components/FeedList";

import { FEEDCategory } from "./types";
import { feedCategoryLabel } from "../constants";

export default function FeedContainer() {
  const [selectedTabs, setSelectedTabs] = useState<FEEDCategory>(
    feedCategoryLabel.COMMUNITY
  );
  const [isMyCrew, setIsMyCrew] = useState(false);

  const { data } = useGetFeesListQuery({
    isMyCrew,
    category: selectedTabs as FEEDCategory,
  });
  const feedList = data?.pages;

  return (
    <div>
      <MainHeader />
      <Tabs
        options={feedListTabOptions}
        selectedTabs={selectedTabs}
        onSelectedTab={setSelectedTabs}
      />
      <div className="pt-[16px]"></div>
      <FeedList list={feedList} />
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
