"use client";

import { Marathon } from "@/apis/marathon/types";
import { pageRoutes } from "@/constants/route";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface Props {
  marathon: Marathon;
  onBookmarkClick: (marathonId: number, isBookmarking: boolean) => void;
  isBookmarkDisabled?: boolean;
}

/**
 * 마라톤 카드 컴포넌트
 * 마라톤의 기본 정보와 북마크 기능을 제공
 */
export default function MarathonCard({
  marathon,
  onBookmarkClick,
  isBookmarkDisabled = false,
}: Props) {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmarkClick(marathon.id, marathon.isBookmarking);
  };

  // 날짜 포맷팅
  const formattedDate = format(new Date(marathon.schedule), "M월 d일 (EEE)", {
    locale: ko,
  });

  return (
    <Link href={pageRoutes.running.marathons.detail(marathon.id)}>
      <article className="relative p-4 bg-white round-sm elevation-10 hover:elevation-20 transition-shadow cursor-pointer">
        {/* 북마크 버튼 */}
        <div className="absolute top-4 right-4 z-10">
          <BookmarkButton
            isBookmarking={marathon.isBookmarking}
            onClick={handleBookmarkClick}
            disabled={isBookmarkDisabled}
          />
        </div>

        {/* 마라톤 정보 */}
        <div className="pr-12">
          <h3 className="title-md text-n-900 mb-3 line-clamp-2">
            {marathon.title}
          </h3>

          <div className="flex flex-col gap-2">
            {/* 일정 */}
            <div className="flex items-center gap-2 text-n-500">
              <Calendar size={16} aria-hidden="true" />
              <span className="body-sm">{formattedDate}</span>
            </div>

            {/* 장소 */}
            <div className="flex items-center gap-2 text-n-500">
              <MapPin size={16} aria-hidden="true" />
              <span className="body-sm">{marathon.venue}</span>
            </div>

            {/* 코스 */}
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-rg-300 text-white round-full label-xs">
                {marathon.course}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
