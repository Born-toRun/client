"use client";

import { formatRelativeTime } from "@/features/utils/formatDate";
import Image from "next/image";

interface Props {
  profileImageUri?: string;
  userName?: string;
  registerAt?: string;
  crewName?: string;
}

export default function FeedHeader({
  profileImageUri,
  userName,
  crewName,
  registerAt,
}: Props) {
  const date = registerAt && formatRelativeTime(registerAt);
  return (
    <div className="flex items-center gap-[8px] ">
      <div className="relative  overflow-hidden size-[40px] shrink-0 round-full border  border-[rgba(0,0,0,0.1)]">
        {profileImageUri ? (
          <Image
            src={profileImageUri}
            fill
            alt="profile-image"
            className="round-full"
          />
        ) : (
          <div className="absolute w-full h-full" />
        )}
      </div>

      <div className="flex flex-col gap-[4px] py-[2px] w-full">
        <p className="body-sm text-black">{userName}</p>
        <div className="flex items-center body-sm text-n-60 gap-[4px]">
          <p>{crewName}</p>
          <span>·</span>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}
