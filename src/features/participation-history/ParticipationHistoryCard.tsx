"use client";

import { Activity } from "@/apis/activity/types";
import { pageRoutes } from "@/constants/route";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface Props {
  activity: Activity;
}

/**
 * 단순화된 참여 기록 카드 컴포넌트
 * 최소한의 정보만 표시하여 가독성과 스캔 용이성 향상
 *
 * 표시 정보:
 * - 모임 제목
 * - 날짜 및 시간
 * - 장소 (코스)
 */
export default function ParticipationHistoryCard({ activity }: Props) {
  // 날짜 포맷팅: "1월 15일 (월) 19:00"
  const formattedDate = format(
    new Date(activity.startAt),
    "M월 d일 (EEE) HH:mm",
    {
      locale: ko,
    }
  );

  return (
    <Link href={pageRoutes.running.activities.detail(activity.id)}>
      <article className="px-5 py-5 hover:bg-n-5 transition-colors cursor-pointer">
        {/* 제목 */}
        <h3 className="title-md text-n-900 mb-2 line-clamp-2 leading-snug">
          {activity.title}
        </h3>

        {/* 날짜 및 장소 */}
        <div className="flex flex-col gap-1">
          <p className="body-sm text-n-500">{formattedDate}</p>
          <p className="body-sm text-n-400">{activity.course}</p>
        </div>
      </article>
    </Link>
  );
}
