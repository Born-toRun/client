"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMyCrewQuery } from "@/features/crews/hooks/queries";
import { useAuth } from "@/hooks/useAuth";
import { useLoginBottomSheet } from "@/contexts/LoginBottomSheetContext";
import { pageRoutes } from "@/constants/route";

/**
 * 내 크루 리다이렉트 페이지
 *
 * 사용자의 크루 정보를 조회하고 해당 크루의 상세 페이지로 리다이렉트합니다.
 * 마이페이지의 "크루" 메뉴 아이템에서 이 페이지로 연결됩니다.
 *
 * 처리 흐름:
 * 1. 인증 상태 확인 (미인증 시 로그인 모달 표시)
 * 2. 내 크루 조회 (GET /api/v1/crews/my)
 * 3. 성공 시: /crew/[crewId]로 리다이렉트
 * 4. 실패 또는 크루 없음: 크루 목록 페이지로 리다이렉트
 */
export default function MyCrewRedirectPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { showLoginModal } = useLoginBottomSheet();

  // 내 크루 조회
  const {
    data: myCrew,
    isPending,
    isError,
  } = useGetMyCrewQuery();

  useEffect(() => {
    // 인증 확인 중이면 대기
    if (isAuthLoading) {
      return;
    }

    // 미인증 사용자: 로그인 모달 표시 후 크루 목록으로 이동
    if (!isAuthenticated) {
      showLoginModal();
      router.replace(pageRoutes.crews.list);
      return;
    }

    // 데이터 로딩 중이면 대기
    if (isPending) {
      return;
    }

    // 크루 조회 성공: 크루 상세 페이지로 리다이렉트
    if (myCrew) {
      router.replace(pageRoutes.crews.detail(myCrew.id));
      return;
    }

    // 크루 조회 실패 또는 크루 없음: 크루 목록 페이지로 리다이렉트
    if (isError || myCrew === null) {
      router.replace(pageRoutes.crews.list);
      return;
    }
  }, [
    isAuthenticated,
    isAuthLoading,
    myCrew,
    isPending,
    isError,
    router,
    showLoginModal,
  ]);

  // 로딩 상태 표시
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 border-4 border-rg-400 border-t-transparent rounded-full animate-spin" />
        <p className="body-md text-n-500">크루 정보를 불러오는 중...</p>
      </div>
    </div>
  );
}
