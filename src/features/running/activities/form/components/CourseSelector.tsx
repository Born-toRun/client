"use client";

import { ACTIVITY_COURSE_OPTIONS } from "../../list/constants";

interface CourseSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * 코스 선택 컴포넌트
 */
export default function CourseSelector({
  value,
  onChange,
  error,
}: CourseSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label-md text-black">
        코스 <span className="text-system-r-400">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {ACTIVITY_COURSE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-[8px] label-md transition-colors ${
              value === option.value
                ? "bg-rg-400 text-white"
                : "bg-n-30 text-n-200 hover:bg-n-40"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <p className="text-system-r-400 text-sm">{error}</p>}
    </div>
  );
}
