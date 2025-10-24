"use client";

import { useState, useEffect } from "react";
import CloseIcon from "@/icons/close-icon.svg";
import Button from "@/components/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "@/components/Sheet";
import { Check } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onApply: (value: string) => void;
}

/**
 * 필터 바텀시트 컴포넌트
 * 지역/코스 필터 선택을 위한 바텀시트
 */
export default function FilterBottomSheet({
  open,
  onOpenChange,
  title,
  options,
  selectedValue,
  onApply,
}: Props) {
  // 임시 선택 상태 (적용 전까지 유지)
  const [tempSelected, setTempSelected] = useState(selectedValue);
  // 적용 여부 플래그
  const [isApplied, setIsApplied] = useState(false);

  // 바텀시트가 열릴 때 현재 선택된 값으로 초기화
  useEffect(() => {
    if (open) {
      setTempSelected(selectedValue);
      setIsApplied(false);
    }
  }, [open, selectedValue]);

  // Sheet의 onOpenChange 래퍼 (overlay 클릭이나 ESC로 닫을 때 취소 처리)
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isApplied) {
      // 닫히는 경우이고 적용하지 않은 경우 (취소)
      setTempSelected(selectedValue); // 원래 값으로 복원
    }
    onOpenChange();
  };

  // 취소
  const handleCancel = () => {
    setTempSelected(selectedValue); // 원래 값으로 복원
    setIsApplied(false);
    onOpenChange();
  };

  // 적용
  const handleApply = () => {
    setIsApplied(true);
    onApply(tempSelected);
    onOpenChange();
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        className="w-full max-w-[786px] mx-auto h-auto max-h-[80vh] bg-white rounded-t-[16px] flex flex-col"
        side="bottom"
      >
        {/* 헤더 */}
        <SheetHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-n-30">
          <SheetTitle className="title-lg text-n-900">{title}</SheetTitle>
          <button
            onClick={handleCancel}
            className="size-10 flex items-center justify-center"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </SheetHeader>

        {/* 필터 옵션 그리드 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => setTempSelected(option.value)}
                className={`relative flex items-center justify-center px-4 py-3 round-sm border transition-all ${
                  tempSelected === option.value
                    ? "bg-rg-400 border-rg-400 text-white"
                    : "bg-white border-n-40 text-n-900 hover:bg-n-10"
                }`}
              >
                <span className="label-sm text-center truncate">
                  {option.label}
                </span>
                {tempSelected === option.value && (
                  <Check size={16} className="absolute top-1 right-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 푸터 (취소/적용 버튼) */}
        <SheetFooter className="flex flex-row gap-2 px-4 py-4 border-t border-n-30">
          <Button
            onClick={handleCancel}
            variants="secondary"
            text="취소"
            size="lg"
            tone="gray"
            className="flex-1"
          />
          <Button
            onClick={handleApply}
            variants="primary"
            text="적용"
            size="lg"
            tone="green"
            className="flex-1"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
