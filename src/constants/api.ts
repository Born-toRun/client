export const BASE_URL = {
  // 라이브 환경에서 환경변수가 없으면 빈 문자열 사용 (rewrites로 프록시)
  runApiServer: process.env.NEXT_PUBLIC_API_URL || "",
};
