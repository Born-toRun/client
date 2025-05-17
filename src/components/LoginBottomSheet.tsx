'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './Sheet';
import DialogImageIcon from '@/icons/dialog-img.svg';
import CloseIcon from '@/icons/close-icon.svg';
import KakaoIcon from '@/icons/kakao-icon.svg';

interface Props {
  open: boolean;
  onOpenChange: () => void;
  callback?: () => void;
}

export default function LoginBottomSheet({ onOpenChange, open }: Props) {
  const handleLoginRedirect = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className='w-full h-[640px] p-[16px] pb-[164px] bg-white rounded-t-[8px]'
        side='bottom'
      >
        <SheetHeader className='flex w-full items-center h-[32px] justify-end'>
          <button onClick={onOpenChange}>
            <CloseIcon />
          </button>
        </SheetHeader>

        <div>
          <div className='my-[16px] w-full flex justify-center items-center'>
            <DialogImageIcon />
          </div>

          <div className='flex flex-col gap-[8px] py-[16px] w-full'>
            <SheetTitle className='headline-md text-center'>
              본투런과 함께 뛰어요!
            </SheetTitle>
            <SheetDescription className='text-secondary-200 text-center'>
              반가워요! 본투런 회원이 되어 간편한 러닝 모임 관리와 러너들과의
              소통을 경험해보세요!
            </SheetDescription>
          </div>
        </div>

        <SheetFooter>
          <button
            type='button'
            onClick={handleLoginRedirect}
            className='text-black bg-[#FEE500] rounded-[12px] w-full flex justify-center items-center h-[56px] gap-[8px] mt-[16px]'
          >
            <KakaoIcon />
            카카오로 간편하게 시작하기
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
