"use client";

import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  imageUrls: string[];
  activityTitle: string;
  dDay?: string;
  recruitmentLabel: string;
  badgeColor: string;
}

/**
 * 모임 상세페이지 이미지 캐러셀 컴포넌트
 *
 * 특징:
 * - Swiper를 사용한 스와이프 가능한 이미지 슬라이더
 * - 페이지네이션 인디케이터 표시
 * - D-DAY 및 모집 상태 배지 오버레이
 * - 이미지 로드 실패 시 fallback 처리
 */
export default function ImageCarousel({
  imageUrls,
  activityTitle,
  dDay,
  recruitmentLabel,
  badgeColor,
}: Props) {
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/80",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        className="w-full aspect-[4/3]"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full bg-n-30">
              <CarouselImage
                src={url}
                alt={`${activityTitle} 이미지 ${index + 1}`}
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 배지 오버레이 */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        {dDay && (
          <span className="inline-block px-3 py-1.5 bg-black/70 backdrop-blur-md text-white rounded-full text-xs font-semibold shadow-lg">
            {dDay}
          </span>
        )}
        <span
          className={`inline-block px-3 py-1.5 backdrop-blur-md rounded-full text-xs font-semibold shadow-lg ${badgeColor}`}
        >
          {recruitmentLabel}
        </span>
      </div>
    </div>
  );
}

/**
 * 개별 이미지 컴포넌트 (에러 처리 포함)
 */
function CarouselImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) {
  const [error, setError] = useState(false);

  // 이미지 로드 실패 시
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-n-30">
        <span className="text-n-60 body-sm">이미지를 불러올 수 없습니다</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 786px"
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
