import { Trophy } from "lucide-react";
import { pageRoutes } from "@/constants/route";
import Link from "next/link";
import Image from "next/image";
import type { CrewRankingItem } from "@/apis/crews/types";

/**
 * 크루 랭킹 카드 Props
 */
interface CrewRankingCardProps {
  item: CrewRankingItem;
}

/**
 * 순위에 따른 트로피 색상 반환
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
 * 크루 랭킹 카드 컴포넌트
 * 크루의 순위, 로고, 이름, 지역, 활동 횟수를 표시합니다.
 * 1-3위는 트로피 아이콘을, 4위 이하는 순위 숫자를 표시합니다.
 */
export default function CrewRankingCard({ item }: CrewRankingCardProps) {
  const { rank, id, crewName, region, logoUri, activityCount } = item;

  return (
    <Link
      href={pageRoutes.crews.detail(id)}
      className="block hover:bg-n-5 transition-colors"
    >
      <article className="px-5 py-6 flex items-center gap-4">
        {/* 순위 표시: 1-3위는 트로피, 4위 이하는 숫자 */}
        <div className="flex items-center justify-center w-10 flex-shrink-0">
          {rank <= 3 ? (
            <Trophy className={getRankColor(rank)} size={24} strokeWidth={2} />
          ) : (
            <span className="title-md text-n-500">{rank}</span>
          )}
        </div>

        {/* 크루 로고 */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-n-20 flex-shrink-0 relative">
          {logoUri ? (
            <Image
              src={logoUri}
              alt={`${crewName} 로고`}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Trophy size={24} className="text-n-300" />
            </div>
          )}
        </div>

        {/* 크루 정보 */}
        <div className="flex-1 min-w-0">
          <h3 className="title-md text-n-900 truncate">{crewName}</h3>
          <p className="body-sm text-n-500">{region}</p>
        </div>

        {/* 활동 횟수 */}
        <div className="flex-shrink-0 text-right">
          <p className="body-sm text-n-400">활동 횟수</p>
          <p className="title-md text-n-900">{activityCount}회</p>
        </div>
      </article>
    </Link>
  );
}
