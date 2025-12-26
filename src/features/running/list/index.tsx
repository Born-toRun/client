"use client";

import { Marathon } from "@/apis/marathon/types";
import Button from "@/components/Button";
import CustomDialog from "@/components/CustomDialog";
import LoginBottomSheet from "@/components/LoginBottomSheet";
import Tabs from "@/components/Tabs";
import { useModal } from "@/features/hooks/useModal";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import ActivityListContainer from "../activities/list";
import { COURSE_OPTIONS, REGION_OPTIONS, runningTabLabel } from "../constants";
import CompletionMessage from "./components/CompletionMessage";
import FilterBottomSheet from "./components/FilterBottomSheet";
import FilterButton from "./components/FilterButton";
import MarathonList from "./components/MarathonList";
import MarathonSkeletons from "./components/MarathonSkeletons";
import { useGetMarathonListQuery, useToggleBookmarkMutation } from "./hooks/queries";
import { MarathonFilters, RunningTab } from "./types";
import { useSearchContext } from "../contexts/SearchContext";

// FilterOption 타입 정의
interface FilterOption {
  value: string;
  label: string;
}

/**
 * 러닝 페이지 메인 컨테이너 컴포넌트
 * 마라톤/모임 탭, 프론트엔드 필터링 기능 제공
 */
export default function RunningContainer() {
  const loginModal = useModal();
  const loginBottomSheet = useModal();
  const regionBottomSheet = useModal();
  const courseBottomSheet = useModal();

  // 검색 컨텍스트
  const { searchKeyword, clearSearch } = useSearchContext();

  // 탭 상태
  const [selectedTab, setSelectedTab] = useState<RunningTab>(
    runningTabLabel.MARATHON
  );

  // 필터 상태
  const [filters, setFilters] = useState<MarathonFilters>({
    region: "all",
    course: "all",
  });

  // 마라톤 목록 쿼리 (백엔드는 필터링 미지원, 전체 목록 조회)
  const {
    data,
    isPending,
    isError,
    error,
  } = useGetMarathonListQuery({});

  // 북마크 토글 뮤테이션
  const toggleBookmarkMutation = useToggleBookmarkMutation();

  // 프론트엔드 필터링 (지역, 코스, 검색어)
  const filteredMarathonList = useMemo(() => {
    if (!data?.details) return [];

    return data.details.filter((marathon: Marathon) => {
      // 지역 필터
      const regionMatch = filters.region === "all" || marathon.venue.includes(filters.region);

      // 코스 필터링: 선택한 코스를 포함하는지 확인
      const courseMatch =
        filters.course === "all" ||
        marathon.course.split(',').some(c => c.trim() === filters.course);

      // 검색어 필터링: 제목에 검색어가 포함되는지 확인 (대소문자 구분 없음)
      const searchMatch =
        !searchKeyword ||
        marathon.title.toLowerCase().includes(searchKeyword.toLowerCase());

      return regionMatch && courseMatch && searchMatch;
    });
  }, [data, filters, searchKeyword]);

  // 401 에러 처리
  useEffect(() => {
    const axiosError = error as AxiosError;
    if (isError && axiosError?.response?.status === 401) {
      // 401 에러는 무시 (비로그인 상태에서도 목록 조회 가능)
      // 북마크 클릭 시에만 로그인 모달 표시
    }
  }, [isError, error]);

  // 탭 전환 핸들러
  const handleTabChange = (tab: RunningTab) => {
    setSelectedTab(tab);
  };

  // 필터 변경 핸들러
  const handleRegionApply = (region: string) => {
    setFilters((prev) => ({ ...prev, region }));
  };

  const handleCourseApply = (course: string) => {
    setFilters((prev) => ({ ...prev, course }));
  };

  // 선택된 필터 라벨 찾기
  const selectedRegionLabel =
    REGION_OPTIONS.find((opt) => opt.value === filters.region)?.label || "전체";
  const selectedCourseLabel =
    COURSE_OPTIONS.find((opt) => opt.value === filters.course)?.label || "전체";

  // 북마크 클릭 핸들러
  const handleBookmarkClick = (marathonId: number, isBookmarking: boolean) => {
    // 북마크 토글
    toggleBookmarkMutation.mutate(
      { marathonId, isBookmarking },
      {
        onError: (error) => {
          // 401 에러 시 로그인 모달 표시
          const axiosError = error as AxiosError;
          if (axiosError?.response?.status === 401) {
            loginModal.open();
          }
        },
      }
    );
  };

  return (
    <>
      <div className="pb-[58px]">
        {/* 탭 */}
        <div className="pt-[56px] mb-4 relative z-10">
          <Tabs
            options={runningTabOptions}
            selectedTabs={selectedTab}
            onSelectedTab={handleTabChange}
          />
        </div>

        {/* 검색 상태 표시 */}
        {searchKeyword && (
          <div className="px-4 mb-4 relative z-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-rg-100 round-md">
              <span className="body-md text-n-700 flex-1">
                <span className="text-n-500">검색:</span>{" "}
                <span className="font-semibold">{searchKeyword}</span>
              </span>
              <button
                onClick={clearSearch}
                className="body-sm text-rg-400 hover:text-rg-500 transition-colors"
                aria-label="검색어 지우기"
              >
                지우기
              </button>
            </div>
          </div>
        )}

        {/* 마라톤 탭 */}
        {selectedTab === runningTabLabel.MARATHON && (
          <>
            {/* 필터 버튼 */}
            <div className="flex gap-2 px-4 mb-4 relative z-10">
              <FilterButton
                label="지역"
                selectedLabel={selectedRegionLabel}
                onClick={regionBottomSheet.open}
              />
              <FilterButton
                label="코스"
                selectedLabel={selectedCourseLabel}
                onClick={courseBottomSheet.open}
              />
            </div>

            {/* 마라톤 리스트 */}
            {isPending && <MarathonSkeletons />}

            {!isPending && (
              <>
                <MarathonList
                  marathons={filteredMarathonList}
                  onBookmarkClick={handleBookmarkClick}
                  isBookmarkDisabled={toggleBookmarkMutation.isPending}
                />

                {/* 모든 데이터 표시 완료 메시지 */}
                {filteredMarathonList.length > 0 && (
                  <CompletionMessage
                    message="모든 마라톤을 확인했어요"
                    buttonText="모임 둘러보기"
                    onButtonClick={() =>
                      setSelectedTab(runningTabLabel.CREW)
                    }
                  />
                )}
              </>
            )}
          </>
        )}

        {/* 모임 탭 */}
        {selectedTab === runningTabLabel.CREW && <ActivityListContainer />}
      </div>

      {/* 로그인 모달 */}
      <CustomDialog
        open={loginModal.isActive}
        onOpenChange={loginModal.close}
        contents={{
          title: "로그인이 필요해요",
          description:
            "본투런 회원이 되면 러닝 모임 관리와 소통이 훨씬 간편해져요!",
        }}
        footer={
          <div className="flex w-full justify-between gap-2">
            <Button
              onClick={loginModal.close}
              variants="text"
              text="닫기"
              size="lg"
              tone="gray"
            />
            <Button
              onClick={() => {
                loginBottomSheet.open();
                loginModal.close();
              }}
              variants="text"
              text="시작하기"
              size="lg"
              tone="green"
            />
          </div>
        }
      />

      {/* 로그인 바텀시트 */}
      <LoginBottomSheet
        onOpenChange={loginBottomSheet.close}
        open={loginBottomSheet.isActive}
      />

      {/* 지역 필터 바텀시트 */}
      <FilterBottomSheet
        open={regionBottomSheet.isActive}
        onOpenChange={regionBottomSheet.close}
        title="지역 선택"
        options={REGION_OPTIONS as unknown as FilterOption[]}
        selectedValue={filters.region}
        onApply={handleRegionApply}
      />

      {/* 코스 필터 바텀시트 */}
      <FilterBottomSheet
        open={courseBottomSheet.isActive}
        onOpenChange={courseBottomSheet.close}
        title="코스 선택"
        options={COURSE_OPTIONS as unknown as FilterOption[]}
        selectedValue={filters.course}
        onApply={handleCourseApply}
      />
    </>
  );
}

// 러닝 탭 옵션
const runningTabOptions: { key: RunningTab; label: string }[] = [
  {
    key: runningTabLabel.MARATHON,
    label: "마라톤",
  },
  {
    key: runningTabLabel.CREW,
    label: "모임",
  },
];
