/**
 * 인증 디버깅 유틸리티
 * 브라우저 콘솔에서 사용할 수 있는 디버깅 헬퍼 함수들
 */

import { getCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants/common";

/**
 * 현재 인증 상태를 콘솔에 출력합니다.
 * 브라우저 콘솔에서 window.checkAuthStatus() 로 호출 가능
 */
export function checkAuthStatus() {
  if (typeof window === "undefined") {
    console.log("서버 사이드에서는 실행할 수 없습니다.");
    return;
  }

  const accessToken = getCookie(ACCESS_TOKEN);
  const allCookies = document.cookie;

  console.group("=== 인증 상태 디버깅 ===");

  // Access Token 확인
  console.log("1. Access Token:", {
    exists: !!accessToken,
    value: accessToken
      ? `${accessToken.toString().substring(0, 30)}...`
      : "없음",
    fullLength: accessToken ? accessToken.toString().length : 0,
  });

  // 모든 쿠키 확인
  console.log("2. 모든 쿠키:");
  if (allCookies) {
    allCookies.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      console.log(`   - ${name}: ${value ? value.substring(0, 30) + "..." : "없음"}`);
    });
  } else {
    console.log("   쿠키가 없습니다.");
  }

  // 로컬 스토리지 확인
  console.log("3. Local Storage:");
  if (localStorage.length === 0) {
    console.log("   비어있음");
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        console.log(
          `   - ${key}: ${value ? value.substring(0, 30) + "..." : "없음"}`
        );
      }
    }
  }

  // 세션 스토리지 확인
  console.log("4. Session Storage:");
  if (sessionStorage.length === 0) {
    console.log("   비어있음");
  } else {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const value = sessionStorage.getItem(key);
        console.log(
          `   - ${key}: ${value ? value.substring(0, 30) + "..." : "없음"}`
        );
      }
    }
  }

  console.log("5. 인증 상태:", accessToken ? "로그인됨" : "로그아웃됨");

  console.groupEnd();

  return {
    isAuthenticated: !!accessToken,
    hasAccessToken: !!accessToken,
    cookieCount: allCookies ? allCookies.split(";").length : 0,
  };
}

/**
 * 쿠키를 모두 삭제합니다.
 * 브라우저 콘솔에서 window.clearAllCookies() 로 호출 가능
 */
export function clearAllCookies() {
  if (typeof window === "undefined") {
    console.log("서버 사이드에서는 실행할 수 없습니다.");
    return;
  }

  const cookies = document.cookie.split(";");
  console.log(`${cookies.length}개의 쿠키를 삭제합니다...`);

  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

    // 다양한 경로와 도메인으로 삭제 시도
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;

    console.log(`   - ${name} 삭제됨`);
  });

  console.log("✅ 모든 쿠키 삭제 완료");
  console.log("페이지를 새로고침하세요.");
}

/**
 * 인증 관련 스토리지를 모두 삭제합니다.
 * 브라우저 콘솔에서 window.clearAuthStorage() 로 호출 가능
 */
export function clearAuthStorage() {
  if (typeof window === "undefined") {
    console.log("서버 사이드에서는 실행할 수 없습니다.");
    return;
  }

  console.log("인증 관련 스토리지를 삭제합니다...");

  // 쿠키 삭제
  clearAllCookies();

  // 로컬 스토리지에서 인증 관련 키 삭제
  const authKeys = ["accessToken", "refreshToken", "user", "auth"];
  authKeys.forEach((key) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      console.log(`   - localStorage.${key} 삭제됨`);
    }
  });

  // 세션 스토리지에서 인증 관련 키 삭제
  authKeys.forEach((key) => {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
      console.log(`   - sessionStorage.${key} 삭제됨`);
    }
  });

  console.log("✅ 모든 인증 스토리지 삭제 완료");
  console.log("페이지를 새로고침하세요.");
}

// Window 인터페이스 확장
declare global {
  interface Window {
    checkAuthStatus: typeof checkAuthStatus;
    clearAllCookies: typeof clearAllCookies;
    clearAuthStorage: typeof clearAuthStorage;
  }
}

// 브라우저 콘솔에서 사용할 수 있도록 전역 객체에 추가
if (typeof window !== "undefined") {
  window.checkAuthStatus = checkAuthStatus;
  window.clearAllCookies = clearAllCookies;
  window.clearAuthStorage = clearAuthStorage;
}
