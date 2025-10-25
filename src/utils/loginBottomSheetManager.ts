/**
 * LoginBottomSheet 및 로그인 확인 모달 표시를 위한 전역 이벤트 관리자
 * Axios interceptor와 같이 React Context 외부에서도 사용할 수 있습니다.
 *
 * 이벤트 기반 시스템을 통해 React 컴포넌트 트리 외부에서도
 * 로그인 관련 UI를 제어할 수 있습니다.
 */

// CustomEvent 타입 정의
export const LOGIN_MODAL_EVENT = "show-login-modal";
export const LOGIN_BOTTOM_SHEET_EVENT = "show-login-bottom-sheet";

/**
 * 로그인 확인 모달을 표시하는 전역 이벤트를 발생시킵니다.
 * React Context 외부(Axios interceptor 등)에서 호출할 수 있습니다.
 *
 * 401 에러 발생 시 먼저 확인 모달을 표시하고,
 * 사용자가 "시작하기"를 클릭하면 LoginBottomSheet가 열립니다.
 */
export function showLoginModal() {
  if (typeof window === "undefined") return;

  console.log("로그인 확인 모달 표시 이벤트 발생");
  window.dispatchEvent(new CustomEvent(LOGIN_MODAL_EVENT));
}

/**
 * LoginBottomSheet를 직접 표시하는 전역 이벤트를 발생시킵니다.
 * React Context 외부(Axios interceptor 등)에서 호출할 수 있습니다.
 *
 * @deprecated 401 에러 시에는 showLoginModal()을 사용하세요.
 * 이 함수는 하위 호환성을 위해 유지됩니다.
 */
export function showLoginBottomSheet() {
  if (typeof window === "undefined") return;

  console.log("LoginBottomSheet 표시 이벤트 발생 (레거시)");
  window.dispatchEvent(new CustomEvent(LOGIN_BOTTOM_SHEET_EVENT));
}

/**
 * 로그인 확인 모달 표시 이벤트 리스너를 등록합니다.
 * LoginBottomSheetProvider 내부에서 사용됩니다.
 *
 * @param handler - 이벤트 핸들러 함수
 * @returns 이벤트 리스너를 제거하는 cleanup 함수
 */
export function addLoginModalListener(handler: () => void) {
  if (typeof window === "undefined") return () => {};

  const listener = () => {
    handler();
  };

  window.addEventListener(LOGIN_MODAL_EVENT, listener);

  // Cleanup 함수 반환
  return () => {
    window.removeEventListener(LOGIN_MODAL_EVENT, listener);
  };
}

/**
 * LoginBottomSheet 표시 이벤트 리스너를 등록합니다.
 * LoginBottomSheetProvider 내부에서 사용됩니다.
 *
 * @param handler - 이벤트 핸들러 함수
 * @returns 이벤트 리스너를 제거하는 cleanup 함수
 */
export function addLoginBottomSheetListener(handler: () => void) {
  if (typeof window === "undefined") return () => {};

  const listener = () => {
    handler();
  };

  window.addEventListener(LOGIN_BOTTOM_SHEET_EVENT, listener);

  // Cleanup 함수 반환
  return () => {
    window.removeEventListener(LOGIN_BOTTOM_SHEET_EVENT, listener);
  };
}
