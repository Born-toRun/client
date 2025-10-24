/**
 * 러닝 탭 타입
 */
export const runningTabLabel = {
  MARATHON: "MARATHON",
  CREW: "CREW",
} as const;

/**
 * 지역 필터 옵션
 */
export const REGION_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "서울", label: "서울" },
  { value: "경기", label: "경기" },
  { value: "인천", label: "인천" },
  { value: "강원", label: "강원" },
  { value: "제주", label: "제주" },
  { value: "부산", label: "부산" },
  { value: "경남", label: "경남" },
  { value: "대구", label: "대구" },
  { value: "경북", label: "경북" },
  { value: "울산", label: "울산" },
  { value: "대전", label: "대전" },
  { value: "충남", label: "충남" },
  { value: "충북", label: "충북" },
  { value: "광주", label: "광주" },
  { value: "전남", label: "전남" },
  { value: "전북", label: "전북" },
  { value: "기타", label: "기타" },
] as const;

/**
 * 코스 필터 옵션
 */
export const COURSE_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "5km", label: "5km" },
  { value: "10km", label: "10km" },
  { value: "하프", label: "하프" },
  { value: "풀", label: "풀" },
  { value: "기타", label: "기타" },
] as const;
