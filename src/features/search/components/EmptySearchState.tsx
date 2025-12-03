"use client";

/**
 * 검색 기록이 없을 때 표시되는 빈 상태 컴포넌트
 */
export default function EmptySearchState() {
  return (
    <div className="flex flex-col items-center justify-center py-[80px] px-[16px]">
      <p className="body-lg text-n-200 text-center">
        최근 검색어가 없습니다
      </p>
    </div>
  );
}
