"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useDeleteUserMutation } from "@/hooks/useUser";
import { TokenManager } from "@/utils/token";
import { pageRoutes } from "@/constants/route";
import Button from "@/components/Button";
import CustomDialog from "@/components/CustomDialog";

/**
 * 회원탈퇴 폼 컴포넌트
 * 회원탈퇴를 위한 경고 메시지와 확인 절차를 제공합니다.
 *
 * 주요 기능:
 * - 회원탈퇴 시 주의사항 안내
 * - 탈퇴 확인 체크박스
 * - 탈퇴 확인 모달
 * - 회원탈퇴 API 호출 및 에러 핸들링
 * - 성공 시 로그아웃 및 홈으로 리다이렉트
 */
export default function WithdrawForm() {
  const router = useRouter();
  const deleteUserMutation = useDeleteUserMutation();

  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  /**
   * 탈퇴하기 버튼 클릭 핸들러
   * 확인 모달을 표시합니다.
   */
  const handleWithdrawClick = () => {
    setIsModalOpen(true);
  };

  /**
   * 최종 탈퇴 확인 핸들러
   * 회원탈퇴 API를 호출하고 성공 시 로그아웃 처리합니다.
   */
  const handleConfirmWithdraw = async () => {
    try {
      setIsWithdrawing(true);

      // 회원탈퇴 API 호출
      await deleteUserMutation.mutateAsync();

      // 액세스 토큰 삭제 (로그아웃)
      TokenManager.removeAccessToken();

      // 성공 토스트 표시
      toast.success("회원탈퇴가 완료되었습니다.", {
        description: "그동안 본투런을 이용해주셔서 감사합니다.",
      });

      // 모달 닫기
      setIsModalOpen(false);

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
    <>
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-n-30">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => router.back()}
            className="size-10 flex items-center justify-center"
            aria-label="뒤로가기"
            disabled={isWithdrawing}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="title-md text-n-900">회원탈퇴</h1>
          <div className="size-10" /> {/* 헤더 중앙 정렬을 위한 빈 공간 */}
        </div>
      </header>

      {/* 본문 */}
      <main className="flex flex-col min-h-screen pt-14">
        <div className="flex-1 px-4 py-6 flex flex-col gap-6">
          {/* 경고 메시지 */}
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-system-r-50 border border-system-r-200 rounded-lg">
              <h2 className="title-md text-system-r-500 mb-2">
                정말 탈퇴하시겠습니까?
              </h2>
              <p className="body-md text-n-700 whitespace-pre-line">
                탈퇴하시면 아래 정보가 모두 삭제되며{"\n"}복구할 수 없습니다.
              </p>
            </div>

            {/* 삭제될 정보 안내 */}
            <div className="flex flex-col gap-3 px-4">
              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-n-500 mt-2" />
                <div>
                  <p className="label-md text-n-900">활동 기록</p>
                  <p className="body-sm text-n-500">
                    작성한 피드, 댓글, 모임 참여 기록 등
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-n-500 mt-2" />
                <div>
                  <p className="label-md text-n-900">프로필 정보</p>
                  <p className="body-sm text-n-500">
                    닉네임, 프로필 사진, 인스타그램 계정 등
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-n-500 mt-2" />
                <div>
                  <p className="label-md text-n-900">크루 정보</p>
                  <p className="body-sm text-n-500">
                    가입한 크루 정보 및 활동 내역
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-n-500 mt-2" />
                <div>
                  <p className="label-md text-n-900">북마크 정보</p>
                  <p className="body-sm text-n-500">
                    저장한 마라톤 및 모임 정보
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-n-30" />

          {/* 탈퇴 사유 안내 (선택) */}
          <div className="flex flex-col gap-3">
            <h3 className="label-lg text-n-900">탈퇴 전 확인해주세요</h3>
            <p className="body-md text-n-500">
              불편하신 점이나 개선이 필요한 부분이 있으시다면{" "}
              <button
                onClick={() => router.push(pageRoutes.myPage.contact)}
                className="text-rg-400 underline inline"
              >
                개발자 문의
              </button>
              를 통해 알려주세요. 더 나은 서비스를 만들기 위해 노력하겠습니다.
            </p>
          </div>

          {/* 확인 체크박스 */}
          <label className="flex items-start gap-3 cursor-pointer p-4 bg-n-10 rounded-lg">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-0.5 size-5 accent-rg-400 cursor-pointer"
              disabled={isWithdrawing}
            />
            <span className="body-md text-n-900 flex-1">
              위 내용을 모두 확인했으며, 회원탈퇴에 동의합니다.
            </span>
          </label>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="sticky bottom-0 bg-white border-t border-n-30 p-4">
          <Button
            text="탈퇴하기"
            variants="danger"
            tone="red"
            size="lg"
            onClick={handleWithdrawClick}
            disabled={!isAgreed || isWithdrawing}
            loading={isWithdrawing}
          />
        </div>
      </main>

      {/* 탈퇴 확인 모달 */}
      <CustomDialog
        open={isModalOpen}
        onOpenChange={() => !isWithdrawing && setIsModalOpen(false)}
        contents={{
          title: "정말 탈퇴하시겠습니까?",
          description:
            "탈퇴하시면 모든 데이터가 삭제되며\n복구할 수 없습니다.",
        }}
        footer={
          <div className="flex flex-col gap-2 w-full">
            <Button
              text={isWithdrawing ? "탈퇴 처리 중..." : "탈퇴하기"}
              variants="danger"
              tone="red"
              size="md"
              onClick={handleConfirmWithdraw}
              disabled={isWithdrawing}
              loading={isWithdrawing}
            />
            <Button
              text="취소"
              variants="secondary"
              tone="gray"
              size="md"
              onClick={() => setIsModalOpen(false)}
              disabled={isWithdrawing}
            />
          </div>
        }
      />
    </>
  );
}
