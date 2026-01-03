"use client";

import { useState } from "react";
import CustomDialog from "@/components/CustomDialog";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeleteUserMutation } from "@/hooks/useUser";
import { TokenManager } from "@/utils/token";
import { pageRoutes } from "@/constants/route";

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
  const deleteUserMutation = useDeleteUserMutation();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    try {
      setIsWithdrawing(true);

      // 회원탈퇴 API 호출 (runApi를 통해 자동으로 토큰 포함)
      await deleteUserMutation.mutateAsync();

      // 액세스 토큰 삭제 (로그아웃)
      TokenManager.removeAccessToken();

      // 성공 토스트 표시
      toast.success("회원탈퇴가 완료되었습니다.", {
        description: "그동안 본투런을 이용해주셔서 감사합니다.",
      });

      // 모달 닫기
      onOpenChange();

      // 홈으로 리다이렉트
      router.push(pageRoutes.feeds.list);
      router.refresh();
    } catch (error) {
      console.error("회원탈퇴 실패:", error);

      // 에러 토스트 표시
      toast.error("회원탈퇴에 실패했습니다.", {
        description: "잠시 후 다시 시도해주세요.",
      });
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
