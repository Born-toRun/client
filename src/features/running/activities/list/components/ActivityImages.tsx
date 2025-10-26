"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  imageUrls: string[];
  activityTitle: string;
}

/**
 * 모임 카드 이미지 컴포넌트
 *
 * 이미지 개수에 따른 레이아웃:
 * - 0개: 표시하지 않음
 * - 1개: 단일 이미지를 전체 너비로 표시
 * - 2개: 2열 그리드로 표시
 * - 3개 이상: 첫 번째 이미지를 크게, 나머지는 작은 그리드로 표시 (최대 3개까지)
 *
 * 특징:
 * - Next.js Image 컴포넌트로 최적화
 * - Lazy loading 자동 적용
 * - 이미지 로드 실패 시 graceful fallback
 * - 모바일 우선 반응형 디자인
 */
export default function ActivityImages({ imageUrls, activityTitle }: Props) {
  // 이미지가 없으면 렌더링하지 않음
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  // 최대 3개까지만 표시
  const displayImages = imageUrls.slice(0, 3);
  const remainingCount = imageUrls.length - displayImages.length;

  // 단일 이미지인 경우
  if (displayImages.length === 1) {
    return (
      <div className="relative w-full h-48 round-sm overflow-hidden mb-3 bg-n-30">
        <ActivityImage
          src={displayImages[0]}
          alt={`${activityTitle} 이미지`}
          priority={false}
        />
      </div>
    );
  }

  // 2개 이미지인 경우
  if (displayImages.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 mb-3">
        {displayImages.map((url, index) => (
          <div
            key={index}
            className="relative w-full h-32 round-sm overflow-hidden bg-n-30"
          >
            <ActivityImage
              src={url}
              alt={`${activityTitle} 이미지 ${index + 1}`}
              priority={false}
            />
          </div>
        ))}
      </div>
    );
  }

  // 3개 이상 이미지인 경우 (그리드 레이아웃)
  return (
    <div className="grid grid-cols-3 gap-2 mb-3">
      {/* 첫 번째 이미지: 2열 차지 */}
      <div className="col-span-2 relative w-full h-40 round-sm overflow-hidden bg-n-30">
        <ActivityImage
          src={displayImages[0]}
          alt={`${activityTitle} 대표 이미지`}
          priority={false}
        />
      </div>

      {/* 나머지 이미지들 */}
      <div className="col-span-1 flex flex-col gap-2">
        {displayImages.slice(1).map((url, index) => (
          <div
            key={index + 1}
            className="relative w-full h-[4.625rem] round-sm overflow-hidden bg-n-30"
          >
            <ActivityImage
              src={url}
              alt={`${activityTitle} 이미지 ${index + 2}`}
              priority={false}
            />
            {/* 마지막 이미지에 추가 이미지 개수 오버레이 */}
            {index === 1 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white title-sm">+{remainingCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>
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
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
