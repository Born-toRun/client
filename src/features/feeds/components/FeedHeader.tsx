"use client";

import { formatRelativeTime } from "@/features/utils/formatDate";
import { Crown, User } from "lucide-react";
import Image from "next/image";

interface Props {
  profileImageUri?: string;
  userName?: string;
  registerAt?: string;
  crewName?: string;
  isAdmin?: boolean;
  isManager?: boolean;
}

export default function FeedHeader({
  profileImageUri,
  userName,
  crewName,
  registerAt,
  isAdmin = false,
  isManager = false,
}: Props) {
  const date = registerAt && formatRelativeTime(registerAt);
  return (
    <div className="flex items-center gap-[8px]">
      {/* 프로필 이미지 */}
      <div className="relative size-[40px] shrink-0">
        {profileImageUri ? (
          <Image
            src={profileImageUri}
            width={40}
            height={40}
            alt="profile-image"
            className="round-full object-cover border border-[rgba(0,0,0,0.1)]"
          />
        ) : (
          <div className="size-[40px] bg-n-30 round-full flex items-center justify-center border border-[rgba(0,0,0,0.1)]">
            <User size={20} className="text-n-60" />
          </div>
        )}

        {/* 관리자 왕관 아이콘 */}
        {isAdmin && (
          <div
            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
            title="관리자"
          >
            <Crown size={14} className="text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[4px] py-[2px] w-full">
        {/* 이름과 운영진 배지 */}
        <div className="flex items-center gap-2">
          <p className="body-sm text-black">{userName}</p>
          {isManager && (
            <span className="inline-block px-2 py-0.5 bg-rg-50 text-rg-400 round-full label-xs flex-shrink-0">
              운영진
            </span>
          )}
        </div>
        <div className="flex items-center body-sm text-n-60 gap-[4px]">
          <p>{crewName}</p>
          <span>·</span>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}
