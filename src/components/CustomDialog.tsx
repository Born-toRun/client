'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';
import DialogImageIcon from '@/icons/dialog-img.svg';
import clsx from 'clsx';

interface Props {
  open: boolean;
  onOpenChange: () => void;
  contents?: {
    title: string;
    description: string;
  };
  footer?: React.ReactNode;
  variants?: 'default' | 'hasImage';
}

export default function CustomDialog({
  open,
  onOpenChange,
  contents,
  footer,
  variants = 'default',
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-white p-[24px] pb-[8px] round-sm w-[312px]'>
        {variants === 'hasImage' && (
          <div className='relative size-[175px] mb-[16px]'>
            <DialogImageIcon />
          </div>
        )}

        <DialogHeader className='mb-[16px]'>
          <DialogTitle
            className={clsx(
              variants === 'hasImage' ? 'text-center' : 'text-left',
              'whitespace-pre-line title-lg'
            )}
          >
            {contents?.title}
          </DialogTitle>
          <DialogDescription className='text-left text-secondary-200 body-lg'>
            {contents?.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
