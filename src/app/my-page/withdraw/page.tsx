"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLoginBottomSheet } from "@/contexts/LoginBottomSheetContext";
import WithdrawForm from "@/features/mypage/components/WithdrawForm";

/**
 * 회원탈퇴 페이지
 * 사용자가 계정을 삭제할 수 있는 페이지입니다.
 *
 * 주요 기능:
 * - 로그인 필수 (비로그인 시 로그인 모달 표시)
 * - 회원탈퇴 시 주의사항 안내
 * - 탈퇴 확인 체크박스 및 모달
 * - 회원탈퇴 API 호출
 * - 성공 시 로그아웃 및 홈으로 리다이렉트
 *
 * 인증이 필요한 페이지로, 비로그인 사용자는 로그인 모달을 먼저 표시합니다.
 */
export default function WithdrawPage() {
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="body-md text-n-500">로딩 중...</p>
      </div>
    );
  }

  // 인증되지 않은 사용자는 콘텐츠를 표시하지 않음
  // 로그인 모달이 표시되고, 사용자가 로그인하면 페이지가 다시 렌더링됨
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <p className="title-lg text-n-900 text-center">
            로그인이 필요한 페이지입니다
          </p>
          <p className="body-md text-n-500 text-center">
            본투런 회원이 되면 다양한 러닝 활동을 즐길 수 있어요!
          </p>
        </div>
      </div>
    );
  }

  // 인증된 사용자에게만 회원탈퇴 폼 렌더링
  return <WithdrawForm />;
}
