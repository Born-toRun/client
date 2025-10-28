"use client";

import { useGetCrewMembersQuery } from "@/features/crews/hooks/queries";
import { CrewMember } from "@/features/crews/types";
import { Crown, User, Instagram } from "lucide-react";
import Image from "next/image";

interface Props {
  crewId: number;
}

/**
 * 크루 멤버 카드 컴포넌트
 * 개별 멤버의 프로필 정보를 표시합니다.
 */
function MemberCard({ member }: { member: CrewMember }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white round-sm elevation-10">
      {/* 프로필 이미지 */}
      <div className="relative flex-shrink-0">
        {member.profileImageUri ? (
          <Image
            src={member.profileImageUri}
            alt={`${member.userName} 프로필 이미지`}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <div className="size-12 rounded-full bg-n-30 flex items-center justify-center">
            <User size={24} className="text-n-60" />
          </div>
        )}

        {/* 관리자 왕관 아이콘 */}
        {member.isAdmin && (
          <div
            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
            title="관리자"
          >
            <Crown size={16} className="text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </div>

      {/* 멤버 정보 */}
      <div className="flex-1 min-w-0">
        {/* 이름과 운영진 뱃지 */}
        <div className="flex items-center gap-2 mb-1">
          <h3 className="title-sm text-n-900 truncate">{member.userName}</h3>
          {member.isManager && (
            <span className="inline-block px-2 py-0.5 bg-rg-50 text-rg-400 round-full label-xs flex-shrink-0">
              운영진
            </span>
          )}
        </div>

        {/* 인스타그램 ID */}
        {member.instagramId && (
          <a
            href={`https://instagram.com/${member.instagramId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-n-500 hover:text-rg-400 transition-colors"
          >
            <Instagram size={14} aria-hidden="true" />
            <span className="body-sm truncate">@{member.instagramId}</span>
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * 크루 멤버 목록 컴포넌트
 * 크루에 속한 모든 멤버를 표시합니다.
 */
export default function CrewMembers({ crewId }: Props) {
  // 크루 멤버 목록 조회
  const { data, isPending, isError } = useGetCrewMembersQuery(crewId);

  const members = data?.members || [];

  return (
    <section className="px-4 py-6 border-t border-n-30">
      {/* 섹션 제목 */}
      <h2 className="title-md text-n-900 mb-4">
        크루원{" "}
        {!isPending && (
          <span className="text-rg-400">{members.length}</span>
        )}
      </h2>

      {/* 로딩 상태 */}
      {isPending && (
        <div className="flex justify-center py-8">
          <p className="body-md text-n-500">로딩 중...</p>
        </div>
      )}

      {/* 에러 상태 */}
      {isError && (
        <div className="flex justify-center py-8">
          <p className="body-md text-n-500">
            크루원 목록을 불러올 수 없습니다.
          </p>
        </div>
      )}

      {/* 빈 상태 */}
      {!isPending && !isError && members.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-n-10 round-sm">
          <p className="body-md text-n-500 text-center">
            아직 크루원이 없습니다.
          </p>
        </div>
      )}

      {/* 멤버 목록 */}
      {!isPending && !isError && members.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {members.map((member) => (
            <MemberCard key={member.userId} member={member} />
          ))}
        </div>
      )}
    </section>
  );
}
