"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { ChevronRight, Users } from "lucide-react";
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
 * 옵션 1: 통합 카드 스타일
 * - 모든 요소를 하나의 카드로 통합
 * - 시각적 계층 강화
 * - 프리미엄한 느낌
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
  // 참여자 데이터 준비
  const participantsWithoutHost = host
    ? participants.filter((p) => p.userId !== host.userId)
    : participants;

  const allParticipants = host
    ? [host, ...participantsWithoutHost.slice(0, 2)]
    : participants.slice(0, 3);

  const remainingCount = Math.max(0, participantsQty - allParticipants.length);

  // 버튼 상태 결정
  const isDisabled =
    joinMutation.isPending ||
    recruitmentType === "FULL" ||
    recruitmentType === "CLOSED";

  // 설명 텍스트
  const getDescriptionText = () => {
    if (isMyActivity) {
      return "모임에 모두 참석 하셨나요? 최종 인원과 금액을 확인하고 출석체크를 해주세요.";
    }
    if (isParticipating) {
      return "모임에 참석 하셨나요? 모임장에게 코드를 받은 뒤 출석체크를 해주세요.";
    }
    return null;
  };

  const descriptionText = getDescriptionText();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-transparent z-40">
      {/* Enhanced gradient fade */}
      <div className="h-20 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />

      {/* Main container */}
      <div className="bg-white px-4 pb-6 pt-2">
        <div className="max-w-[786px] mx-auto">
          {/* Unified Card */}
          <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-n-100 overflow-hidden">
            {/* Participants Section - Only show if there are participants */}
            {participantsQty > 0 && (
              <button
                onClick={onParticipantsClick}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-rg-50 transition-all duration-200 active:bg-rg-100 border-b border-n-100"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar Stack */}
                  <div className="flex items-center -space-x-2.5">
                    {allParticipants.map((participant, index) => (
                      <div
                        key={participant.userId || index}
                        className="relative size-10 rounded-full overflow-hidden bg-white ring-2 ring-white shadow-md transition-transform hover:scale-110"
                        style={{ zIndex: allParticipants.length - index }}
                      >
                        {participant.profileImageUri ? (
                          <Image
                            src={participant.profileImageUri}
                            alt={participant.userName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center bg-gradient-to-br from-rg-400 to-rg-600 text-white text-sm font-bold">
                            {participant.userName[0]}
                          </div>
                        )}
                      </div>
                    ))}
                    {remainingCount > 0 && (
                      <div
                        className="relative size-10 rounded-full bg-gradient-to-br from-rg-500 to-rg-700 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-md"
                        style={{ zIndex: 0 }}
                      >
                        +{remainingCount}
                      </div>
                    )}
                  </div>

                  {/* Participant count */}
                  <div className="flex items-center gap-1.5">
                    <Users size={18} className="text-rg-500" />
                    <span className="text-[15px] font-bold text-n-900">
                      {participantsQty}명
                    </span>
                    <span className="text-sm text-n-600">참여 중</span>
                  </div>
                </div>

                <ChevronRight size={20} className="text-n-400" />
              </button>
            )}

            {/* Action Section */}
            <div className="px-5 py-5">
              {/* Description Text */}
              {descriptionText && (
                <p className="text-[13px] text-n-700 leading-relaxed mb-4 px-1">
                  {descriptionText}
                </p>
              )}

              {/* Primary CTA Button */}
              {isMyActivity || isParticipating ? (
                <Button
                  text="출석체크"
                  variants="primary"
                  size="lg"
                  tone="green"
                  onClick={onAttendanceClick}
                  className="h-[56px] rounded-xl font-bold text-[15px] shadow-lg shadow-rg-500/20 hover:shadow-xl hover:shadow-rg-500/30 transition-all"
                />
              ) : (
                <Button
                  text={
                    recruitmentType === "FULL"
                      ? "모집 마감"
                      : recruitmentType === "CLOSED"
                      ? "모집 종료"
                      : "예약하기"
                  }
                  variants="primary"
                  size="lg"
                  tone="green"
                  onClick={() => joinMutation.mutate(activityId)}
                  disabled={isDisabled}
                  loading={joinMutation.isPending}
                  className="h-[56px] rounded-xl font-bold text-[15px] shadow-lg shadow-rg-500/20 hover:shadow-xl hover:shadow-rg-500/30 transition-all disabled:shadow-none"
                />
              )}
            </div>
          </div>

          {/* Safe area spacing for mobile devices */}
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}
