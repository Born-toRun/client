"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMarathonDetail } from "@/apis/marathon";
import { apiRoutes } from "@/constants/route";
import { ArrowLeft, Calendar, MapPin, Mail, Phone, Globe, Users } from "lucide-react";
import BookmarkButton from "@/features/running/list/components/BookmarkButton";
import { useToggleBookmarkMutation } from "@/features/running/list/hooks/queries";
import { AxiosError } from "axios";
import { useModal } from "@/features/hooks/useModal";
import CustomDialog from "@/components/CustomDialog";
import LoginBottomSheet from "@/components/LoginBottomSheet";
import Button from "@/components/Button";
import Map from "@/components/Map";

/**
 * 마라톤 상세 페이지
 */
export default function MarathonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const marathonId = Number(params.marathonId);

  const loginModal = useModal();
  const loginBottomSheet = useModal();

  // 마라톤 상세 조회
  const { data: marathon, isPending, isError } = useQuery({
    queryKey: [apiRoutes.marathons.detail(marathonId)],
    queryFn: () => getMarathonDetail(marathonId),
    enabled: !!marathonId,
  });

  // 북마크 토글
  const toggleBookmarkMutation = useToggleBookmarkMutation();

  // 북마크 클릭 핸들러
  const handleBookmarkClick = () => {
    if (!marathon) return;

    toggleBookmarkMutation.mutate(
      { marathonId: marathon.id, isBookmarking: marathon.isBookmarking || false },
      {
        onError: (error) => {
          const axiosError = error as AxiosError;
          if (axiosError?.response?.status === 401) {
            loginModal.open();
          }
        },
      }
    );
  };

  // 로딩 상태
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-n-500 body-md">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (isError || !marathon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-n-500 body-md text-center">
          마라톤 정보를 불러올 수 없습니다.
        </div>
        <Button
          onClick={() => router.back()}
          variants="secondary"
          text="돌아가기"
          size="md"
          tone="gray"
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white pb-6">
        {/* 헤더 */}
        <header className="sticky top-0 z-10 bg-white border-b border-n-30">
          <div className="flex items-center justify-between h-14 px-4">
            <button
              onClick={() => router.back()}
              className="size-10 flex items-center justify-center"
              aria-label="뒤로가기"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="title-md text-n-900">마라톤 상세</h1>
            <div className="size-10">
              <BookmarkButton
                isBookmarking={marathon.isBookmarking || false}
                onClick={handleBookmarkClick}
                disabled={toggleBookmarkMutation.isPending}
              />
            </div>
          </div>
        </header>

        {/* 본문 */}
        <div className="px-4 py-6">
          {/* 제목 */}
          {marathon.title && (
            <h2 className="headline-sm text-n-900 mb-6">{marathon.title}</h2>
          )}

          {/* 정보 섹션 */}
          <div className="flex flex-col gap-4">
            {/* 일정 */}
            {marathon.schedule && (
              <InfoItem
                icon={<Calendar size={20} className="text-n-500" />}
                label="일정"
                value={marathon.schedule}
              />
            )}

            {/* 장소 */}
            {marathon.venue && (
              <InfoItem
                icon={<MapPin size={20} className="text-n-500" />}
                label="장소"
                value={marathon.venue}
              />
            )}

            {/* 지역 */}
            {marathon.location && (
              <InfoItem
                icon={<MapPin size={20} className="text-n-500" />}
                label="지역"
                value={marathon.location}
              />
            )}

            {/* 코스 */}
            {marathon.course && (
              <InfoItem
                label="코스"
                value={
                  <span className="inline-block px-3 py-1 bg-rg-300 text-white round-full label-xs">
                    {marathon.course}
                  </span>
                }
              />
            )}

            {/* 주최 */}
            {marathon.host && (
              <InfoItem
                icon={<Users size={20} className="text-n-500" />}
                label="주최"
                value={marathon.host}
              />
            )}

            {/* 대표자 */}
            {marathon.owner && (
              <InfoItem
                label="대표자"
                value={marathon.owner}
              />
            )}

            {/* 신청 기간 */}
            {marathon.duration && (
              <InfoItem
                icon={<Calendar size={20} className="text-n-500" />}
                label="신청 기간"
                value={marathon.duration}
              />
            )}

            {/* 연락처 */}
            {marathon.contact && (
              <InfoItem
                icon={<Phone size={20} className="text-n-500" />}
                label="연락처"
                value={
                  <a href={`tel:${marathon.contact}`} className="text-rg-400 hover:underline">
                    {marathon.contact}
                  </a>
                }
              />
            )}

            {/* 이메일 */}
            {marathon.email && (
              <InfoItem
                icon={<Mail size={20} className="text-n-500" />}
                label="이메일"
                value={
                  <a href={`mailto:${marathon.email}`} className="text-rg-400 hover:underline">
                    {marathon.email}
                  </a>
                }
              />
            )}

            {/* 홈페이지 */}
            {marathon.homepage && (
              <InfoItem
                icon={<Globe size={20} className="text-n-500" />}
                label="홈페이지"
                value={
                  <a
                    href={marathon.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rg-400 hover:underline break-all"
                  >
                    {marathon.homepage}
                  </a>
                }
              />
            )}
          </div>

          {/* 지도 섹션 */}
          {marathon.venue && (
            <div className="mt-8">
              <h3 className="title-md text-n-900 mb-3">오시는 길</h3>
              <Map venue={marathon.venue} title={marathon.title} height="400px" />
              {/* 주소 정보 표시 */}
              <div className="mt-3 flex items-start gap-2 p-3 bg-n-20 round-sm">
                <MapPin size={16} className="text-n-500 flex-shrink-0 mt-0.5" />
                <p className="body-sm text-n-700 flex-1">{marathon.venue}</p>
              </div>
            </div>
          )}

          {/* 장소 상세 */}
          {marathon.venueDetail && (
            <div className="mt-8">
              <h3 className="title-md text-n-900 mb-3">장소 상세</h3>
              <p className="body-md text-n-700 whitespace-pre-wrap">
                {marathon.venueDetail}
              </p>
            </div>
          )}

          {/* 추가 소개 */}
          {marathon.remark && (
            <div className="mt-8">
              <h3 className="title-md text-n-900 mb-3">추가 안내</h3>
              <p className="body-md text-n-700 whitespace-pre-wrap">
                {marathon.remark}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 로그인 모달 */}
      <CustomDialog
        open={loginModal.isActive}
        onOpenChange={loginModal.close}
        contents={{
          title: "로그인이 필요해요",
          description: "본투런 회원이 되면 러닝 모임 관리와 소통이 훨씬 간편해져요!",
        }}
        footer={
          <div className="flex w-full justify-between gap-2">
            <Button
              onClick={loginModal.close}
              variants="text"
              text="닫기"
              size="lg"
              tone="gray"
            />
            <Button
              onClick={() => {
                loginBottomSheet.open();
                loginModal.close();
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
        onOpenChange={loginBottomSheet.close}
        open={loginBottomSheet.isActive}
      />
    </>
  );
}

/**
 * 정보 아이템 컴포넌트
 */
function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
      <div className="flex-1 min-w-0">
        <div className="label-sm text-n-500 mb-1">{label}</div>
        <div className="body-md text-n-900">{value}</div>
      </div>
    </div>
  );
}
