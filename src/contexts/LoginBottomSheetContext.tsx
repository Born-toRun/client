"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import LoginBottomSheet from "@/components/LoginBottomSheet";
import CustomDialog from "@/components/CustomDialog";
import Button from "@/components/Button";
import {
  addLoginBottomSheetListener,
  addLoginModalListener,
} from "@/utils/loginBottomSheetManager";

/**
 * LoginBottomSheet 및 로그인 확인 모달 전역 상태 관리를 위한 Context
 * 401 에러 발생 시 어디서든 로그인 확인 모달과 LoginBottomSheet를 표시할 수 있도록 합니다.
 */
interface LoginBottomSheetContextType {
  /**
   * 로그인 확인 모달을 표시합니다.
   */
  showLoginModal: () => void;

  /**
   * 로그인 확인 모달을 숨깁니다.
   */
  hideLoginModal: () => void;

  /**
   * LoginBottomSheet를 표시합니다.
   */
  showLoginBottomSheet: () => void;

  /**
   * LoginBottomSheet를 숨깁니다.
   */
  hideLoginBottomSheet: () => void;

  /**
   * 로그인 확인 모달의 현재 표시 상태
   */
  isModalOpen: boolean;

  /**
   * LoginBottomSheet의 현재 표시 상태
   */
  isBottomSheetOpen: boolean;
}

const LoginBottomSheetContext = createContext<
  LoginBottomSheetContextType | undefined
>(undefined);

/**
 * LoginBottomSheet 및 로그인 확인 모달 Context Provider
 * 앱의 최상위에서 이 Provider로 감싸야 합니다.
 */
export function LoginBottomSheetProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const showLoginModal = () => {
    console.log("로그인 확인 모달 표시 요청");
    setIsModalOpen(true);
  };

  const hideLoginModal = () => {
    console.log("로그인 확인 모달 숨김 요청");
    setIsModalOpen(false);
  };

  const showLoginBottomSheet = () => {
    console.log("LoginBottomSheet 표시 요청");
    setIsBottomSheetOpen(true);
  };

  const hideLoginBottomSheet = () => {
    console.log("LoginBottomSheet 숨김 요청");
    setIsBottomSheetOpen(false);
  };

  // 전역 이벤트 리스너 등록
  // Axios interceptor 등 React Context 외부에서 발생한 이벤트를 수신합니다.
  useEffect(() => {
    // 로그인 모달 표시 이벤트 리스너
    const cleanupModalListener = addLoginModalListener(showLoginModal);

    // 레거시: 직접 LoginBottomSheet를 표시하는 이벤트 리스너 (하위 호환성)
    const cleanupBottomSheetListener =
      addLoginBottomSheetListener(showLoginBottomSheet);

    return () => {
      cleanupModalListener();
      cleanupBottomSheetListener();
    };
  }, []);

  return (
    <LoginBottomSheetContext.Provider
      value={{
        showLoginModal,
        hideLoginModal,
        showLoginBottomSheet,
        hideLoginBottomSheet,
        isModalOpen,
        isBottomSheetOpen,
      }}
    >
      {children}

      {/* 로그인 확인 모달 */}
      <CustomDialog
        open={isModalOpen}
        onOpenChange={hideLoginModal}
        contents={{
          title: "로그인이 필요해요",
          description:
            "본투런 회원이 되면 러닝 모임 관리와 소통이 훨씬 간편해져요!",
        }}
        footer={
          <div className="flex w-full justify-between gap-2">
            <Button
              onClick={hideLoginModal}
              variants="text"
              text="닫기"
              size="lg"
              tone="gray"
            />
            <Button
              onClick={() => {
                hideLoginModal();
                showLoginBottomSheet();
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
        open={isBottomSheetOpen}
        onOpenChange={hideLoginBottomSheet}
      />
    </LoginBottomSheetContext.Provider>
  );
}

/**
 * LoginBottomSheet Context를 사용하기 위한 커스텀 훅
 *
 * @example
 * ```tsx
 * const { showLoginModal, showLoginBottomSheet } = useLoginBottomSheet();
 *
 * // 401 에러 발생 시 (확인 모달 먼저 표시)
 * showLoginModal();
 *
 * // 또는 직접 바텀시트 표시 (레거시 방식)
 * showLoginBottomSheet();
 * ```
 */
export function useLoginBottomSheet() {
  const context = useContext(LoginBottomSheetContext);

  if (context === undefined) {
    throw new Error(
      "useLoginBottomSheet는 LoginBottomSheetProvider 내부에서만 사용할 수 있습니다."
    );
  }

  return context;
}
