"use client";

import Image from "next/image";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  imageUrls: string[];
  activityTitle: string;
}

/**
 * 모임 카드 이미지 컴포넌트
 *
 * 특징:
 * - Swiper를 사용한 스와이프 가능한 이미지 슬라이더
 * - 페이지네이션 인디케이터 표시 (이미지가 2개 이상일 때)
 * - Next.js Image 컴포넌트로 최적화
 * - Lazy loading 자동 적용
 * - 이미지 로드 실패 시 graceful fallback
 */
export default function ActivityImages({ imageUrls, activityTitle }: Props) {
  // 이미지가 없으면 렌더링하지 않음
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full mb-3">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-n-300",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-rg-400",
        }}
        className="w-full aspect-[16/9] rounded-lg overflow-hidden"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full bg-n-30">
              <ActivityImage
                src={url}
                alt={`${activityTitle} 이미지 ${index + 1}`}
                priority={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

/**
 * 개별 이미지 컴포넌트 (에러 처리 포함)
 */
function ActivityImage({
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
        <span className="text-n-60 body-sm">이미지 없음</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
