"use client";

import { pageRoutes } from "@/constants/route";
import { useRouter } from "next/navigation";

/**
 * 모임 만들기 버튼 컴포넌트
 * 화면 하단에 고정되는 플로팅 버튼
 */
export default function CreateActivityButton() {
  const router = useRouter();

  return (
    <div className="fixed bottom-[58px] left-1/2 -translate-x-1/2 w-full max-w-[786px] flex justify-end px-[16px] pb-[24px] z-2">
      <button
        onClick={() => router.push(pageRoutes.running.activities.new)}
        className="w-[56px] h-[56px] rounded-full bg-rg-400 hover:bg-rg-500 active:bg-rg-600 shadow-lg flex items-center justify-center cursor-pointer transition-colors"
        aria-label="모임 만들기"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
