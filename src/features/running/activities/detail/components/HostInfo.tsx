"use client";

import { Host } from "@/apis/activity/types";
import { getRelativeTime } from "@/utils/date";
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
      <div className="relative size-10 rounded-full overflow-hidden bg-n-30">
        {host.profileImageUri ? (
          <Image
            src={host.profileImageUri}
            alt={host.userName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="size-full flex items-center justify-center bg-rg-300 text-white text-sm font-semibold">
            {host.userName[0]}
          </div>
        )}
      </div>

      {/* 이름 및 업데이트 시간 */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-n-900">{host.userName}</span>
          {host.crewName && (
            <span className="text-xs text-n-500">• {host.crewName}</span>
          )}
        </div>
        <span className="text-xs text-n-500">{relativeTime}</span>
      </div>
    </div>
  );
}
