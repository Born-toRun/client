"use client";

import RunningHeader from "@/components/header/RunningHeader";
import Navigation from "@/components/Navigation";
import RunningContainer from "@/features/running/list";
import { useScrollPosition } from "@/features/hooks/useScroll";
import { SearchProvider } from "@/features/running/contexts/SearchContext";

/**
 * 러닝 페이지
 * 마라톤 목록과 필터링 기능 제공
 */
export default function RunningPage() {
  const isScrolled = useScrollPosition(20);

  return (
    <SearchProvider>
      <main>
        <RunningHeader isScrolled={isScrolled} />
        <RunningContainer />
        <Navigation />
      </main>
    </SearchProvider>
  );
}
