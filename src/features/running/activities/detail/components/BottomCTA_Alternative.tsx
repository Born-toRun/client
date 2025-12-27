"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { Users } from "lucide-react";
import { Participant, Host, RecruitmentType } from "@/apis/activity/types";

interface Props {
  isMyActivity: boolean;
  isParticipating: boolean;
  participantsQty: number;
  host?: Host;
  participants?: Participant[];
  joinMutation: {
    mutate: (activityId: number) => void;
    isPending: boolean;
  };
  recruitmentType: RecruitmentType;
  activityId: number;
  onParticipantsClick: () => void;
  onAttendanceClick: () => void;
}

/**
 * 하단 CTA 컴포넌트 - 대안: 참여자 정보 없이 버튼만 강조
 *
 * 디자인 원칙:
 * 1. 예약하기 버튼만 표시 (절대적 단순함)
 * 2. 총 높이 64px로 최소화
 * 3. 참여자 정보는 페이지 본문에서만 확인
 * 4. Booking.com, 배민 스타일의 강력한 단일 CTA
 */
export default function BottomCTA({
  isMyActivity,
  isParticipating,
  participantsQty,
  host,
  participants = [],
  joinMutation,
  recruitmentType,
  activityId,
  onParticipantsClick,
  onAttendanceClick,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Ultra minimal bar - 버튼만 */}
      <div className="bg-white border-t border-n-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="max-w-[786px] mx-auto px-4 py-2.5">
          {isMyActivity ? (
            // 작성자: 출석체크
            <Button
              text="출석체크"
              variants="primary"
              size="lg"
              tone="green"
              onClick={onAttendanceClick}
              className="h-12 rounded-xl font-bold text-base shadow-lg shadow-rg-500/20 hover:shadow-xl hover:shadow-rg-500/30 active:scale-[0.98] transition-all"
            />
          ) : isParticipating ? (
            // 참여 중: 출석체크
            <Button
              text="출석체크"
              variants="primary"
              size="lg"
              tone="green"
              onClick={onAttendanceClick}
              className="h-12 rounded-xl font-bold text-base shadow-lg shadow-rg-500/20 hover:shadow-xl hover:shadow-rg-500/30 active:scale-[0.98] transition-all"
            />
          ) : (
            // 미참여: 예약하기 - 가장 강력하게
            <Button
              text="예약하기"
              variants="primary"
              size="lg"
              tone="green"
              onClick={() => joinMutation.mutate(activityId)}
              disabled={
                joinMutation.isPending ||
                recruitmentType === "FULL" ||
                recruitmentType === "CLOSED"
              }
              loading={joinMutation.isPending}
              className="h-12 rounded-xl font-bold text-base shadow-lg shadow-rg-500/20 hover:shadow-xl hover:shadow-rg-500/30 active:scale-[0.98] transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
}
