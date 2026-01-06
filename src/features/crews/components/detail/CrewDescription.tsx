"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  contents: string;
}

/**
 * 크루 설명 컴포넌트
 * 3줄 이상인 경우 "더 보기" 버튼을 표시하고 확장/축소 기능을 제공합니다.
 */
export default function CrewDescription({ contents }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // 텍스트가 3줄을 넘는지 확인
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight
      );
      const contentHeight = textRef.current.scrollHeight;
      const visibleHeight = lineHeight * 3; // 3줄의 높이

      setNeedsExpansion(contentHeight > visibleHeight);
    }
  }, [contents]);

  return (
    <section className="px-4 py-6 border-b border-n-30">
      <h2 className="title-md text-n-900 mb-3">소개</h2>

      <div className="relative">
        <p
          ref={textRef}
          className={`body-md text-n-700 whitespace-pre-wrap transition-all duration-300 ${
            !isExpanded && needsExpansion ? "line-clamp-3" : ""
          }`}
        >
          {contents}
        </p>

        {/* 더 보기/접기 버튼 */}
        {needsExpansion && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mt-2 text-rg-400 hover:text-rg-500 transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "설명 접기" : "설명 더 보기"}
          >
            <span className="label-md">
              {isExpanded ? "접기" : "더 보기"}
            </span>
            {isExpanded ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </section>
  );
}
