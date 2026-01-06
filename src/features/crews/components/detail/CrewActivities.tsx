"use client";

import { useQuery } from "@tanstack/react-query";
import { getCrewActivities } from "@/apis/activity";
import { apiRoutes } from "@/constants/route";
import ActivityCard from "@/features/running/activities/list/components/ActivityCard";

interface Props {
  crewId: number;
}

/**
 * 크루 모임 목록 컴포넌트
 * 해당 크루의 진행중인 모임을 표시합니다.
 *
 * GET /api/v1/activities/crew/{crewId}?recruitmentType=RECRUITING를 사용하여
 * 서버 측에서 모집중 상태인 모임만 필터링하여 조회합니다.
 */
export default function CrewActivities({ crewId }: Props) {
  // 크루별 모임 목록 조회 (서버 측 필터링: 모집중인 모임만)
  const { data, isPending, isError } = useQuery({
    queryKey: [apiRoutes.activities.crew(crewId), "RECRUITING"],
    queryFn: () =>
      getCrewActivities(crewId, {
        recruitmentType: "RECRUITING",
      }),
  });

  // 서버에서 이미 필터링된 데이터를 바로 사용
  const recruitingActivities = data?.details || [];

  return (
    <section className="px-4 py-6">
      <h2 className="title-md text-n-900 mb-4">진행중 크루 모임</h2>

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
            모임 목록을 불러올 수 없습니다.
          </p>
        </div>
      )}

      {/* 빈 상태 */}
      {!isPending && !isError && recruitingActivities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-n-10 round-sm">
          <p className="body-md text-n-500 text-center">
            현재 모집중인 모임이 없습니다.
          </p>
        </div>
      )}

      {/* 모임 목록 */}
      {!isPending && !isError && recruitingActivities.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {recruitingActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </section>
  );
}
