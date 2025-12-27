"use client";

import Button from "@/components/Button";
import { Users, CheckCircle2, Calendar } from "lucide-react";
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
 * 옵션 2: 미니멀 직관형
 * - 참여자 정보를 아이콘+숫자로 축약
 * - 버튼에 집중
 * - 극도로 심플한 UI
 */
export default function BottomCTA({
  isMyActivity,
  isParticipating,
  participantsQty,
  joinMutation,
  recruitmentType,
  activityId,
  onParticipantsClick,
  onAttendanceClick,
}: Props) {
  const isDisabled =
    joinMutation.isPending ||
    recruitmentType === "FULL" ||
    recruitmentType === "CLOSED";

  // 버튼 텍스트와 아이콘 결정
  const getButtonConfig = () => {
    if (isMyActivity || isParticipating) {
      return {
        text: "출석체크",
        icon: CheckCircle2,
        subtitle: isMyActivity
          ? "최종 인원과 금액을 확인하고 출석체크를 해주세요"
          : "모임장에게 코드를 받은 뒤 출석체크를 해주세요",
      };
    }

    if (recruitmentType === "FULL") {
      return {
        text: "모집 마감",
        icon: Calendar,
        subtitle: null,
      };
    }

    if (recruitmentType === "CLOSED") {
      return {
        text: "모집 종료",
        icon: Calendar,
        subtitle: null,
      };
    }

    return {
      text: "예약하기",
      icon: Calendar,
      subtitle: "지금 바로 참여하세요",
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-transparent z-40">
      {/* Minimal gradient fade */}
      <div className="h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

      {/* Main container */}
      <div className="bg-white border-t border-n-100 px-4 pb-6 pt-4">
        <div className="max-w-[786px] mx-auto space-y-4">
          {/* Minimal Participant Info */}
          {participantsQty > 0 && (
            <button
              onClick={onParticipantsClick}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-rg-50 transition-colors active:bg-rg-100"
            >
              <div className="flex items-center justify-center size-8 rounded-full bg-rg-100">
                <Users size={16} className="text-rg-600" />
              </div>
              <span className="text-sm font-semibold text-n-800">
                {participantsQty}명이 함께해요
              </span>
            </button>
          )}

          {/* Subtitle if exists */}
          {buttonConfig.subtitle && (
            <p className="text-center text-[13px] text-n-600 leading-relaxed px-4">
              {buttonConfig.subtitle}
            </p>
          )}

          {/* Large CTA Button */}
          {isMyActivity || isParticipating ? (
            <Button
              text={buttonConfig.text}
              variants="primary"
              size="lg"
              tone="green"
              onClick={onAttendanceClick}
              className="h-[64px] rounded-2xl font-bold text-base shadow-lg shadow-rg-500/25 hover:shadow-xl hover:shadow-rg-500/35 transition-all"
            />
          ) : (
            <Button
              text={buttonConfig.text}
              variants="primary"
              size="lg"
              tone="green"
              onClick={() => joinMutation.mutate(activityId)}
              disabled={isDisabled}
              loading={joinMutation.isPending}
              className="h-[64px] rounded-2xl font-bold text-base shadow-lg shadow-rg-500/25 hover:shadow-xl hover:shadow-rg-500/35 transition-all disabled:shadow-none"
            />
          )}

          {/* Safe area spacing */}
          <div className="h-1" />
        </div>
      </div>
    </div>
  );
}
