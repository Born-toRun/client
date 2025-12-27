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
 * 하단 CTA 컴포넌트 - Minimal Sticky Bar
 *
 * 디자인 원칙:
 * 1. 예약하기 버튼이 절대적 주인공
 * 2. 총 높이 72px로 최소화
 * 3. 컨텐츠를 가리지 않도록 설계
 * 4. 참여자 정보는 부차적으로 표시
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
  // 참여자 아바타 (최대 3개, 압축 표시)
  const participantsWithoutHost = host
    ? participants.filter(p => p.userId !== host.userId)
    : participants;

  const allParticipants = host
    ? [host, ...participantsWithoutHost.slice(0, 2)]
    : participants.slice(0, 3);

  const showParticipants = participantsQty > 0 && !isMyActivity;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Main bar - 단일 라인, 최소 높이 */}
      <div className="bg-white border-t border-n-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="max-w-[786px] mx-auto px-4 py-4 flex items-center gap-3">
          {/* 참여자 정보 (CTA가 아닐 때만 간소화해서 표시) */}
          {showParticipants && (
            <button
              onClick={onParticipantsClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-n-50 transition-colors flex-shrink-0"
            >
              {/* Avatar stack - 더 작고 컴팩트하게 */}
              <div className="flex items-center -space-x-2">
                {allParticipants.slice(0, 2).map((participant, index) => (
                  <div
                    key={participant.userId || index}
                    className="relative size-7 rounded-full overflow-hidden bg-gradient-to-br from-rg-400 to-rg-600 ring-2 ring-white"
                    style={{ zIndex: 2 - index }}
                  >
                    {participant.profileImageUri ? (
                      <Image
                        src={participant.profileImageUri}
                        alt={participant.userName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center text-white text-[10px] font-semibold">
                        {participant.userName[0]}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 참여자 수 */}
              <span className="text-sm font-medium text-n-700">
                {participantsQty}명
              </span>
            </button>
          )}

          {/* 메인 CTA 버튼 - 절대적 주인공 */}
          <div className="flex-1">
            {isMyActivity ? (
              // 작성자: 출석체크
              <Button
                text="출석체크"
                variants="primary"
                size="lg"
                tone="green"
                onClick={onAttendanceClick}
              />
            ) : isParticipating ? (
              // 참여 중: 출석체크
              <Button
                text="출석체크"
                variants="primary"
                size="lg"
                tone="green"
                onClick={onAttendanceClick}
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
