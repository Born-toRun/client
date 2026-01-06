import { Crown, Medal, User } from "lucide-react";
import Image from "next/image";
import type { MemberRankingItem } from "@/apis/crews/types";

/**
 * 크루원 랭킹 카드 Props
 */
interface MemberRankingCardProps {
  item: MemberRankingItem;
}

/**
 * 순위에 따른 메달 색상 반환
 * 1위: 금색, 2위: 은색, 3위: 동색
 */
const getRankColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return "text-yellow-500"; // Gold
    case 2:
      return "text-gray-400"; // Silver
    case 3:
      return "text-orange-600"; // Bronze
    default:
      return "text-n-500";
  }
};

/**
 * 크루원 랭킹 카드 컴포넌트
 * 크루원의 순위, 프로필 이미지, 이름, 인스타그램 아이디, 참여 횟수를 표시합니다.
 * 1-3위는 메달 아이콘을, 4위 이하는 순위 숫자를 표시합니다.
 */
export default function MemberRankingCard({ item }: MemberRankingCardProps) {
  const { rank, userName, profileImageUri, instagramId, participationCount, isAdmin, isManager } =
    item;

  return (
    <article className="px-5 py-6 flex items-center gap-4">
      {/* 순위 표시: 1-3위는 메달, 4위 이하는 숫자 */}
      <div className="flex items-center justify-center w-10 flex-shrink-0">
        {rank <= 3 ? (
          <Medal className={getRankColor(rank)} size={24} strokeWidth={2} />
        ) : (
          <span className="title-md text-n-500">{rank}</span>
        )}
      </div>

      {/* 프로필 이미지 */}
      <div className="w-12 h-12 flex-shrink-0 relative">
        {profileImageUri ? (
          <Image
            src={profileImageUri}
            alt={`${userName} 프로필`}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-n-20 flex items-center justify-center">
            <User size={24} className="text-n-300" />
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

      {/* 크루원 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="title-md text-n-900 truncate">{userName}</h3>
          {isManager && (
            <span className="inline-block px-2 py-0.5 bg-rg-50 text-rg-400 round-full label-xs flex-shrink-0">
              운영진
            </span>
          )}
        </div>
        {instagramId && (
          <p className="body-sm text-n-500">@{instagramId}</p>
        )}
      </div>

      {/* 참여 횟수 */}
      <div className="flex-shrink-0 text-right">
        <p className="body-sm text-n-400">참여 횟수</p>
        <p className="title-md text-n-900">{participationCount}회</p>
      </div>
    </article>
  );
}
