"use client";

import CloseIcon from "@/icons/close-icon.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { Copy, Edit, Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  isMyActivity: boolean;
  onCopyContent: () => void;
  onEdit?: () => void;
  onDelete: () => void;
}

/**
 * 액션 시트 컴포넌트
 * 더보기 메뉴에서 표시되는 액션들
 */
export default function ActionSheet({
  open,
  onOpenChange,
  isMyActivity,
  onCopyContent,
  onEdit,
  onDelete,
}: Props) {
  const handleAction = (action: () => void) => {
    action();
    onOpenChange();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full max-w-[786px] mx-auto h-auto bg-white rounded-t-[16px] flex flex-col"
        side="bottom"
      >
        {/* 헤더 */}
        <SheetHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-n-30">
          <SheetTitle className="title-lg text-n-900">더보기</SheetTitle>
          <button
            onClick={onOpenChange}
            className="size-10 flex items-center justify-center"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </SheetHeader>

        {/* 액션 목록 */}
        <div className="p-4 space-y-2">
          {/* 내용 복사 (모두) */}
          <button
            onClick={() => handleAction(onCopyContent)}
            className="w-full flex items-center gap-3 p-4 hover:bg-n-10 round-sm transition-colors"
          >
            <Copy size={20} className="text-n-500" />
            <span className="label-md text-n-900">내용 복사</span>
          </button>

          {/* 수정 (작성자만) */}
          {isMyActivity && onEdit && (
            <button
              onClick={() => handleAction(onEdit)}
              className="w-full flex items-center gap-3 p-4 hover:bg-n-10 round-sm transition-colors"
            >
              <Edit size={20} className="text-n-500" />
              <span className="label-md text-n-900">수정</span>
            </button>
          )}

          {/* 모임 취소 (작성자만) */}
          {isMyActivity && (
            <button
              onClick={() => handleAction(onDelete)}
              className="w-full flex items-center gap-3 p-4 hover:bg-n-10 round-sm transition-colors"
            >
              <Trash2 size={20} className="text-system-r-400" />
              <span className="label-md text-system-r-400">모임 취소</span>
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
