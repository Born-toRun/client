"use client";

import { useGetMyCrewQuery, useGetCrewListQuery } from "./hooks/queries";
import CrewList from "./components/CrewList";
import CrewSkeletons from "./components/CrewSkeletons";
import ShareSection from "./components/ShareSection";

/**
 * 크루 페이지 메인 컨테이너 컴포넌트
 * 내 크루와 전체 크루 목록을 표시합니다.
 */
export default function CrewContainer() {
  // 내 크루 조회
  const { data: myCrew, isPending: isMyCrewPending } = useGetMyCrewQuery();

  // 전체 크루 목록 조회
  const {
    data: crewListData,
    isPending: isCrewListPending,
    isError,
  } = useGetCrewListQuery();

  const myCrews = myCrew ? [myCrew] : [];

  // 전체 크루에서 내 크루 제외
  const allCrewsList = crewListData?.details || [];
  const allCrews = myCrew
    ? allCrewsList.filter((crew) => crew.id !== myCrew.id)
    : allCrewsList;

  // 로딩 상태
  if (isMyCrewPending || isCrewListPending) {
    return (
      <div className="pt-[68px] pb-[58px]">
        <div className="mb-6">
          <h2 className="px-4 title-lg text-n-900 mb-4">내 크루</h2>
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <p className="body-md text-n-500">로딩 중...</p>
          </div>
        </div>

        <div>
          <h2 className="px-4 title-lg text-n-900 mb-4">전체 크루</h2>
          <CrewSkeletons />
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="pt-[68px] pb-[58px]">
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
          <p className="body-md text-n-500 text-center">
            크루 목록을 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[68px] pb-[58px]">
      {/* 내 크루 섹션 */}
      <div className="mb-8">
        <h2 className="px-4 title-lg text-n-900 mb-4">내 크루</h2>
        {myCrews.length > 0 ? (
          <CrewList crews={myCrews} />
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <p className="body-md text-n-500">가입한 크루가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 전체 크루 섹션 */}
      <div className="mb-8">
        <h2 className="px-4 title-lg text-n-900 mb-4">
          전체 크루 <span className="text-rg-400">{allCrews.length}</span>
        </h2>
        <CrewList crews={allCrews} />
      </div>

      {/* 공유 섹션 */}
      <ShareSection />
    </div>
  );
}
