"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLoginBottomSheet } from "@/contexts/LoginBottomSheetContext";
import { ArrowLeft } from "lucide-react";
import { useMyFeeds } from "@/apis/feed/hooks/useMyFeeds";
import { pageRoutes } from "@/constants/route";
import { Skeleton } from "@radix-ui/themes";

/**
 * 내 피드 목록 (글 목록) 페이지
 * 사용자가 작성한 피드 목록을 표시합니다.
 *
 * - 로그인 필수 페이지
 * - 비로그인 사용자는 로그인 모달 표시
 * - 카드 클릭 시 피드 상세 페이지로 이동
 * - 빈 상태: 작성한 글이 없을 때 안내 메시지 표시
 */
export default function MyFeedsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { showLoginModal } = useLoginBottomSheet();

  // 로그인 모달이 이미 표시되었는지 추적 (무한 루프 방지)
  const hasShownLoginModal = useRef(false);

  // 인증되지 않은 사용자에게 로그인 모달을 한 번만 표시
  useEffect(() => {
    if (!authLoading && !isAuthenticated && !hasShownLoginModal.current) {
      showLoginModal();
      hasShownLoginModal.current = true;
    }
  }, [authLoading, isAuthenticated, showLoginModal]);

  // 내 피드 목록 조회
  const { data, isPending } = useMyFeeds({
    enabled: isAuthenticated, // 인증된 경우에만 API 호출
  });

  // 피드 목록
  const feedList = data?.feeds ?? [];

  // 로딩 상태 헤더 컴포넌트
  const PageHeader = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
      <div className="max-w-[786px] mx-auto flex items-center justify-between h-14 px-4">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-n-10 round-xs"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="title-lg text-n-900 absolute left-1/2 transform -translate-x-1/2">
          글 목록
        </h1>
        <div />
      </div>
    </header>
  );

  // 인증 상태 확인 중일 때는 로딩 메시지 표시 (깜빡임 방지)
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader />
        <div className="pt-14 flex items-center justify-center min-h-screen">
          <p className="body-md text-n-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 사용자는 콘텐츠를 표시하지 않음
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader />
        <div className="pt-14 min-h-screen flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <p className="title-lg text-n-900 text-center">
              로그인이 필요한 페이지입니다
            </p>
            <p className="body-md text-n-500 text-center">
              본투런 회원이 되면 작성한 글을 확인할 수 있어요!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 인증된 사용자에게만 피드 목록 렌더링
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      <main className="pt-14">
        {/* 로딩 상태 */}
        {isPending && <FeedListSkeleton />}

        {/* 피드 목록 */}
        {!isPending && feedList.length > 0 && (
          <ul className="divide-y divide-n-20">
            {feedList.map((feed) => (
              <Link
                href={pageRoutes.feeds.detail(feed.feedId)}
                key={feed.feedId}
                className="block hover:bg-n-5 transition-colors"
              >
                <li>
                  <article className="px-5 py-6 flex flex-col gap-4">
                    {/* 본문: 텍스트 */}
                    <p className="body-md text-n-900 line-clamp-3 whitespace-pre-wrap break-all leading-relaxed">
                      {feed.contents}
                    </p>

                    {/* 이미지 (있는 경우에만 표시) */}
                    {feed.imageUris && feed.imageUris.length > 0 && (
                      <div className="w-full aspect-video rounded-sm overflow-hidden bg-n-20">
                        <img
                          src={feed.imageUris[0]}
                          alt="피드 이미지"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </article>
                </li>
              </Link>
            ))}
          </ul>
        )}

        {/* 빈 상태: 작성한 글이 없을 때 */}
        {!isPending && feedList.length === 0 && (
          <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] px-4">
            <div className="flex flex-col items-center gap-4">
              <p className="title-md text-n-900 text-center">
                작성한 글이 없어요
              </p>
              <p className="body-md text-n-500 text-center">
                첫 번째 글을 작성해보세요!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * 피드 목록 스켈레톤 컴포넌트
 * 로딩 중일 때 표시되는 스켈레톤 UI (단순화된 버전)
 */
function FeedListSkeleton() {
  return (
    <div className="divide-y divide-n-20">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="px-5 py-6 flex flex-col gap-3">
          {/* 본문 텍스트 스켈레톤 */}
          <Skeleton width="100%" height="20px" className="!rounded-md" />
          <Skeleton width="85%" height="20px" className="!rounded-md" />
          <Skeleton width="60%" height="20px" className="!rounded-md" />
        </div>
      ))}
    </div>
  );
}
