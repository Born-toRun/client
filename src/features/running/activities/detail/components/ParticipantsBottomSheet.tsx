"use client";

import { Participant, Host } from "@/apis/activity/types";
import CloseIcon from "@/icons/close-icon.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { Crown } from "lucide-react";
import Image from "next/image";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  host: Host;
  participants?: Participant[];
}

/**
 * 참여자 바텀시트 컴포넌트
 */
export default function ParticipantsBottomSheet({
  open,
  onOpenChange,
  host,
  participants = [],
}: Props) {
  // 호스트가 participants 배열에 중복으로 포함되어 있을 수 있으므로 필터링
  const participantsWithoutHost = participants.filter(
    (p) => p.userId !== host.userId
  );
  const totalCount = participantsWithoutHost.length + 1; // 호스트 포함

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full max-w-[786px] mx-auto h-auto max-h-[80vh] bg-white rounded-t-[16px] flex flex-col"
        side="bottom"
      >
        {/* 헤더 */}
        <SheetHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-n-30">
          <div className="flex flex-col">
            <SheetTitle className="title-lg text-n-900">
              참여자 목록
            </SheetTitle>
            <p className="body-sm text-n-500 mt-1">
              이 모임에 예약을 완료한 러너들이에요.
            </p>
          </div>
          <button
            onClick={onOpenChange}
            className="size-10 flex items-center justify-center"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </SheetHeader>

        {/* 참여자 리스트 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-3">
            <span className="label-md text-n-900">총 {totalCount}명</span>
          </div>

          <div className="space-y-3">
            {/* 호스트 */}
            <ParticipantItem
              user={host}
              isHost
            />

            {/* 참여자들 (호스트 제외) */}
            {participantsWithoutHost.map((participant) => (
              <ParticipantItem
                key={participant.userId}
                user={participant}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * 참여자 아이템 컴포넌트
 */
function ParticipantItem({
  user,
  isHost = false,
}: {
  user: Participant | Host;
  isHost?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white round-sm border border-n-30">
      {/* 프로필 이미지 */}
      <div className="relative size-12 flex-shrink-0">
        {user.profileImageUri ? (
          <Image
            src={user.profileImageUri}
            alt={user.userName}
            width={48}
            height={48}
            className="round-full object-cover"
          />
        ) : (
          <div className="size-12 round-full flex items-center justify-center bg-rg-300 text-white label-md">
            {user.userName[0]}
          </div>
        )}
        {/* 관리자 왕관 아이콘 */}
        {user.isAdmin && (
          <div
            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
            title="관리자"
          >
            <Crown size={14} className="text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </div>

      {/* 이름 및 크루 */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <span className="label-md text-n-900">{user.userName}</span>
          {isHost && (
            <span className="inline-block px-2 py-0.5 bg-rg-400 text-white round-full label-xs">
              호스트
            </span>
          )}
          {user.isManager && (
            <span className="inline-block px-2 py-0.5 bg-rg-50 text-rg-400 round-full label-xs flex-shrink-0">
              운영진
            </span>
          )}
        </div>
        {user.crewName && (
          <span className="body-sm text-n-500">{user.crewName}</span>
        )}
      </div>
    </div>
  );
}
