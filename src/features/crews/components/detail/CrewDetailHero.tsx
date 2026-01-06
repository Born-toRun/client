"use client";

import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import { Crew } from "../../types";

interface Props {
  crew: Crew;
}

/**
 * 크루 상세 히어로 섹션 컴포넌트
 * 크루의 대표 이미지, 로고, 이름, 지역을 표시합니다.
 */
export default function CrewDetailHero({ crew }: Props) {
  return (
    <div className="relative">
      {/* 히어로 이미지 */}
      <div className="relative w-full h-[280px] bg-n-30">
        {crew.imageUri ? (
          <Image
            src={crew.imageUri}
            alt={`${crew.crewName} 대표 이미지`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-n-60 title-md">No Image</span>
          </div>
        )}
      </div>

      {/* 크루 정보 오버레이 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-end gap-4">
          {/* 크루 로고 */}
          <div className="relative w-20 h-20 flex-shrink-0 bg-white round-md overflow-hidden border-2 border-white elevation-10">
            {crew.logoUri ? (
              <Image
                src={crew.logoUri}
                alt={`${crew.crewName} 로고`}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-n-60 label-sm">
                Logo
              </div>
            )}
          </div>

          {/* 크루 이름 및 지역 */}
          <div className="flex-1 min-w-0 pb-1">
            {/* 크루 이름 (SNS 링크) */}
            {crew.crewSnsUri ? (
              <a
                href={crew.crewSnsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group mb-2"
              >
                <h1 className="headline-sm text-white group-hover:text-rg-300 transition-colors">
                  {crew.crewName}
                </h1>
                <ExternalLink
                  size={20}
                  className="text-white group-hover:text-rg-300 transition-colors flex-shrink-0"
                  aria-hidden="true"
                />
              </a>
            ) : (
              <h1 className="headline-sm text-white mb-2">{crew.crewName}</h1>
            )}

            {/* 활동 지역 */}
            <div className="flex items-center gap-2 text-white">
              <MapPin size={16} aria-hidden="true" />
              <span className="body-md">{crew.region}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
