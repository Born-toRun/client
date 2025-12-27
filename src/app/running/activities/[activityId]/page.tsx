"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CustomDialog from "@/components/CustomDialog";
import LoginBottomSheet from "@/components/LoginBottomSheet";
import { useModal } from "@/features/hooks/useModal";
import ActivityDetailHeader from "@/features/running/activities/detail/components/ActivityDetailHeader";
import HostInfo from "@/features/running/activities/detail/components/HostInfo";
import QuickInfoCard from "@/features/running/activities/detail/components/QuickInfoCard";
import ImageCarousel from "@/features/running/activities/detail/components/ImageCarousel";
import DetailInfoSection from "@/features/running/activities/detail/components/DetailInfoSection";
import PrecautionsBox from "@/features/running/activities/detail/components/PrecautionsBox";
import BottomCTA from "@/features/running/activities/detail/components/BottomCTA";
import ParticipantsBottomSheet from "@/features/running/activities/detail/components/ParticipantsBottomSheet";
import ActionSheet from "@/features/running/activities/detail/components/ActionSheet";
import {
  useGetActivityDetailQuery,
  useGetParticipantsQuery,
  useJoinActivityMutation,
  useDeleteActivityMutation,
} from "@/features/running/activities/detail/hooks/queries";
import {
  RECRUITMENT_TYPE_COLORS,
  RECRUITMENT_TYPE_LABELS,
} from "@/features/running/activities/list/constants";
import { getRecruitmentType } from "@/features/running/activities/detail/utils/recruitmentType";
import { getDDay } from "@/utils/date";
import { pageRoutes } from "@/constants/route";
import { AxiosError } from "axios";

interface Props {
  params: Promise<{ activityId: string }>;
}

/**
 * 모임 상세 페이지
 */
export default function ActivityDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const activityId = parseInt(resolvedParams.activityId, 10);
  const router = useRouter();

  // 모달 상태
  const participantsSheet = useModal();
  const actionSheet = useModal();
  const loginModal = useModal();
  const loginBottomSheet = useModal();
  const deleteCancelModal = useModal();
  const deleteCompleteModal = useModal();

  // 쿼리 및 뮤테이션
  const { data: activity, isPending } = useGetActivityDetailQuery(activityId);
  const { data: participantsData } = useGetParticipantsQuery(activityId);
  const joinMutation = useJoinActivityMutation();
  const deleteMutation = useDeleteActivityMutation();

  // 공유하기
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: activity?.title,
          url,
        });
      } catch {
        // 사용자가 공유 취소
      }
    } else {
      // 공유 API 미지원 시 클립보드 복사
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다!");
    }
  };

  // 내용 복사
  const handleCopyContent = async () => {
    if (!activity) return;
    const content = `${activity.title}\n\n${activity.contents}`;
    await navigator.clipboard.writeText(content);
    alert("내용이 복사되었습니다!");
  };

  // 모임 취소 확인
  const handleDeleteConfirm = () => {
    deleteCancelModal.open();
  };

  // 모임 취소 실행
  const handleDeleteActivity = () => {
    deleteMutation.mutate(activityId, {
      onSuccess: () => {
        deleteCancelModal.close();
        deleteCompleteModal.open();
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        if (axiosError?.response?.status === 401) {
          loginModal.open();
        }
      },
    });
  };

  // 모임 수정
  const handleEdit = () => {
    router.push(pageRoutes.running.activities.edit(activityId));
  };

  if (isPending || !activity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-n-500 body-md">로딩 중...</div>
      </div>
    );
  }

  // 모집 상태 계산 (백엔드 값이 없으면 클라이언트에서 계산)
  const recruitmentType = getRecruitmentType(activity);
  const dDay = getDDay(activity.startAt);
  const badgeColor =
    RECRUITMENT_TYPE_COLORS[recruitmentType] || "bg-n-40 text-white";
  const recruitmentLabel =
    RECRUITMENT_TYPE_LABELS[recruitmentType] || "종료";

  return (
    <>
      {/* 헤더 */}
      <ActivityDetailHeader
        onShare={handleShare}
        onMoreClick={actionSheet.open}
      />

      {/* 컨텐츠 */}
      <div className="pt-14 pb-32">
        {/* 이미지 캐러셀 (모든 이미지 표시) */}
        {activity.imageUrls && activity.imageUrls.length > 0 ? (
          <ImageCarousel
            imageUrls={activity.imageUrls}
            activityTitle={activity.title}
            dDay={dDay}
            recruitmentLabel={recruitmentLabel}
            badgeColor={badgeColor}
          />
        ) : (
          /* 배지 (이미지가 없을 때만 표시) */
          <div className="flex items-center gap-2 px-5 py-3">
            {dDay && (
              <span className="inline-block px-3 py-1 bg-n-900 text-white round-full label-sm">
                {dDay}
              </span>
            )}
            <span
              className={`inline-block px-3 py-1 round-full label-sm ${badgeColor}`}
            >
              {recruitmentLabel}
            </span>
          </div>
        )}

        {/* 작성자 정보 */}
        <HostInfo host={activity.host} updatedAt={activity.updatedAt} />

        {/* 제목 */}
        <div className="px-5 py-4">
          <h1 className="text-3xl font-bold text-n-900 leading-tight">{activity.title}</h1>
        </div>

        {/* 내용 */}
        <div className="px-5 pb-6">
          <p className="text-base text-n-700 leading-relaxed whitespace-pre-wrap">
            {activity.contents}
          </p>
        </div>

        {/* Quick Info Card */}
        <div className="py-8">
          <QuickInfoCard
            startAt={activity.startAt}
            venue={activity.venue}
            participantsQty={activity.participantsQty}
            participantsLimit={activity.participantsLimit}
            entryFee={activity.entryFee}
            onParticipantsClick={participantsSheet.open}
          />
        </div>

        {/* 코스 정보 */}
        <div className="border-t border-n-50">
          <DetailInfoSection
            startAt={activity.startAt}
            venue={activity.venue}
            venueUrl={activity.venueUrl}
            course={activity.course}
            routeImageUrl={activity.routeImageUrl}
          />
        </div>

        {/* 유의사항 */}
        {activity.precautions && (
          <div className="py-8">
            <PrecautionsBox precautions={activity.precautions} />
          </div>
        )}
      </div>

      {/* 하단 고정 영역 */}
      <BottomCTA
        isMyActivity={activity.isMyActivity}
        isParticipating={activity.isParticipating}
        participantsQty={activity.participantsQty}
        host={participantsData?.host}
        participants={participantsData?.participants}
        joinMutation={joinMutation}
        recruitmentType={recruitmentType}
        activityId={activityId}
        onParticipantsClick={participantsSheet.open}
        onAttendanceClick={() => {
          router.push(pageRoutes.running.activities.attendance(activityId));
        }}
      />

      {/* 참여자 바텀시트 */}
      {participantsData && (
        <ParticipantsBottomSheet
          open={participantsSheet.isActive}
          onOpenChange={participantsSheet.close}
          host={participantsData.host}
          participants={participantsData.participants}
        />
      )}

      {/* 액션 시트 */}
      <ActionSheet
        open={actionSheet.isActive}
        onOpenChange={actionSheet.close}
        isMyActivity={activity.isMyActivity}
        onCopyContent={handleCopyContent}
        onEdit={handleEdit}
        onDelete={handleDeleteConfirm}
      />

      {/* 로그인 모달 */}
      <CustomDialog
        open={loginModal.isActive}
        onOpenChange={loginModal.close}
        contents={{
          title: "로그인이 필요해요",
          description:
            "본투런 회원이 되면 러닝 모임 관리와 소통이 훨씬 간편해져요!",
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

      {/* 모임 취소 확인 모달 */}
      <CustomDialog
        open={deleteCancelModal.isActive}
        onOpenChange={deleteCancelModal.close}
        contents={{
          title: "정말로 모임을 취소하시겠어요?",
          description: "취소된 모임은 복구할 수 없어요.",
        }}
        footer={
          <div className="flex w-full justify-between gap-2">
            <Button
              onClick={deleteCancelModal.close}
              variants="secondary"
              text="돌아가기"
              size="lg"
              tone="gray"
            />
            <Button
              onClick={handleDeleteActivity}
              variants="danger"
              text="모임 취소"
              size="lg"
              tone="red"
              loading={deleteMutation.isPending}
            />
          </div>
        }
      />

      {/* 모임 취소 완료 모달 */}
      <CustomDialog
        open={deleteCompleteModal.isActive}
        onOpenChange={() => {
          deleteCompleteModal.close();
          router.push(pageRoutes.running.list);
        }}
        contents={{
          title: "모임이 삭제되었어요",
          description:
            "모임 예약 완료했던 러너들에게 꼭 연락해주세요.",
        }}
        footer={
          <Button
            onClick={() => {
              deleteCompleteModal.close();
              router.push(pageRoutes.running.list);
            }}
            variants="primary"
            text="확인"
            size="lg"
            tone="green"
          />
        }
      />
    </>
  );
}
