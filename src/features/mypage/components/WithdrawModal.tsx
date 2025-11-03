"use client";

import { useState } from "react";
import CustomDialog from "@/components/CustomDialog";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiRoutes } from "@/constants/route";
import { deleteCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/common";

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: () => void;
}

/**
 * 회원탈퇴 확인 모달 컴포넌트
 * - 회원탈퇴 확인 및 처리
 * - 회원탈퇴 API 호출
 * - 로그아웃 및 홈으로 리다이렉트
 */
export default function WithdrawModal({
  open,
  onOpenChange,
}: WithdrawModalProps) {
  const router = useRouter();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    try {
      setIsWithdrawing(true);

      // 회원탈퇴 API 호출
      await axios.delete(apiRoutes.auth.withdraw);

      // 액세스 토큰 삭제
      deleteCookie(ACCESS_TOKEN);

      // 모달 닫기
      onOpenChange();

      // 홈으로 리다이렉트
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      contents={{
        title: "정말 탈퇴하시겠습니까?",
        description:
          "탈퇴하시면 모든 데이터가 삭제되며\n복구할 수 없습니다.",
      }}
      footer={
        <div className="flex flex-col gap-2 w-full">
          <Button
            text={isWithdrawing ? "탈퇴 중..." : "탈퇴하기"}
            variants="danger"
            tone="red"
            size="md"
            onClick={handleWithdraw}
            disabled={isWithdrawing}
            loading={isWithdrawing}
          />
          <Button
            text="취소"
            variants="secondary"
            tone="gray"
            size="md"
            onClick={onOpenChange}
            disabled={isWithdrawing}
          />
        </div>
      }
    />
  );
}
