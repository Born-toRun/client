"use client";

import BackIcon from "@/icons/back-icon.svg";

interface FeedEditHeaderProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canSubmit: boolean;
}

export default function FeedEditHeader({
  onCancel,
  onSubmit,
  isSubmitting,
  canSubmit,
}: FeedEditHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
      <div className="flex items-center justify-between px-4 h-14">
        <button
          onClick={onCancel}
          className="flex items-center justify-center w-10 h-10"
        >
          <BackIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-black">게시물 수정</h1>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className="px-4 py-[11.5px] bg-rg-400 rounded-[8px] disabled:bg-n-40 cursor-pointer disabled:cursor-not-allowed"
        >
          <p className="text-white title-md leading-[17px]">완료</p>
        </button>
      </div>
    </header>
  );
}
