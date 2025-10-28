"use client";

import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { pageRoutes } from "@/constants/route";

interface Props {
  crewId: number;
  isManager: boolean;
}

/**
 * 크루 설정 버튼 컴포넌트
 * 운영진인 경우에만 표시되는 설정 버튼입니다.
 *
 * @description
 * - 현재 사용자가 크루의 운영진(isManager === true)인 경우에만 렌더링
 * - 버튼 클릭 시 크루 설정 페이지로 이동
 */
export default function CrewSettingsButton({ crewId, isManager }: Props) {
  const router = useRouter();

  // 운영진이 아니면 버튼을 렌더링하지 않음
  if (!isManager) {
    return null;
  }

  const handleClick = () => {
    router.push(pageRoutes.crews.settings(crewId));
  };

  return (
    <section className="px-4 py-4 border-b border-n-30">
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-n-40 rounded-[8px] text-black hover:bg-n-10 hover:border-n-60 transition-colors"
      >
        <Settings size={20} />
        <span className="label-md">크루 설정</span>
      </button>
    </section>
  );
}
