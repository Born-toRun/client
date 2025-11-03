"use client";

import Header from "@/components/header/Header";
import Navigation from "@/components/Navigation";
import MyPageContainer from "@/features/mypage";

/**
 * 마이페이지
 * 사용자의 정보, 활동 내역, 설정 등을 관리하는 페이지
 */
export default function MyPage() {
  return (
    <main>
      {/* 헤더 */}
      <Header title="마이" />

      {/* 마이페이지 컨텐츠 */}
      <MyPageContainer />

      {/* 네비게이션 */}
      <Navigation />
    </main>
  );
}
