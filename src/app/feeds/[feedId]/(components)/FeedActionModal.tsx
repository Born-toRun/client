"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface FeedActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedId: number;
}

export default function FeedActionModal({
  isOpen,
  onClose,
  feedId,
}: FeedActionModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const copyClickHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // TODO: 토스트 메시지 표시
      console.log("링크가 클립보드에 복사되었습니다.");
      onClose();
    } catch (error) {
      console.error("복사 중 오류가 발생했습니다:", error);
    }
  };

  const editClickHandler = () => {
    router.push(`/write?feedId=${feedId}`);
    onClose();
  };

  const deleteClickHandler = async () => {
    if (!confirm("정말로 이 피드를 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      // await deleteFeed(feedId);
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      router.push("/");
    } catch (error) {
      console.error("피드 삭제 중 오류가 발생했습니다:", error);
      // TODO: 에러 토스트 메시지 표시
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg z-50 min-w-[200px]">
        <div className="p-2">
          {/* Copy Option */}
          <button
            onClick={copyClickHandler}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-black">복사</span>
          </button>

          {/* Edit Option */}
          <button
            onClick={editClickHandler}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-black">수정</span>
          </button>

          {/* Delete Option */}
          <button
            onClick={deleteClickHandler}
            disabled={isDeleting}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M3 6h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="10"
                  y1="11"
                  x2="10"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="14"
                  y1="11"
                  x2="14"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-red-500">삭제</span>
          </button>
        </div>
      </div>
    </>
  );
}
