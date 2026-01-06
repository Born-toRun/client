"use client";

import { MapPin } from "lucide-react";

/**
 * Map 컴포넌트 Props
 */
interface MapProps {
  /**
   * 검색할 주소 또는 장소명
   */
  venue: string;
  /**
   * 지도 높이 (기본값: 400px)
   */
  height?: string;
  /**
   * 마커 팝업에 표시할 제목
   */
  title?: string;
}

/**
 * 간단한 지도 컴포넌트
 *
 * 구현 방식:
 * - Kakao 지도 웹 링크로 바로 연결
 * - 클릭 시 Kakao Map 앱/웹에서 상세 정보 확인 가능
 * - 한국 주소에 최적화
 * - 빠른 로딩 및 안정적인 작동
 *
 * 기술적 배경:
 * - Nominatim API는 User-Agent 헤더를 필수로 요구하지만,
 *   브라우저의 fetch()는 보안상 User-Agent를 설정할 수 없어 400 에러 발생
 * - Leaflet + CDN 방식은 CORS 문제와 복잡한 라이브러리 로딩 이슈
 * - 따라서 Kakao 지도 링크를 사용한 간단하고 안정적인 방식 채택
 */
export default function Map({ venue, height = "400px", title }: MapProps) {
  // Kakao 지도 검색 URL 생성
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(venue)}`;

  return (
    <a
      href={kakaoMapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full round-sm overflow-hidden elevation-10 bg-gradient-to-br from-rg-100 to-rg-200 hover:from-rg-200 hover:to-rg-300 transition-all duration-200 group cursor-pointer"
      style={{ height }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center gap-4">
        {/* 지도 아이콘 */}
        <div className="size-16 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <MapPin size={32} className="text-rg-500" />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col gap-2">
          {title && (
            <h3 className="title-md text-n-900 group-hover:text-rg-600 transition-colors">
              {title}
            </h3>
          )}
          <p className="body-sm text-n-700 break-keep px-4">
            {venue}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-xs font-bold text-yellow-900">K</span>
            </div>
            <span className="label-sm text-n-600 group-hover:text-rg-600 transition-colors">
              카카오맵에서 열기
            </span>
          </div>
        </div>

        {/* 호버 효과 화살표 */}
        <div className="mt-2 text-n-500 group-hover:text-rg-500 group-hover:translate-x-1 transition-all duration-200">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </a>
  );
}
