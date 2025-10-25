"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CustomDialog from "@/components/CustomDialog";
import LoginBottomSheet from "@/components/LoginBottomSheet";
import { useModal } from "@/features/hooks/useModal";
import ActivityDetailHeader from "@/features/running/activities/detail/components/ActivityDetailHeader";
import HostInfo from "@/features/running/activities/detail/components/HostInfo";
import RecruitmentInfoCard from "@/features/running/activities/detail/components/RecruitmentInfoCard";
import DetailInfoSection from "@/features/running/activities/detail/components/DetailInfoSection";
import PrecautionsBox from "@/features/running/activities/detail/components/PrecautionsBox";
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

  // 예약하기
  const handleJoin = () => {
    joinMutation.mutate(activityId, {
      onError: (error) => {
        const axiosError = error as AxiosError;
        if (axiosError?.response?.status === 401) {
          loginModal.open();
        }
      },
    });
  };


  if (isPending || !activity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-n-500 body-md">로딩 중...</div>
      </div>
    );
  }

  const dDay = getDDay(activity.startAt);
  const badgeColor =
    RECRUITMENT_TYPE_COLORS[activity.recruitmentType] || "bg-n-40 text-white";
  const recruitmentLabel =
    RECRUITMENT_TYPE_LABELS[activity.recruitmentType] || "종료";

  return (
    <>
      {/* 헤더 */}
      <ActivityDetailHeader
        onShare={handleShare}
        onMoreClick={actionSheet.open}
      />

      {/* 컨텐츠 */}
      <div className="pt-14 pb-48">
        {/* D-DAY + 모집 상태 */}
        <div className="flex items-center gap-2 px-4 py-3">
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

        {/* 작성자 정보 */}
        <HostInfo host={activity.host} updatedAt={activity.updatedAt} />

        {/* 제목 */}
        <div className="px-4 py-4">
          <h1 className="title-xl text-n-900 mb-4">{activity.title}</h1>
        </div>

        {/* 내용 */}
        <div className="px-4 pb-4">
          <p className="body-md text-n-700 whitespace-pre-wrap">
            {activity.contents}
          </p>
        </div>

        {/* 모집/회비 정보 */}
        <div className="py-4">
          <RecruitmentInfoCard
            participantsQty={activity.participantsQty}
            participantsLimit={activity.participantsLimit}
            entryFee={activity.entryFee}
            onParticipantsClick={participantsSheet.open}
          />
        </div>

        {/* 상세 정보 */}
        <div className="border-t border-n-30 py-4">
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
          <div className="py-4">
            <PrecautionsBox precautions={activity.precautions} />
          </div>
        )}
      </div>

      {/* 하단 고정 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-n-30 p-4 z-40">
        <div className="max-w-[786px] mx-auto">
          {activity.isMyActivity ? (
            // 작성자인 경우: 출석체크 UI
            <div className="space-y-3">
              <p className="body-sm text-n-700">
                모임에 모두 참석 하셨나요? 최종 인원과 금액을 확인하고 출석체크를 해주세요.
              </p>

              <Button
                text="출석체크"
                variants="primary"
                size="lg"
                tone="green"
                onClick={() => {
                  router.push(pageRoutes.running.activities.attendance(activityId));
                }}
              />
            </div>
          ) : (
            // 작성자가 아닌 경우: 예약 버튼 또는 출석체크 버튼
            <>
              {activity.isParticipating ? (
                // 참여 중인 경우
                <div className="space-y-3">
                  <p className="body-sm text-n-700">
                    모임에 참석 하셨나요? 모임장에게 코드를 받은 뒤 출석체크를 해주세요.
                  </p>
                  <Button
                    text="출석체크"
                    variants="primary"
                    size="lg"
                    tone="green"
                    onClick={() => {
                      router.push(pageRoutes.running.activities.attendance(activityId));
                    }}
                  />
                </div>
              ) : (
                // 미참여인 경우: 예약하기 버튼
                <Button
                  text="예약하기"
                  variants="primary"
                  size="lg"
                  tone="green"
                  onClick={handleJoin}
                  disabled={
                    joinMutation.isPending ||
                    activity.recruitmentType === "FULL" ||
                    activity.recruitmentType === "CLOSED"
                  }
                  loading={joinMutation.isPending}
                />
              )}
            </>
          )}
        </div>
      </div>

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
