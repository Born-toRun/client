import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  isBefore,
  subMonths,
  format,
} from "date-fns";

export const formatRelativeTime = (date: string) => {
  const now = new Date();
  const prevDate = new Date(date);

  const seconds = differenceInSeconds(now, prevDate);
  if (seconds < 60) return "방금";

  const minutes = differenceInMinutes(now, prevDate);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = differenceInHours(now, prevDate);
  if (hours < 24) return `${hours}시간 전`;

  const monthAgo = subMonths(now, 1);
  if (isBefore(prevDate, monthAgo)) {
    const months = differenceInMonths(now, prevDate);
    if (months < 12) return `${months}개월 전`;
    return format(prevDate, "yyyy-MM-dd");
  }

  const days = differenceInDays(now, prevDate);
  return `${days}일 전`;
};
