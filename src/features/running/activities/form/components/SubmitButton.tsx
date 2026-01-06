"use client";

import CheckedWhiteIcon from "@/icons/checked-white-icon.svg";

interface SubmitButtonProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  mode: "create" | "edit";
}

/**
 * 모임 등록/수정 제출 버튼 컴포넌트
 */
export default function SubmitButton({
  onSubmit,
  isSubmitting,
  isValid,
  mode,
}: SubmitButtonProps) {
  return (
    <button
      onClick={onSubmit}
      disabled={!isValid || isSubmitting}
      className="bg-rg-400 h-[48px] round-full flex items-center gap-[4px] px-[14px] disabled:bg-n-40 disabled:cursor-not-allowed"
    >
      <CheckedWhiteIcon />
      <span className="label-md text-white overflow-hidden inline-block whitespace-nowrap">
        {isSubmitting ? "저장 중..." : mode === "create" ? "등록" : "수정"}
      </span>
    </button>
  );
}
