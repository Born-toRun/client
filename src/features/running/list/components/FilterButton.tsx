"use client";

import { ChevronDown } from "lucide-react";

interface Props {
  label: string;
  selectedLabel: string;
  onClick: () => void;
}

/**
 * 필터 버튼 컴포넌트
 * 지역/코스 필터를 선택하기 위한 버튼
 */
export default function FilterButton({ label, selectedLabel, onClick }: Props) {
  const isSelected = selectedLabel !== "전체";

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 round-full border transition-colors ${
        isSelected
          ? "bg-rg-400 border-rg-400 text-white"
          : "bg-white border-n-40 text-n-500 hover:bg-n-10"
      }`}
    >
      <span className="label-sm">{label}</span>
      <span className="body-sm font-medium">{selectedLabel}</span>
      <ChevronDown
        size={16}
        className={`transition-transform ${isSelected ? "text-white" : "text-n-500"}`}
      />
    </button>
  );
}
