"use client";

import Button from "@/components/Button";

interface Props {
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

/**
 * 완료 메시지 컴포넌트
 * 모든 데이터 로드 완료 시 표시
 */
export default function CompletionMessage({
  message = "모든 마라톤을 확인했어요",
  buttonText = "모임 둘러보기",
  onButtonClick,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="title-md text-n-500 text-center mb-6">{message}</p>
      {onButtonClick && (
        <div className="w-full max-w-xs">
          <Button
            text={buttonText}
            variants="secondary"
            size="md"
            tone="green"
            onClick={onButtonClick}
          />
        </div>
      )}
    </div>
  );
}
