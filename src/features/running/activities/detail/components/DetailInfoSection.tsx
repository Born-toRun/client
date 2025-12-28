"use client";

import { Route, MapPin, Info } from "lucide-react";
import Image from "next/image";

interface Props {
  startAt: string;
  venue: string;
  venueUrl?: string;
  course: string;
  courseDetail?: string;
  path?: string;
}

/**
 * 상세 정보 섹션 컴포넌트
 */
export default function DetailInfoSection({
  venue,
  venueUrl,
  course,
  courseDetail,
  path,
}: Props) {

  return (
    <div className="px-5 py-8">
      {/* 섹션 제목 */}
      <div className="flex items-center gap-2 mb-5">
        <Route size={20} className="text-n-900" />
        <h2 className="text-base font-semibold text-n-900">코스 정보</h2>
      </div>

      <div className="space-y-4">
        {/* 장소 정보 (지도 링크 포함) */}
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-n-600 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs text-n-600 mb-1">장소</span>
            {venueUrl ? (
              <a
                href={venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-rg-500 hover:text-rg-600 underline underline-offset-2"
              >
                {venue}
              </a>
            ) : (
              <span className="text-base font-medium text-n-900">{venue}</span>
            )}
          </div>
        </div>

        {/* 코스 */}
        <div className="flex items-start gap-3">
          <Route size={20} className="text-n-600 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs text-n-600 mb-1">코스</span>
            <span className="text-base font-medium text-n-900">{course}</span>
          </div>
        </div>

        {/* 코스 설명 */}
        {courseDetail && (
          <div className="flex items-start gap-3">
            <Info size={20} className="text-n-600 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs text-n-600 mb-1">코스 설명</span>
              <span className="text-base text-n-900 whitespace-pre-wrap">{courseDetail}</span>
            </div>
          </div>
        )}

        {/* 경로 정보 */}
        {path && (
          <div className="pt-2">
            {/* URL인 경우 이미지로 표시 */}
            {path.startsWith('http://') || path.startsWith('https://') ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-n-20">
                <Image
                  src={path}
                  alt="경로 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              /* 일반 텍스트인 경우 텍스트로 표시 */
              <div className="flex items-start gap-3">
                <Route size={20} className="text-n-600 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-n-600 mb-1">경로</span>
                  <span className="text-base text-n-900 whitespace-pre-wrap">{path}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
