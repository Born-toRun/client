"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useGetCrewDetailQuery } from "@/features/crews/hooks/queries";
import CrewDetailHero from "@/features/crews/components/detail/CrewDetailHero";
import CrewDescription from "@/features/crews/components/detail/CrewDescription";
import CrewActivities from "@/features/crews/components/detail/CrewActivities";
import Button from "@/components/Button";

/**
 * 크루 상세 페이지
 * 크루의 상세 정보와 진행중인 모임을 표시합니다.
 */
export default function CrewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const crewId = Number(params.crewId);

  // 크루 상세 조회
  const { data: crew, isPending, isError } = useGetCrewDetailQuery(crewId);

  // 로딩 상태
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-n-500 body-md">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (isError || !crew) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-n-500 body-md text-center">
          크루 정보를 불러올 수 없습니다.
        </div>
        <Button
          onClick={() => router.back()}
          variants="secondary"
          text="돌아가기"
          size="md"
          tone="gray"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-n-30">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => router.back()}
            className="size-10 flex items-center justify-center"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="title-md text-n-900">크루 상세</h1>
          <div className="size-10" />
        </div>
      </header>

      {/* 본문 */}
      <div className="pb-6">
        {/* 히어로 섹션 */}
        <CrewDetailHero crew={crew} />

        {/* 소개 섹션 */}
        <CrewDescription contents={crew.contents} />

        {/* 모임 섹션 */}
        <CrewActivities crewId={crew.id} />
      </div>
    </div>
  );
}
