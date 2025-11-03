"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, Sparkles } from "lucide-react";

/**
 * 알림 페이지 (Coming Soon)
 * 현재 준비 중인 알림 기능을 안내하는 페이지입니다.
 *
 * - 헤더: 뒤로가기 버튼과 "알림" 타이틀
 * - 본문: 준비 중임을 알리는 친근한 메시지와 아이콘
 * - 디자인: 본투런 앱의 브랜드 컬러(rg-400, rg-500)와 타이포그래피 시스템 활용
 */
export default function NotificationsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-n-30">
        <div className="flex items-center justify-between h-14 px-4 max-w-[786px] mx-auto">
          <button
            onClick={() => router.back()}
            className="size-10 flex items-center justify-center"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={24} className="text-n-900" />
          </button>
          <h1 className="title-md text-n-900">알림</h1>
          {/* 헤더 균형을 위한 빈 공간 */}
          <div className="size-10" />
        </div>
      </header>

      {/* 본문 */}
      <div className="flex flex-col items-center justify-center px-4 pt-24 pb-12 max-w-[786px] mx-auto">
        {/* 아이콘 영역 */}
        <div className="relative mb-8">
          {/* 배경 원형 장식 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-32 bg-rg-400/10 rounded-full animate-pulse" />
          </div>

          {/* 메인 아이콘 */}
          <div className="relative flex items-center justify-center size-32">
            <div className="absolute size-24 bg-rg-400/20 rounded-full" />
            <Bell size={56} className="relative text-rg-400 z-10" strokeWidth={1.5} />

            {/* 반짝이는 장식 아이콘 */}
            <Sparkles
              size={20}
              className="absolute -top-2 -right-2 text-rg-500 animate-pulse"
            />
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <h2 className="headline-sm text-n-900 text-center">
            준비 중입니다
          </h2>
          <div className="flex flex-col items-center gap-2">
            <p className="body-lg text-n-500 text-center">
              더 나은 알림 기능을 준비하고 있어요.
            </p>
            <p className="body-md text-n-200 text-center">
              조금만 기다려주시면 곧 만나볼 수 있습니다!
            </p>
          </div>
        </div>

        {/* 기능 안내 카드 */}
        <div className="w-full max-w-md">
          <div className="bg-n-10 border border-n-30 rounded-[12px] p-6">
            <h3 className="label-md text-n-900 mb-4">곧 만나볼 수 있는 기능</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <div className="size-5 mt-0.5 rounded-full bg-rg-400/20 flex items-center justify-center flex-shrink-0">
                  <div className="size-2 rounded-full bg-rg-400" />
                </div>
                <span className="body-md text-n-500">
                  모임 참여 및 활동 알림
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="size-5 mt-0.5 rounded-full bg-rg-400/20 flex items-center justify-center flex-shrink-0">
                  <div className="size-2 rounded-full bg-rg-400" />
                </div>
                <span className="body-md text-n-500">
                  댓글 및 추천 알림
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="size-5 mt-0.5 rounded-full bg-rg-400/20 flex items-center justify-center flex-shrink-0">
                  <div className="size-2 rounded-full bg-rg-400" />
                </div>
                <span className="body-md text-n-500">
                  크루 활동 및 공지사항
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="size-5 mt-0.5 rounded-full bg-rg-400/20 flex items-center justify-center flex-shrink-0">
                  <div className="size-2 rounded-full bg-rg-400" />
                </div>
                <span className="body-md text-n-500">
                  마라톤 대회 일정 리마인더
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 인사말 */}
        <p className="body-sm text-n-200 text-center mt-8">
          본투런과 함께 달리는 모든 순간을 응원합니다! 🏃‍♂️
        </p>
      </div>
    </main>
  );
}
