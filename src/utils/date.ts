import { formatDistanceToNow, differenceInDays, parseISO, differenceInSeconds, differenceInMinutes, differenceInHours } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 상대 시간 표시 (예: "방금 전", "5분 전", "2시간 전")
 * KST 타임존을 고려하여 정확한 시간 계산
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const now = new Date();

    // 초 단위 차이 계산
    const seconds = differenceInSeconds(now, date);

    // 방금 전 (60초 미만)
    if (seconds < 60) {
      return "방금 전";
    }

    // 분 단위 (60분 미만)
    const minutes = differenceInMinutes(now, date);
    if (minutes < 60) {
      return `${minutes}분 전`;
    }

    // 시간 단위 (24시간 미만)
    const hours = differenceInHours(now, date);
    if (hours < 24) {
      return `${hours}시간 전`;
    }

    // 24시간 이상은 기존 date-fns 포맷 사용
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  } catch {
    return dateString;
  }
};

/**
 * D-DAY 계산
 * @param dateString ISO 8601 날짜 문자열
 * @returns D-DAY 문자열 (예: "D-5", "D-DAY", "D+2")
 */
export const getDDay = (dateString: string): string => {
  try {
    const targetDate = parseISO(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diff = differenceInDays(targetDate, today);

    if (diff === 0) return "D-DAY";
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  } catch {
    return "";
  }
};

/**
 * 24시간 전인지 확인
 */
export const isWithin24Hours = (dateString: string): boolean => {
  try {
    const targetDate = parseISO(dateString);
    const now = new Date();
    const diffInHours = (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24;
  } catch {
    return false;
  }
};
