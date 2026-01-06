"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/common";

/**
 * 인증 상태를 확인하는 커스텀 훅
 *
 * 클라이언트 사이드에서 액세스 토큰의 존재 여부를 확인하여
 * 사용자의 인증 상태를 판단합니다.
 *
 * @returns {Object} 인증 상태 객체
 * @property {boolean} isAuthenticated - 사용자가 인증되었는지 여부
 * @property {boolean} isLoading - 인증 상태를 확인 중인지 여부
 *
 * @example
 * ```tsx
 * const { isAuthenticated, isLoading } = useAuth();
 *
 * if (isLoading) {
 *   return <LoadingSpinner />;
 * }
 *
 * if (!isAuthenticated) {
 *   return <LoginPrompt />;
 * }
 *
 * return <ProtectedContent />;
 * ```
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      const token = getCookie(ACCESS_TOKEN);
      setIsAuthenticated(!!token);
      setIsLoading(false);
    }
  }, []);

  return { isAuthenticated, isLoading };
}
