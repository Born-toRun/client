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
    <div className="mx-4 p-4 bg-system-y-50 border border-system-y-200 round-sm">
      <div className="flex items-start gap-2">
        <AlertCircle size={20} className="text-system-y-600 mt-0.5 flex-shrink-0" />
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
