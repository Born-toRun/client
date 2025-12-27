"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { ChevronRight } from "lucide-react";
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
 * 옵션 3: 스플릿 레이아웃
 * - 참여자 정보(좌측) + 버튼(우측)
 * - 같은 높이로 나란히 배치
 * - 효율적이고 전문적
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

  const isDisabled =
    joinMutation.isPending ||
    recruitmentType === "FULL" ||
    recruitmentType === "CLOSED";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-transparent z-40">
      {/* Gradient fade */}
      <div className="h-16 bg-gradient-to-t from-white via-white/92 to-transparent pointer-events-none" />

      {/* Main container */}
      <div className="bg-white border-t border-n-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 pb-6 pt-4">
        <div className="max-w-[786px] mx-auto">
          {/* Optional description for attendance check */}
          {(isMyActivity || isParticipating) && (
            <p className="text-[13px] text-n-700 leading-relaxed mb-3 px-1">
              {isMyActivity
                ? "최종 인원과 금액을 확인하고 출석체크를 해주세요"
                : "모임장에게 코드를 받은 뒤 출석체크를 해주세요"}
            </p>
          )}

          {/* Split Layout */}
          <div className="flex items-stretch gap-3">
            {/* Left: Participant Info */}
            {participantsQty > 0 && (
              <button
                onClick={onParticipantsClick}
                className="flex-shrink-0 w-[140px] bg-rg-50 hover:bg-rg-100 rounded-xl border border-rg-200 transition-all active:scale-[0.98] p-3 flex flex-col items-center justify-center gap-2"
              >
                {/* Avatar Stack - Compact */}
                <div className="flex items-center justify-center -space-x-2">
                  {allParticipants.slice(0, 3).map((participant, index) => (
                    <div
                      key={participant.userId || index}
                      className="relative size-8 rounded-full overflow-hidden bg-white ring-2 ring-white shadow-sm"
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
                        <div className="size-full flex items-center justify-center bg-gradient-to-br from-rg-400 to-rg-600 text-white text-xs font-bold">
                          {participant.userName[0]}
                        </div>
                      )}
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <div
                      className="relative size-8 rounded-full bg-gradient-to-br from-rg-500 to-rg-700 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-sm"
                      style={{ zIndex: 0 }}
                    >
                      +{remainingCount}
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="text-center">
                  <div className="text-[15px] font-bold text-n-900">
                    {participantsQty}명
                  </div>
                  <div className="text-[11px] text-n-600 font-medium flex items-center gap-0.5">
                    참여중
                    <ChevronRight size={12} className="text-rg-500" />
                  </div>
                </div>
              </button>
            )}

            {/* Right: CTA Button - Takes remaining space */}
            <div className="flex-1 min-w-0">
              {isMyActivity || isParticipating ? (
                <Button
                  text="출석체크"
                  variants="primary"
                  size="lg"
                  tone="green"
                  onClick={onAttendanceClick}
                  className="h-full min-h-[72px] rounded-xl font-bold text-[15px] shadow-lg shadow-rg-500/20 hover:shadow-xl hover:shadow-rg-500/30 transition-all"
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
                  className="h-full min-h-[72px] rounded-xl font-bold text-[15px] shadow-lg shadow-rg-500/20 hover:shadow-xl hover:shadow-rg-500/30 transition-all disabled:shadow-none"
                />
              )}
            </div>
          </div>

          {/* Safe area spacing */}
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}
