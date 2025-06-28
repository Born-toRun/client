"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./Sheet";
import DialogImageIcon from "@/icons/dialog-img.svg";
import ChevronBackIcon from "@/icons/chevron-back-icon.svg";
import CloseIcon from "@/icons/close-icon.svg";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  contents?: {
    title: string;
    description: string;
  };
  footer?: React.ReactNode;
  variants?: "default" | "hasImage";
}

export default function CustomBottomSheet({
  onOpenChange,
  open,
  contents,
  footer,
  variants,
}: Props) {
  const hasImage = variants === "hasImage";
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        {hasImage && (
          <div className="relative size-[175px] mb-[16px]">
            <DialogImageIcon />
          </div>
        )}

        <SheetHeader className="mb-[16px]">
          <div className="border-2 border-red-500">
            <div>
              <ChevronBackIcon />
            </div>
            <SheetTitle className="title-lg text-black">
              {contents?.title}
            </SheetTitle>
            <div>
              <CloseIcon />
            </div>
          </div>

          <SheetDescription className="body-lg text-n-200 mt-[16px] text-left">
            {contents?.description}
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>{footer}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
