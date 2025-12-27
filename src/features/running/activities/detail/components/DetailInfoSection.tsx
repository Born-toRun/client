"use client";

import { Route } from "lucide-react";
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
  course,
  routeImageUrl,
}: Props) {

  return (
    <div className="px-5 py-8">
      {/* 섹션 제목 */}
      <div className="flex items-center gap-2 mb-5">
        <Route size={20} className="text-n-900" />
        <h2 className="text-base font-semibold text-n-900">코스 정보</h2>
      </div>

      <div className="space-y-4">
        {/* 코스 */}
        <div className="flex items-start gap-3">
          <Route size={20} className="text-n-600 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs text-n-600 mb-1">코스</span>
            <span className="text-base font-medium text-n-900">{course}</span>
          </div>
        </div>

        {/* 경로 이미지 */}
        {routeImageUrl && (
          <div className="pt-2">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-n-20">
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
    </div>
  );
}
