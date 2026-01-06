"use client";

import { Activity } from "@/apis/activity/types";
import { pageRoutes } from "@/constants/route";
import { Clock, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  RECRUITMENT_TYPE_COLORS,
  RECRUITMENT_TYPE_LABELS,
} from "../constants";
import ActivityImages from "./ActivityImages";
import { getRecruitmentTypeForList } from "../utils/recruitmentType";

interface Props {
  activity: Activity;
}

/**
 * 모임 카드 컴포넌트
 * 모임의 기본 정보를 표시
 */
export default function ActivityCard({ activity }: Props) {
  // 날짜 포맷팅
  const formattedDate = format(
    new Date(activity.startAt),
    "M월 d일 (EEE) HH:mm",
    {
      locale: ko,
    }
  );

  // 모집 상태 계산 (백엔드 값이 없거나 예상치 못한 값이면 클라이언트에서 계산)
  const recruitmentType = getRecruitmentTypeForList(activity);

  // 모집 상태별 색상
  const badgeColor =
    RECRUITMENT_TYPE_COLORS[recruitmentType] || "bg-n-40 text-white";

  // 모집 상태 라벨
  const recruitmentLabel =
    RECRUITMENT_TYPE_LABELS[recruitmentType] || "종료";

  return (
    <Link href={pageRoutes.running.activities.detail(activity.id)}>
      <article className="p-4 bg-white round-sm elevation-10 hover:elevation-20 transition-shadow cursor-pointer">
        {/* 이미지 (있는 경우에만 표시) */}
        <ActivityImages
          imageUrls={activity.imageUrls}
          activityTitle={activity.title}
        />

        {/* 제목 */}
        <h3 className="title-md text-n-900 mb-3 line-clamp-2">
          {activity.title}
        </h3>

        <div className="flex flex-col gap-2">
          {/* 일시 */}
          <div className="flex items-center gap-2 text-n-500">
            <Clock size={16} aria-hidden="true" />
            <span className="body-sm">{formattedDate}</span>
          </div>

          {/* 참여 인원 */}
          <div className="flex items-center gap-2 text-n-500">
            <Users size={16} aria-hidden="true" />
            <span className="body-sm">
              {activity.participantsQty}/{activity.participantsLimit}명
            </span>
          </div>

          {/* 하단: 코스 + 모집 상태 */}
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-block px-3 py-1 bg-rg-300 text-white round-full label-xs">
              {activity.course}
            </span>
            <span
              className={`inline-block px-3 py-1 round-full label-xs ${badgeColor}`}
            >
              {recruitmentLabel}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
