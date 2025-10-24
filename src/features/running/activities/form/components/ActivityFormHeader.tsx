"use client";

import Header from "@/components/header/Header";
import CloseIcon from "@/icons/close-icon.svg";
import { useRouter } from "next/navigation";

interface ActivityFormHeaderProps {
  title: string;
  isSubmitting: boolean;
}

/**
 * 모임 폼 헤더 컴포넌트
 */
export default function ActivityFormHeader({
  title,
  isSubmitting,
}: ActivityFormHeaderProps) {
  const router = useRouter();

  return (
    <Header
      left={
        <button
          className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          <CloseIcon />
        </button>
      }
      title={title}
    />
  );
}
