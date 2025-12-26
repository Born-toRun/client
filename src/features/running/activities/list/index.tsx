"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/features/hooks/useModal";
import {
  RECRUITMENT_TYPE_OPTIONS,
  ACTIVITY_COURSE_OPTIONS,
} from "./constants";
import { useSearchContext } from "../../contexts/SearchContext";

// FilterOption 타입 정의
interface FilterOption {
  value: string;
  label: string;
}
import { ActivityFilters } from "./types";
import { useGetActivityListQuery } from "./hooks/queries";
import FilterButton from "../../list/components/FilterButton";
import FilterBottomSheet from "../../list/components/FilterBottomSheet";
import MultiSelectFilterBottomSheet from "./components/MultiSelectFilterBottomSheet";
import ActivityList from "./components/ActivityList";
import ActivitySkeletons from "./components/ActivitySkeletons";
import CompletionMessage from "../../list/components/CompletionMessage";
import CreateActivityButton from "./components/CreateActivityButton";
import { pageRoutes } from "@/constants/route";

/**
 * 모임 리스트 컨테이너 컴포넌트
 * 모임 목록 조회 및 필터링 기능 제공
 */
export default function ActivityListContainer() {
  const router = useRouter();
  const recruitmentBottomSheet = useModal();
  const courseBottomSheet = useModal();

  // 검색 컨텍스트
  const { searchKeyword } = useSearchContext();

  // 필터 상태
  const [filters, setFilters] = useState<ActivityFilters>({
    recruitmentType: "all",
    courses: [], // 빈 배열 = 전체
  });

  // API 호출 파라미터 생성
  const apiParams = useMemo(() => {
    const params: { courses?: string; recruitmentType?: string } = {};

    // 코스 필터 (다중 선택)
    if (filters.courses.length > 0) {
      params.courses = filters.courses.join(",");
    }

    // 모집 상태 필터
    if (filters.recruitmentType !== "all") {
      params.recruitmentType = filters.recruitmentType;
    }

    return params;
  }, [filters]);

  // 모임 목록 쿼리
  const { data, isPending, isError } = useGetActivityListQuery(apiParams);

  // 검색어로 클라이언트 사이드 필터링
  const filteredActivities = useMemo(() => {
    if (!data?.details) return [];

    // 검색어가 없으면 전체 목록 반환
    if (!searchKeyword) return data.details;

    // 검색어가 있으면 제목에 검색어가 포함된 항목만 필터링 (대소문자 구분 없음)
    return data.details.filter((activity) =>
      activity.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [data, searchKeyword]);

  // 필터 변경 핸들러
  const handleRecruitmentApply = (recruitmentType: string) => {
    setFilters((prev) => ({ ...prev, recruitmentType }));
  };

  const handleCourseApply = (courses: string[]) => {
    setFilters((prev) => ({ ...prev, courses }));
  };

  // 선택된 필터 라벨 찾기
  const selectedRecruitmentLabel =
    RECRUITMENT_TYPE_OPTIONS.find(
      (opt) => opt.value === filters.recruitmentType
    )?.label || "전체";

  const selectedCourseLabel =
    filters.courses.length === 0
      ? "전체"
      : filters.courses.length === 1
      ? filters.courses[0]
      : `${filters.courses.length}개`;

  return (
    <>
      <div>
        {/* 필터 버튼 */}
        <div className="flex gap-2 px-4 mb-4">
          <FilterButton
            label="모집 상태"
            selectedLabel={selectedRecruitmentLabel}
            onClick={recruitmentBottomSheet.open}
          />
          <FilterButton
            label="코스"
            selectedLabel={selectedCourseLabel}
            onClick={courseBottomSheet.open}
          />
        </div>

        {/* 모임 리스트 */}
        {isPending && <ActivitySkeletons />}

        {!isPending && !isError && (
          <>
            <ActivityList activities={filteredActivities} />

            {/* 모든 데이터 표시 완료 메시지 */}
            {filteredActivities.length > 0 && (
              <CompletionMessage
                message="모든 모임을 확인했어요!"
                buttonText="마라톤 둘러보기"
                onButtonClick={() => router.push(pageRoutes.running.list)}
              />
            )}
          </>
        )}
      </div>

      {/* 모임 만들기 버튼 */}
      <CreateActivityButton />

      {/* 모집 상태 필터 바텀시트 */}
      <FilterBottomSheet
        open={recruitmentBottomSheet.isActive}
        onOpenChange={recruitmentBottomSheet.close}
        title="모집 상태 선택"
        options={RECRUITMENT_TYPE_OPTIONS as unknown as FilterOption[]}
        selectedValue={filters.recruitmentType}
        onApply={handleRecruitmentApply}
      />

      {/* 코스 필터 바텀시트 (다중 선택) */}
      <MultiSelectFilterBottomSheet
        open={courseBottomSheet.isActive}
        onOpenChange={courseBottomSheet.close}
        title="코스 선택"
        options={ACTIVITY_COURSE_OPTIONS as unknown as FilterOption[]}
        selectedValues={filters.courses}
        onApply={handleCourseApply}
      />
    </>
  );
}
