"use client";

import { Host } from "@/apis/activity/types";
import { getRelativeTime } from "@/utils/date";
import { Crown } from "lucide-react";
import Image from "next/image";

interface Props {
  host: Host;
  updatedAt: string;
}

/**
 * 작성자 정보 컴포넌트
 */
export default function HostInfo({ host, updatedAt }: Props) {
  const relativeTime = getRelativeTime(updatedAt);

  return (
    <div className="flex items-center gap-3 px-5 py-3">
      {/* 프로필 이미지 */}
      <div className="relative size-10">
        {host.profileImageUri ? (
          <Image
            src={host.profileImageUri}
            alt={host.userName}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="size-10 rounded-full flex items-center justify-center bg-rg-300 text-white text-sm font-semibold">
            {host.userName[0]}
          </div>
        )}
        {/* 관리자 왕관 아이콘 */}
        {host.isAdmin && (
          <div
            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
            title="관리자"
          >
            <Crown size={14} className="text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </div>

      {/* 이름 및 업데이트 시간 */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-n-900">{host.userName}</span>
          {host.isManager && (
            <span className="inline-block px-2 py-0.5 bg-rg-50 text-rg-400 round-full label-xs flex-shrink-0">
              운영진
            </span>
          )}
          {host.crewName && (
            <span className="text-xs text-n-500">• {host.crewName}</span>
          )}
        </div>
        <span className="text-xs text-n-500">{relativeTime}</span>
      </div>
    </div>
  );
}
