"use client";

import { Crew } from "../types";
import { pageRoutes } from "@/constants/route";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  crew: Crew;
}

/**
 * 크루 카드 컴포넌트
 * 크루의 기본 정보(로고, 이름, 활동 지역)를 표시합니다.
 */
export default function CrewCard({ crew }: Props) {
  return (
    <Link href={pageRoutes.crews.detail(crew.id)}>
      <article className="relative p-4 bg-white round-sm elevation-10 hover:elevation-20 transition-shadow cursor-pointer">
        <div className="flex items-start gap-4">
          {/* 크루 로고 */}
          <div className="relative w-16 h-16 flex-shrink-0 bg-n-30 round-sm overflow-hidden">
            {crew.logoUri ? (
              <Image
                src={crew.logoUri}
                alt={`${crew.crewName} 로고`}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-n-60 label-md">
                No Logo
              </div>
            )}
          </div>

          {/* 크루 정보 */}
          <div className="flex-1 min-w-0">
            <h3 className="title-md text-n-900 mb-2 line-clamp-1">
              {crew.crewName}
            </h3>

            {/* 활동 지역 */}
            <div className="flex items-center gap-2 text-n-500">
              <MapPin size={16} aria-hidden="true" />
              <span className="body-sm">{crew.region}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
