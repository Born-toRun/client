"use client";

import { Crew } from "../types";
import CrewCard from "./CrewCard";

interface Props {
  crews: Crew[];
}

/**
 * 크루 리스트 컴포넌트
 * 크루 카드들을 그리드 형태로 표시합니다.
 */
export default function CrewList({ crews }: Props) {
  if (crews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <p className="body-md text-n-500">표시할 크루가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 px-4">
      {crews.map((crew) => (
        <CrewCard key={crew.id} crew={crew} />
      ))}
    </div>
  );
}
