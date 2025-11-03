import { Trophy } from "lucide-react";

/**
 * 랭킹 빈 상태 Props
 */
interface RankingEmptyStateProps {
  type: "crew" | "member";
}

/**
 * 랭킹 빈 상태 컴포넌트
 * 랭킹 데이터가 없을 때 표시되는 안내 메시지
 */
export default function RankingEmptyState({ type }: RankingEmptyStateProps) {
  const title = type === "crew" ? "크루 랭킹이 없어요" : "크루원 랭킹이 없어요";
  const description =
    type === "crew"
      ? "크루를 만들고 활동을 시작해보세요!"
      : "크루에 가입하고 활동에 참여해보세요!";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-n-10 flex items-center justify-center">
          <Trophy size={32} className="text-n-300" />
        </div>
        <div className="text-center">
          <p className="title-md text-n-900 mb-2">{title}</p>
          <p className="body-md text-n-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
