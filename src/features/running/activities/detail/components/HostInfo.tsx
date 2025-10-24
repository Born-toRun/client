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
    <div className="flex items-center gap-3 px-4 py-3">
      {/* 프로필 이미지 */}
      <div className="relative size-12 round-full overflow-hidden bg-n-30">
        {host.profileImageUrl ? (
          <Image
            src={host.profileImageUrl}
            alt={host.userName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="size-full flex items-center justify-center bg-rg-300 text-white title-md">
            {host.userName[0]}
          </div>
        )}
      </div>

      {/* 이름 및 업데이트 시간 */}
      <div className="flex flex-col">
        <span className="label-md text-n-900">{host.userName}</span>
        {host.crewName && (
          <span className="body-xs text-n-500">{host.crewName}</span>
        )}
        <span className="body-xs text-n-500">{relativeTime}</span>
      </div>
    </div>
  );
}
