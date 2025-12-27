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
 * 하단 CTA 컴포넌트 - Floating Action Button (Airbnb 스타일)
 *
 * 디자인 원칙:
 * 1. 우측 하단에 floating 버튼
 * 2. 컨텐츠를 전혀 가리지 않음
 * 3. 참여자 수를 버튼 내부에 표시
 * 4. 모바일 친화적 위치 (thumb zone)
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
  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isMyActivity || isParticipating) {
      return "출석체크";
    }
    return participantsQty > 0 ? `예약하기 (${participantsQty}명)` : "예약하기";
  };

  // 버튼 클릭 핸들러
  const handleClick = () => {
    if (isMyActivity || isParticipating) {
      onAttendanceClick();
    } else {
      joinMutation.mutate(activityId);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-4 z-40">
        <button
          onClick={handleClick}
          disabled={
            !isMyActivity &&
            !isParticipating &&
            (joinMutation.isPending ||
              recruitmentType === "FULL" ||
              recruitmentType === "CLOSED")
          }
          className="
            group
            flex items-center gap-2
            px-6 py-3.5
            bg-gradient-to-r from-rg-500 to-rg-600
            hover:from-rg-600 hover:to-rg-700
            text-white
            rounded-full
            shadow-[0_8px_24px_rgba(82,196,26,0.4)]
            hover:shadow-[0_12px_32px_rgba(82,196,26,0.5)]
            active:scale-95
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            font-bold text-base
          "
        >
          {joinMutation.isPending ? (
            <div className="flex items-center gap-2">
              <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>처리중...</span>
            </div>
          ) : (
            getButtonText()
          )}
        </button>
      </div>

      {/* 참여자 정보 (별도 floating chip - 선택사항) */}
      {participantsQty > 0 && !isMyActivity && (
        <button
          onClick={onParticipantsClick}
          className="
            fixed bottom-24 right-4 z-40
            flex items-center gap-2
            px-4 py-2
            bg-white
            rounded-full
            shadow-lg
            hover:shadow-xl
            transition-shadow
            border border-n-100
          "
        >
          <div className="flex items-center -space-x-2">
            {participants.slice(0, 3).map((participant, index) => (
              <div
                key={participant.userId || index}
                className="relative size-6 rounded-full overflow-hidden bg-gradient-to-br from-rg-400 to-rg-600 ring-2 ring-white"
                style={{ zIndex: 3 - index }}
              >
                {participant.profileImageUri ? (
                  <Image
                    src={participant.profileImageUri}
                    alt={participant.userName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center text-white text-[9px] font-semibold">
                    {participant.userName[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Users size={16} className="text-n-600" />
          <span className="text-sm font-medium text-n-700">{participantsQty}</span>
        </button>
      )}
    </>
  );
}
