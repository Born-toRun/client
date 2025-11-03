"use client";

import { useState } from "react";
import MenuSection from "./components/MenuSection";
import WithdrawModal from "./components/WithdrawModal";
import { MY_PAGE_SECTIONS } from "./constants";

/**
 * 마이페이지 메인 컨테이너 컴포넌트
 * - 메뉴 섹션 목록 렌더링
 * - 회원탈퇴 모달 관리
 */
export default function MyPageContainer() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // 회원탈퇴 메뉴 아이템에 onClick 핸들러 추가
  const sectionsWithHandlers = MY_PAGE_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (item.id === "withdraw") {
        return {
          ...item,
          onClick: () => setIsWithdrawModalOpen(true),
        };
      }
      return item;
    }),
  }));

  return (
    <div className="pt-[68px] pb-[58px]">
      {/* 메뉴 섹션 목록 */}
      {sectionsWithHandlers.map((section) => (
        <MenuSection key={section.title} section={section} />
      ))}

      {/* 회원탈퇴 확인 모달 */}
      <WithdrawModal
        open={isWithdrawModalOpen}
        onOpenChange={() => setIsWithdrawModalOpen(false)}
      />
    </div>
  );
}
