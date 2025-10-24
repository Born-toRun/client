"use client";

import Button from "@/components/Button";
import { pageRoutes } from "@/constants/route";
import { useRouter } from "next/navigation";

/**
 * 모든 마라톤 로드 완료 메시지 컴포넌트
 * 무한 스크롤이 끝났을 때 표시
 */
export default function CompletionMessage() {
  const router = useRouter();

  const handleClickCrewButton = () => {
    router.push(pageRoutes.crews.list);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="title-md text-n-500 text-center mb-6">
        모든 마라톤을 확인했어요
      </p>
      <div className="w-full max-w-xs">
        <Button
          text="모임 둘러보기"
          variants="secondary"
          size="md"
          tone="green"
          onClick={handleClickCrewButton}
        />
      </div>
    </div>
  );
}
