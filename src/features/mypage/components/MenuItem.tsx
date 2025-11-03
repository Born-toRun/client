"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { MenuItem as MenuItemType } from "../constants";

interface MenuItemProps {
  item: MenuItemType;
}

/**
 * 마이페이지 메뉴 아이템 컴포넌트
 * - 링크가 있는 경우 Next.js Link로 렌더링
 * - onClick 핸들러가 있는 경우 button으로 렌더링
 * - isDangerous가 true인 경우 위험한 작업으로 스타일링
 */
export default function MenuItem({ item }: MenuItemProps) {
  const Icon = item.icon;

  // 공통 콘텐츠
  const content = (
    <>
      <div className="flex items-center gap-3 flex-1">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            item.isDangerous ? "bg-e-10" : "bg-n-10"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${item.isDangerous ? "text-e-800" : "text-n-700"}`}
          />
        </div>
        <span
          className={`body-md ${
            item.isDangerous ? "text-e-800" : "text-n-900"
          }`}
        >
          {item.label}
        </span>
      </div>
      <ChevronRight
        className={`w-5 h-5 ${item.isDangerous ? "text-e-600" : "text-n-400"}`}
      />
    </>
  );

  // href가 있는 경우 Link로 렌더링
  if (item.href) {
    return (
      <Link
        href={item.href}
        className="flex items-center justify-between py-4 px-5 hover:bg-n-5 active:bg-n-10 transition-colors"
      >
        {content}
      </Link>
    );
  }

  // onClick이 있는 경우 button으로 렌더링
  if (item.onClick) {
    return (
      <button
        onClick={item.onClick}
        className="w-full flex items-center justify-between py-4 px-5 hover:bg-n-5 active:bg-n-10 transition-colors"
      >
        {content}
      </button>
    );
  }

  // 둘 다 없는 경우 비활성화된 아이템
  return (
    <div className="flex items-center justify-between py-4 px-5 opacity-50 cursor-not-allowed">
      {content}
    </div>
  );
}
