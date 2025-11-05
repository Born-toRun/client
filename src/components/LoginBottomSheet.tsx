"use client";
import CloseIcon from "@/icons/close-icon.svg";
import DialogImageIcon from "@/icons/dialog-img.svg";
import KakaoIcon from "@/icons/kakao-icon.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./Sheet";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  callback?: () => void;
}

export default function LoginBottomSheet({ onOpenChange, open }: Props) {
  const handleLoginRedirect = () => {
    // OAuth는 브라우저 리다이렉트이므로 직접 백엔드 URL 사용
    const BACKEND_URL = "https://born-to-run.kro.kr:8443";
    const redirectUri = `${window.location.origin}/login/oauth2/code/kakao`;
    window.location.href = `${BACKEND_URL}/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full max-w-[768px] mx-auto h-[640px] p-[16px] pb-[164px] bg-white rounded-t-[8px]"
        side="bottom"
      >
        <SheetHeader className="flex w-full items-center h-[32px] justify-end">
          <button onClick={onOpenChange} className="cursor-pointer">
            <CloseIcon />
          </button>
        </SheetHeader>
        <div>
          <div className="my-[16px] w-full flex justify-center items-center">
            <DialogImageIcon />
          </div>

          <div className="flex flex-col gap-[8px] py-[16px] w-full">
            <SheetTitle className="headline-md text-center">
              본투런과 함께 뛰어요!
            </SheetTitle>
            <SheetDescription className="text-n-200 text-center">
              반가워요! 본투런 회원이 되어 간편한 러닝 모임 관리와 러너들과의
              소통을 경험해보세요!
            </SheetDescription>
          </div>
        </div>
        <SheetFooter>
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="text-black bg-[#FEE500] rounded-[12px] w-full flex justify-center items-center h-[56px] gap-[8px] mt-[16px] cursor-pointer"
          >
            <KakaoIcon />
            카카오로 간편하게 시작하기
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
