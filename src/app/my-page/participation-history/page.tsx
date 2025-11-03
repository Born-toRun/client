"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLoginBottomSheet } from "@/contexts/LoginBottomSheetContext";
import { ArrowLeft } from "lucide-react";
import ParticipationHistoryList from "@/features/participation-history/ParticipationHistoryList";

/**
 * 참여 기록 페이지
 * 사용자가 참여한 모임 목록을 월별로 표시합니다.
 *
 * - 로그인 필수 페이지
 * - 비로그인 사용자는 로그인 모달 표시
 * - 카드 클릭 시 모임 상세 페이지로 이동
 * - 월별 그룹화 표시
 */
export default function ParticipationHistoryPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { showLoginModal } = useLoginBottomSheet();

  // 로그인 모달이 이미 표시되었는지 추적 (무한 루프 방지)
  const hasShownLoginModal = useRef(false);

  // 인증되지 않은 사용자에게 로그인 모달을 한 번만 표시
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasShownLoginModal.current) {
      showLoginModal();
      hasShownLoginModal.current = true;
    }
  }, [isLoading, isAuthenticated, showLoginModal]);

  // 인증 상태 확인 중일 때는 로딩 메시지 표시 (깜빡임 방지)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* 헤더 */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
          <div className="max-w-[786px] mx-auto flex items-center justify-between h-14 px-4">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-n-10 round-xs"
              aria-label="뒤로가기"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="title-lg text-n-900 absolute left-1/2 transform -translate-x-1/2">
              참여 기록
            </h1>
            <div />
          </div>
        </header>

        {/* 로딩 상태 */}
        <div className="pt-14 flex items-center justify-center min-h-screen">
          <p className="body-md text-n-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 사용자는 콘텐츠를 표시하지 않음
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        {/* 헤더 */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
          <div className="max-w-[786px] mx-auto flex items-center justify-between h-14 px-4">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-n-10 round-xs"
              aria-label="뒤로가기"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="title-lg text-n-900 absolute left-1/2 transform -translate-x-1/2">
              참여 기록
            </h1>
            <div />
          </div>
        </header>

        {/* 비인증 상태 메시지 */}
        <div className="pt-14 min-h-screen flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <p className="title-lg text-n-900 text-center">
              로그인이 필요한 페이지입니다
            </p>
            <p className="body-md text-n-500 text-center">
              본투런 회원이 되면 참여 기록을 확인할 수 있어요!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 인증된 사용자에게만 참여 기록 렌더링
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
        <div className="max-w-[786px] mx-auto flex items-center justify-between h-14 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-n-10 round-xs"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="title-lg text-n-900 absolute left-1/2 transform -translate-x-1/2">
            참여 기록
          </h1>
          <div />
        </div>
      </header>

      {/* 컨텐츠 */}
      <main className="pt-14">
        <ParticipationHistoryList />
      </main>
    </div>
  );
}
