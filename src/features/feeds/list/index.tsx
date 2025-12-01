"use client";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import CustomDialog from "@/components/CustomDialog";
import MainHeader from "@/components/header/MainHeader";
import LoginBottomSheet from "@/components/LoginBottomSheet";
import Tabs from "@/components/Tabs";
import { useIntersectionObserver } from "@/features/hooks/useIntersectionObserver";
import { useModal } from "@/features/hooks/useModal";
import { useScrollPosition } from "@/features/hooks/useScroll";
import { useEffect, useMemo, useState } from "react";
import { feedCategoryLabel } from "../constants";
import CreateFeedButton from "./components/CreateFeedButton";
import FeedList from "./components/FeedList";
import FeedSkeletons from "./components/FeedSkeletons";
import { useGetFeesListQuery } from "./hooks/queries";
import { FEEDCategory } from "./types";

export default function FeedContainer() {
  const loginModal = useModal();
  const loginBottomSheet = useModal();

  const [selectedTabs, setSelectedTabs] = useState<FEEDCategory>(
    feedCategoryLabel.COMMUNITY
  );
  const [isMyCrew, setIsMyCrew] = useState(false);

  const { data, isPending, hasNextPage, fetchNextPage, error } =
    useGetFeesListQuery({
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

  // Flatten pages and remove duplicates by ID
  const feedList = useMemo(() => {
    const allFeeds = data?.pages.flatMap((page) => page.content) ?? [];
    // Remove duplicates by creating a Map with feed.id as key
    const uniqueFeeds = Array.from(
      new Map(allFeeds.map((feed) => [feed.id, feed])).values()
    );
    return uniqueFeeds;
  }, [data]);
  const isScrolled = useScrollPosition(20);

  useEffect(
    function handleLoginModalEffect() {
      if (error && error.status === 401) {
        loginModal.open();
      }
    },
    [error, loginModal]
  );

  return (
    <>
      <MainHeader selectedTabs={selectedTabs} isScrolled={isScrolled} />
      <div className="pt-[60px] mb-[16px] relative z-30">
        <Tabs
          options={feedListTabOptions}
          selectedTabs={selectedTabs}
          onSelectedTab={setSelectedTabs}
        />
      </div>
      <div className="px-[16px] flex items-center h-[40px] relative z-30">
        <CheckBox
          text="크루 공개 글 보기"
          onChange={() => setIsMyCrew((prev) => !prev)}
          checked={isMyCrew}
        />
      </div>
      {isPending && <FeedSkeletons />}
      <FeedList list={feedList} />
      {feedList && feedList.length > 0 && <div ref={setTargetRef} />}
      <div className="fixed bottom-[58px] left-1/2 -translate-x-1/2 w-full max-w-[786px] flex justify-end px-[16px] pb-[24px] z-2">
        <CreateFeedButton isScrolled={isScrolled} />
      </div>
      <CustomDialog
        open={loginModal.isActive}
        onOpenChange={loginModal.close}
        contents={{
          title: "로그인이 필요해요",
          description:
            "러네이서 회원이 되면 러닝 모임 관리와 소통이 훨씬 간편해져요!",
        }}
        footer={
          <div className="flex w-full justify-between gap-[8px]">
            <Button
              onClick={() => {
                loginModal.close();
                setIsMyCrew(false);
              }}
              variants="text"
              text="닫기"
              size="lg"
              tone="gray"
            />
            <Button
              onClick={() => {
                loginBottomSheet.open();
                loginModal.close();
              }}
              variants="text"
              text="시작하기"
              size="lg"
              tone="green"
            />
          </div>
        }
      />
      <LoginBottomSheet
        onOpenChange={() => {
          loginBottomSheet.close();
          setIsMyCrew(false);
        }}
        open={loginBottomSheet.isActive}
      />
    </>
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
