"use client";

import { Users, DollarSign } from "lucide-react";

interface Props {
  participantsQty: number;
  participantsLimit: number;
  participationFee?: number;
  onParticipantsClick: () => void;
}

/**
 * 모집/회비 정보 카드 컴포넌트
 */
export default function RecruitmentInfoCard({
  participantsQty,
  participantsLimit,
  participationFee,
  onParticipantsClick,
}: Props) {
  return (
    <div className="mx-4 p-4 bg-n-10 round-sm">
      <div className="flex items-center justify-between">
        {/* 모집 인원 */}
        <button
          onClick={onParticipantsClick}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <Users size={20} className="text-n-500" />
          <div className="flex flex-col items-start">
            <span className="body-sm text-n-500">모집</span>
            <span className="label-md text-n-900">
              {participantsQty}/{participantsLimit}명
            </span>
          </div>
        </button>

        {/* 회비 */}
        {participationFee !== undefined && (
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-n-500" />
            <div className="flex flex-col items-start">
              <span className="body-sm text-n-500">회비</span>
              <span className="label-md text-n-900">
                {participationFee === 0
                  ? "무료"
                  : `${participationFee.toLocaleString()}원`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
