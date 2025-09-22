"use client";
import { deleteComment } from "@/apis/comment";
import CopyIcon from "@/icons/copy-icon.svg";
import DeleteIcon from "@/icons/delete-icon.svg";
import EditIcon from "@/icons/edit-icon.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface CommentActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: number;
  feedId: number;
  position: { top: number; left: number };
}

export default function CommentActionModal({
  isOpen,
  onClose,
  commentId,
  feedId,
  position,
}: CommentActionModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const copyClickHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // TODO: 토스트 메시지 표시
      console.log("댓글 링크가 클립보드에 복사되었습니다.");
      onClose();
    } catch (error) {
      console.error("복사 중 오류가 발생했습니다:", error);
    }
  };

  const editClickHandler = () => {
    router.push(`/feeds/${feedId}/comments/${commentId}/edit`);
    onClose();
  };

  const deleteClickHandler = async () => {
    if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteComment(commentId);
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["comment", commentId] });
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
      // TODO: 에러 토스트 메시지 표시
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <>
      <div className="fixed inset-0 bg-transparent z-40" onClick={onClose} />
      <div
        className="fixed bg-white rounded-2xl shadow-2xl z-50 min-w-[172px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="p-2">
          <button
            onClick={copyClickHandler}
            className="flex items-center justify-center gap-3 cursor-pointer w-full px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <CopyIcon className="w-5 h-5" />
            </div>
            <span className="text-black">복사</span>
          </button>
          <button
            onClick={editClickHandler}
            className="flex items-center justify-center gap-3 cursor-pointer w-full px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <EditIcon className="w-5 h-5" />
            </div>
            <span className="text-black">수정</span>
          </button>
          <button
            onClick={deleteClickHandler}
            disabled={isDeleting}
            className="flex items-center justify-center gap-3 cursor-pointer w-full px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <DeleteIcon className="w-5 h-5 text-system-r-400" />
            </div>
            <span className="text-system-r-400">삭제</span>
          </button>
        </div>
      </div>
    </>
  );

  // Portal을 사용해서 786px 제한 컨테이너에 렌더링
  const container = document.getElementById("app-container");
  if (!container) return null;

  return createPortal(modalContent, container as HTMLElement);
}
