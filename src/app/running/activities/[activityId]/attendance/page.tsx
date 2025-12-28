"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Button from "@/components/Button";
import CustomDialog from "@/components/CustomDialog";
import LoginBottomSheet from "@/components/LoginBottomSheet";
import { useModal } from "@/features/hooks/useModal";
import { useGetActivityDetailQuery } from "@/features/running/activities/detail/hooks/queries";
import { openActivity, checkAttendance, getParticipants } from "@/apis/activity";
import { apiRoutes } from "@/constants/route";

interface Props {
  params: Promise<{ activityId: string }>;
}

/**
 * 출석체크 페이지
 */
export default function AttendancePage({ params }: Props) {
  const resolvedParams = use(params);
  const activityId = parseInt(resolvedParams.activityId, 10);
  const router = useRouter();
  const queryClient = useQueryClient();

  // 모달 상태
  const loginModal = useModal();
  const loginBottomSheet = useModal();
  const successModal = useModal();
  const failureModal = useModal();

  // 탭 상태 ('code' | 'status')
  const [activeTab, setActiveTab] = useState<"code" | "status">("code");

  // 쿼리
  const { data: activity, isPending } = useGetActivityDetailQuery(activityId);

  // 참여자 목록 쿼리 (출석 현황 탭에서 사용)
  const { data: participantsData, isLoading: isParticipantsLoading } = useQuery({
    queryKey: [apiRoutes.activities.participants(activityId)],
    queryFn: () => getParticipants(activityId),
    enabled: activeTab === "status", // 출석 현황 탭일 때만 조회
  });

  // 출석 코드 상태
  const [attendanceCode, setAttendanceCode] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // 사용자 입력 코드 상태 (4자리)
  const [userCode, setUserCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 출석 코드 생성 뮤테이션
  const openMutation = useMutation({
    mutationFn: () => openActivity(activityId),
    onSuccess: (data) => {
      // 출석 코드를 항상 4자리로 패딩
      const paddedCode = String(data.attendanceCode).padStart(4, "0");
      setAttendanceCode(paddedCode);
      setExpiresAt(data.expiresAt);

      // 모임 상세 정보 다시 조회 - refetchQueries로 즉시 강제 재조회
      const queryKey = [apiRoutes.activities.detail(activityId)];
      queryClient.refetchQueries({ queryKey });
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 401) {
        loginModal.open();
      }
    },
  });

  // 출석 체크 뮤테이션
  const attendanceMutation = useMutation({
    mutationFn: (code: string) => checkAttendance(activityId, code),
    onSuccess: () => {
      successModal.open();
      const queryKey = [apiRoutes.activities.detail(activityId)];
      queryClient.refetchQueries({ queryKey });
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 401) {
        loginModal.open();
      } else {
        failureModal.open();
      }
    },
  });

  // 페이지 로드 시 기존 출석 코드 복원
  useEffect(() => {
    // attendanceCode가 존재하고 isOpen이 true일 때만 복원
    if (activity?.attendanceCode && activity?.isOpen) {
      // 출석 코드를 항상 4자리로 패딩 (number를 string으로 변환)
      const paddedCode = String(activity.attendanceCode).padStart(4, "0");

      setAttendanceCode(paddedCode);
      setExpiresAt(activity.attendanceExpiresAt || null);
    }
  }, [activity]);

  // 타이머 계산
  useEffect(() => {
    if (!expiresAt) return;

    // 남은 시간을 계산하는 함수
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const diff = Math.max(0, expiry - now);
      const seconds = Math.floor(diff / 1000);

      return { seconds, diff };
    };

    // 즉시 실행하여 초기값 설정
    const { seconds: initialSeconds, diff: initialDiff } = calculateTimeRemaining();
    setTimeRemaining(initialSeconds);

    if (initialDiff <= 0) {
      return;
    }

    // 1초마다 업데이트
    const interval = setInterval(() => {
      const { seconds, diff } = calculateTimeRemaining();
      setTimeRemaining(seconds);

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // 활성화 조건 체크: startAt 10분 전부터
  const canActivate = () => {
    if (!activity?.startAt) return false;
    const now = new Date();

    // ISO 8601 형식에서 시간대 정보가 없는 경우 로컬 시간으로 처리
    // "2025-12-28T11:13:00" 형식을 로컬 시간으로 파싱하기 위해 'T'를 ' '로 변경
    // 이렇게 하면 브라우저가 로컬 시간으로 해석함
    const startTimeString = activity.startAt.includes("Z") || activity.startAt.includes("+") || activity.startAt.includes("-")
      ? activity.startAt // 이미 시간대 정보가 있으면 그대로 사용
      : activity.startAt.replace("T", " "); // 없으면 로컬 시간으로 파싱되도록 변경

    const startTime = new Date(startTimeString);
    const tenMinutesBefore = new Date(startTime.getTime() - 10 * 60 * 1000);

    return now >= tenMinutesBefore;
  };

  // 출석 코드 만료 상태 체크
  const isCodeExpired = activity?.isOpen && !activity?.attendanceCode;

  // 시간 포맷 (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // 코드 입력 핸들러
  const handleCodeInput = (index: number, value: string) => {
    // 숫자만 입력 가능
    if (!/^\d*$/.test(value)) return;

    const newCode = [...userCode];
    newCode[index] = value.slice(0, 1);
    setUserCode(newCode);

    // 자동 포커스 이동
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // 백스페이스 핸들러
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !userCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 출석 코드 전송
  const handleSubmitCode = () => {
    const code = userCode.join("");
    if (code.length !== 4) return;
    attendanceMutation.mutate(code);
  };

  if (isPending || !activity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-n-500 body-md">로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-n-30">
        <div className="max-w-[786px] mx-auto flex items-center justify-between h-14 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-n-10 round-xs"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="title-lg text-black absolute left-1/2 transform -translate-x-1/2">
            {activity?.isMyActivity ? "출석 코드" : "출석 체크"}
          </h1>
          <div />
        </div>
      </header>

      {/* 컨텐츠 */}
      <div className="pt-14 pb-8 px-4 min-h-screen">
        <div className="max-w-[786px] mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-n-30 mb-6">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                activeTab === "code"
                  ? "border-rg-400"
                  : "border-transparent hover:bg-n-10"
              }`}
            >
              <span
                className={`label-lg ${
                  activeTab === "code" ? "text-rg-400" : "text-n-300"
                }`}
              >
                출석 코드
              </span>
            </button>
            <button
              onClick={() => setActiveTab("status")}
              className={`flex-1 py-4 text-center border-b-2 transition-colors cursor-pointer ${
                activeTab === "status"
                  ? "border-rg-400"
                  : "border-transparent hover:bg-n-10"
              }`}
            >
              <span
                className={`label-lg ${
                  activeTab === "status" ? "text-rg-400" : "text-n-300"
                }`}
              >
                출석 현황
              </span>
            </button>
          </div>

          {activeTab === "code" ? (
            // 출석 코드 탭
            activity.isMyActivity ? (
              // 작성자 UI
              <div className="space-y-6">
                {/* 안내 문구 */}
                <div className="bg-n-10 p-4 round-sm">
                  <h2 className="title-md text-n-900 mb-3">모임장 출석 체크리스트</h2>
                  <ol className="space-y-2 body-sm text-n-700">
                    <li>1. 참여자가 현장에 참석했는지 확인해주세요.</li>
                    <li>2. 회비를 제출했는지 확인해주세요.</li>
                    <li>3. 위 사항을 모두 확인한 뒤 출석을 체크해주세요!</li>
                    <li>4. 예약자가 출석 코드를 입력하면 참석완료 되어요!</li>
                  </ol>
                </div>

              {/* 통계 정보 */}
              <div className="flex items-center gap-4 p-4 bg-n-10 round-sm">
                <div className="flex items-center gap-2">
                  <span className="body-md text-n-700">총 예약 인원</span>
                  <span className="title-md text-rg-400">{activity.participantsQty}명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="body-md text-n-700">총 참가비</span>
                  <span className="title-md text-rg-400">
                    {((activity.participationFee ?? 0) * activity.participantsQty).toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 출석 코드란 */}
              <div className="space-y-3">
                <h3 className="title-md text-n-900">출석 코드</h3>
                <p className="body-sm text-n-500">
                  아래 코드를 현장에서 구두로 알려주세요. 예약자가 코드를 입력하면 출석이 완료되어요.
                </p>

                {isCodeExpired ? (
                  // 코드 만료 상태
                  <>
                    <div className="text-center py-8">
                      <p className="body-md text-n-700 mb-2">출석 코드가 만료되었습니다</p>
                      <p className="body-sm text-n-500 mb-4">
                        새로운 코드를 생성하여 참여자들에게 알려주세요
                      </p>
                    </div>
                    <Button
                      text="새 출석 코드 생성"
                      variants="primary"
                      size="lg"
                      tone="green"
                      onClick={() => openMutation.mutate()}
                      disabled={openMutation.isPending}
                      loading={openMutation.isPending}
                    />
                  </>
                ) : (
                  <>
                    {/* 코드 표시 영역 */}
                    <div className="flex items-center justify-center gap-3 py-8">
                      {attendanceCode ? (
                        <>
                          {attendanceCode.split("").map((digit, index) => (
                            <div
                              key={index}
                              className="w-16 h-20 flex items-center justify-center bg-rg-50 border-2 border-rg-400 round-sm"
                            >
                              <span className="text-4xl font-bold text-rg-400">{digit}</span>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {[0, 1, 2, 3].map((index) => (
                            <div
                              key={index}
                              className="w-16 h-20 flex items-center justify-center bg-n-20 border-2 border-n-40 round-sm"
                            >
                              <span className="text-4xl font-bold text-n-300">-</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    {/* 남은 시간 */}
                    {attendanceCode && (
                      <div className="text-center">
                        <p className="body-sm text-n-500 mb-1">남은 시간</p>
                        <p className="title-xl text-rg-400">{formatTime(timeRemaining)}</p>
                      </div>
                    )}

                    {/* 하단 버튼 */}
                    <div className="pt-4">
                      {!attendanceCode && (
                        <p className="body-sm text-n-500 text-center mb-3">
                          집합 시간이 되면 출석 코드를 만들 수 있어요.
                        </p>
                      )}
                      <Button
                        text="출석 코드 만들기"
                        variants="primary"
                        size="lg"
                        tone="green"
                        onClick={() => openMutation.mutate()}
                        disabled={!canActivate() || openMutation.isPending || !!attendanceCode}
                        loading={openMutation.isPending}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            // 사용자 UI
            <div className="space-y-6">
              {/* 안내 문구 */}
              <div className="bg-n-10 p-4 round-sm">
                <h2 className="title-md text-n-900 mb-3">예약자 출석 체크리스트</h2>
                <ol className="space-y-2 body-sm text-n-700">
                  <li>1. 현장에 참석한 뒤 회비가 있다면 회비를 제출해주세요.</li>
                  <li>2. 모임장에게 출석 코드를 받아주세요.</li>
                  <li>3. 전달받은 코드를 입력하면 출석 체크 완료!</li>
                </ol>
              </div>

              {/* 출석 코드란 */}
              <div className="space-y-3">
                <h3 className="title-md text-n-900">출석 코드</h3>
                <p className="body-sm text-n-500">
                  현장에서 모임장에게 전달받은 코드를 입력하면 출석이 완료되어요.
                </p>

                {activity.isAttended ? (
                  // 출석 완료
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-rg-50 round-full mb-4">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-rg-400"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="title-lg text-rg-400">출석 완료</p>
                  </div>
                ) : (
                  <>
                    <p className="body-md text-n-700 mb-3">코드를 입력해 주세요.</p>

                    {/* 코드 입력 필드 */}
                    <div className="flex items-center justify-center gap-3 py-4">
                      {userCode.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleCodeInput(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          disabled={!activity.isOpen || activity.isAttended}
                          className="w-16 h-20 text-center text-4xl font-bold border-2 border-n-40 round-sm focus:border-rg-400 focus:outline-none disabled:bg-n-20 disabled:text-n-300"
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* 하단 버튼 */}
              <div className="pt-4">
                {!activity.isOpen && !activity.isAttended && (
                  <p className="body-sm text-n-500 text-center mb-3">
                    집합 시간이 되면 출석 코드를 입력할 수 있어요.
                  </p>
                )}
                <Button
                  text="출석 코드 전송"
                  variants="primary"
                  size="lg"
                  tone="green"
                  onClick={handleSubmitCode}
                  disabled={
                    !activity.isOpen ||
                    activity.isAttended ||
                    userCode.join("").length !== 4 ||
                    attendanceMutation.isPending
                  }
                  loading={attendanceMutation.isPending}
                />
              </div>
            </div>
          )
        ) : (
            // 출석 현황 탭
            <div className="space-y-6">
              {isParticipantsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-n-500 body-md">로딩 중...</div>
                </div>
              ) : participantsData ? (
                <>
                  {/* 통계 정보 */}
                  <div className="bg-n-10 p-4 round-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="body-sm text-n-500 mb-1">총 예약 인원</p>
                        <p className="title-lg text-n-900">
                          {(participantsData.participants?.length ?? 0) + 1}명
                        </p>
                      </div>
                      {activity.isMyActivity && (
                        <div>
                          <p className="body-sm text-n-500 mb-1">총 참가비</p>
                          <p className="title-lg text-rg-400">
                            {((activity.participationFee ?? 0) * ((participantsData.participants?.length ?? 0) + 1)).toLocaleString()}원
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 모임장 */}
                  <div>
                    <h3 className="title-md text-n-900 mb-3">모임장</h3>
                    <div className="flex items-center gap-3 p-4 bg-n-10 round-sm">
                      <div className="w-12 h-12 round-full bg-n-100 overflow-hidden flex-shrink-0">
                        {participantsData.host.profileImageUri ? (
                          <img
                            src={participantsData.host.profileImageUri}
                            alt={participantsData.host.userName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-n-500 title-md">
                            {participantsData.host.userName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="body-md text-n-900 font-semibold">
                          {participantsData.host.userName}
                        </p>
                        {participantsData.host.crewName && (
                          <p className="body-sm text-n-500">
                            {participantsData.host.crewName}
                          </p>
                        )}
                      </div>
                      {activity.isOpen && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 round-full bg-rg-400" />
                          <span className="body-sm text-rg-400 font-semibold">참석</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 참여자 목록 */}
                  <div>
                    <h3 className="title-md text-n-900 mb-3">
                      참여자 ({participantsData.participants?.length ?? 0}명)
                    </h3>
                    {(participantsData.participants?.length ?? 0) > 0 ? (
                      <div className="space-y-2">
                        {participantsData.participants?.map((participant) => (
                          <div
                            key={participant.userId}
                            className="flex items-center gap-3 p-4 bg-n-10 round-sm"
                          >
                            <div className="w-12 h-12 round-full bg-n-100 overflow-hidden flex-shrink-0">
                              {participant.profileImageUri ? (
                                <img
                                  src={participant.profileImageUri}
                                  alt={participant.userName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-n-500 title-md">
                                  {participant.userName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="body-md text-n-900 font-semibold">
                                {participant.userName}
                              </p>
                              {participant.crewName && (
                                <p className="body-sm text-n-500">
                                  {participant.crewName}
                                </p>
                              )}
                            </div>
                            {/* 출석 여부는 현재 API에서 제공하지 않으므로 생략 */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="body-md text-n-500">아직 참여자가 없어요</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="body-md text-n-500">참여자 정보를 불러올 수 없어요</p>
                </div>
              )}
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

      {/* 출석 완료 모달 */}
      <CustomDialog
        open={successModal.isActive}
        onOpenChange={() => {
          successModal.close();
          router.back();
        }}
        contents={{
          title: "출석 완료!",
          description: "출석을 완료했어요! 힘차게 러닝을 시작해볼까요?",
        }}
        footer={
          <Button
            onClick={() => {
              successModal.close();
              router.back();
            }}
            variants="primary"
            text="확인"
            size="lg"
            tone="green"
          />
        }
      />

      {/* 출석 실패 모달 */}
      <CustomDialog
        open={failureModal.isActive}
        onOpenChange={failureModal.close}
        contents={{
          title: "출석 체크 실패",
          description: "출석 코드를 다시 확인해주시고, 잠시 후 다시 시도해주세요.",
        }}
        footer={
          <Button
            onClick={failureModal.close}
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
