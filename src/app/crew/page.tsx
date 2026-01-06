"use client";

import { useEffect, useRef } from "react";
import CrewHeader from "@/components/header/CrewHeader";
import Navigation from "@/components/Navigation";
import CrewContainer from "@/features/crews";
import { useScrollPosition } from "@/features/hooks/useScroll";
import { useAuth } from "@/hooks/useAuth";
import { useLoginBottomSheet } from "@/contexts/LoginBottomSheetContext";

/**
 * 크루 페이지
 * 내 크루와 전체 크루 목록 표시
 *
 * 인증이 필요한 페이지로, 비로그인 사용자는 로그인 모달을 먼저 표시합니다.
 */
export default function CrewPage() {
  const isScrolled = useScrollPosition(20);
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

  // 인증 상태 확인 중일 때는 빈 화면 표시 (깜빡임 방지)
  if (isLoading) {
    return (
      <main>
        <CrewHeader isScrolled={false} />
        <div className="pt-[68px] pb-[58px] flex items-center justify-center min-h-[50vh]">
          <p className="body-md text-n-500">로딩 중...</p>
        </div>
        <Navigation />
      </main>
    );
  }

  // 인증되지 않은 사용자는 콘텐츠를 표시하지 않음
  // 로그인 모달이 표시되고, 사용자가 로그인하면 페이지가 다시 렌더링됨
  if (!isAuthenticated) {
    return (
      <main>
        <CrewHeader isScrolled={false} />
        <div className="pt-[68px] pb-[58px] flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-4 px-4">
            <p className="title-lg text-n-900 text-center">
              로그인이 필요한 페이지입니다
            </p>
            <p className="body-md text-n-500 text-center">
              본투런 회원이 되면 크루를 관리하고 소통할 수 있어요!
            </p>
          </div>
        </div>
        <Navigation />
      </main>
    );
  }

  // 인증된 사용자에게만 크루 콘텐츠 표시
  return (
    <main>
      <CrewHeader isScrolled={isScrolled} />
      <CrewContainer />
      <Navigation />
    </main>
  );
}
