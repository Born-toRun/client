"use client";

import { Calendar, MapPin, Route, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

interface Props {
  startAt: string;
  venue: string;
  venueUrl?: string;
  course: string;
  routeImageUrl?: string;
}

/**
 * 상세 정보 섹션 컴포넌트
 */
export default function DetailInfoSection({
  startAt,
  venue,
  venueUrl,
  course,
  routeImageUrl,
}: Props) {
  const formattedDate = format(
    new Date(startAt),
    "yyyy년 M월 d일 (EEE) HH:mm",
    {
      locale: ko,
    }
  );

  return (
    <div className="px-4 py-4 space-y-4">
      {/* 일시 */}
      <div className="flex items-start gap-3">
        <Calendar size={20} className="text-n-500 mt-0.5" />
        <div className="flex flex-col">
          <span className="body-sm text-n-500">일시</span>
          <span className="label-md text-n-900">{formattedDate}</span>
        </div>
      </div>

      {/* 장소 */}
      <div className="flex items-start gap-3">
        <MapPin size={20} className="text-n-500 mt-0.5" />
        <div className="flex flex-col">
          <span className="body-sm text-n-500">장소</span>
          <div className="flex items-center gap-2">
            <span className="label-md text-n-900">{venue}</span>
            {venueUrl && (
              <a
                href={venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rg-400 hover:text-rg-300"
                aria-label="지도 보기"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 코스 */}
      <div className="flex items-start gap-3">
        <Route size={20} className="text-n-500 mt-0.5" />
        <div className="flex flex-col">
          <span className="body-sm text-n-500">코스</span>
          <span className="label-md text-n-900">{course}</span>
        </div>
      </div>

      {/* 경로 이미지 */}
      {routeImageUrl && (
        <div className="pt-2">
          <div className="relative w-full aspect-video round-sm overflow-hidden bg-n-30">
            <Image
              src={routeImageUrl}
              alt="경로 이미지"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
