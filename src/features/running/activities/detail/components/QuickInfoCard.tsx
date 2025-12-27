"use client";

import { Calendar, MapPin, Users, DollarSign, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface Props {
  startAt: string;
  venue: string;
  participantsQty: number;
  participantsLimit: number;
  entryFee?: number;
  onParticipantsClick: () => void;
}

/**
 * Quick Info Card 컴포넌트
 * 일시, 장소, 참여인원, 회비를 하나의 카드로 통합 표시
 * 미니멀한 디자인으로 타이포그래피 중심 레이아웃
 */
export default function QuickInfoCard({
  startAt,
  venue,
  participantsQty,
  participantsLimit,
  entryFee,
  onParticipantsClick,
}: Props) {
  const formattedDate = format(
    new Date(startAt),
    "yyyy년 M월 d일 (EEE) HH:mm",
    {
      locale: ko,
    }
  );

  return (
    <div className="mx-5 bg-white rounded-2xl border border-rg-100 divide-y divide-n-50 shadow-sm">
      {/* 일시 */}
      <InfoRow
        icon={<Calendar size={18} className="text-white" />}
        label="일시"
        value={formattedDate}
        iconBgColor="bg-rg-400"
      />

      {/* 장소 */}
      <InfoRow
        icon={<MapPin size={18} className="text-white" />}
        label="장소"
        value={venue}
        iconBgColor="bg-rg-400"
      />

      {/* 참여인원 - 클릭 가능 */}
      <button
        onClick={onParticipantsClick}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-rg-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 size-9 rounded-full bg-rg-400 flex items-center justify-center">
          <Users size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-n-600 mb-1">참여인원</div>
          <div className="flex items-center gap-1">
            <span className="text-base font-semibold text-rg-500">
              {participantsQty}
            </span>
            <span className="text-base font-medium text-n-900">
              / {participantsLimit}명
            </span>
          </div>
        </div>
        <ChevronRight size={20} className="text-n-400" />
      </button>

      {/* 회비 */}
      {entryFee !== undefined && (
        <InfoRow
          icon={<DollarSign size={18} className="text-white" />}
          label="회비"
          value={entryFee === 0 ? "무료" : `${entryFee.toLocaleString()}원`}
          iconBgColor="bg-rg-400"
        />
      )}
    </div>
  );
}

/**
 * InfoRow 재사용 컴포넌트
 */
function InfoRow({
  icon,
  label,
  value,
  iconBgColor = "bg-rg-400",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBgColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className={`flex-shrink-0 size-9 rounded-full ${iconBgColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-n-600 mb-1">{label}</div>
        <div className="text-base font-medium text-n-900">{value}</div>
      </div>
    </div>
  );
}
