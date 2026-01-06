"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  imageUrl: string;
  activityTitle: string;
  dDay?: string;
  recruitmentLabel: string;
  badgeColor: string;
}

/**
 * Hero Section 컴포넌트
 * 이미지를 full-width로 표시하고 배지를 오버레이
 */
export default function HeroSection({
  imageUrl,
  activityTitle,
  dDay,
  recruitmentLabel,
  badgeColor,
}: Props) {
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full aspect-[16/10] bg-n-20">
      {/* 이미지 */}
      {!error && (
        <Image
          src={imageUrl}
          alt={activityTitle}
          fill
          className="object-cover"
          priority
          onError={() => setError(true)}
        />
      )}

      {/* 이미지 로드 실패 시 */}
      {error && (
        <div className="w-full h-full flex items-center justify-center bg-n-20">
          <span className="text-n-60 body-sm">이미지 없음</span>
        </div>
      )}

      {/* 배지 오버레이 */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
        {dDay && (
          <span className="inline-block px-3 py-1 backdrop-blur-md bg-white/95 text-n-900 rounded-full text-xs font-semibold shadow-sm">
            {dDay}
          </span>
        )}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${badgeColor}`}
        >
          {recruitmentLabel}
        </span>
      </div>
    </div>
  );
}
