"use client";

import { AlertCircle } from "lucide-react";

interface Props {
  precautions?: string;
}

/**
 * 유의사항 박스 컴포넌트
 */
export default function PrecautionsBox({ precautions }: Props) {
  if (!precautions) return null;

  return (
    <div className="mx-5 p-4 bg-system-y-50 border border-system-y-200 border-l-4 border-l-system-y-400 round-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 size-8 round-full bg-system-y-400 flex items-center justify-center">
          <AlertCircle size={18} className="text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="label-sm text-system-y-900">유의사항</span>
          <p className="body-sm text-system-y-800 whitespace-pre-wrap">
            {precautions}
          </p>
        </div>
      </div>
    </div>
  );
}
