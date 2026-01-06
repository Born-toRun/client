"use client";

import { Crown, User } from "lucide-react";
import Image from "next/image";

interface UserProfileProps {
  profileImageUri?: string;
  userName: string;
  crewName?: string;
  isAdmin?: boolean;
  isManager?: boolean;
  size?: "sm" | "md" | "lg";
  showBadges?: boolean;
}

/**
 * 사용자 프로필 컴포넌트
 * 프로필 이미지, 사용자 이름, 크루명과 함께 관리자 왕관, 운영진 배지를 표시합니다.
 *
 * @param profileImageUri - 프로필 이미지 URL
 * @param userName - 사용자 이름
 * @param crewName - 크루명 (선택)
 * @param isAdmin - 관리자 여부 (왕관 아이콘 표시)
 * @param isManager - 운영진 여부 (운영진 배지 표시)
 * @param size - 프로필 이미지 크기 (sm: 40px, md: 48px, lg: 56px)
 * @param showBadges - 배지 표시 여부 (기본값: true)
 */
export default function UserProfile({
  profileImageUri,
  userName,
  crewName,
  isAdmin = false,
  isManager = false,
  size = "md",
  showBadges = true,
}: UserProfileProps) {
  // 크기별 스타일
  const sizeClasses = {
    sm: "size-10",
    md: "size-12",
    lg: "size-14",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  const userIconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  return (
    <div className="flex items-center gap-3">
      {/* 프로필 이미지 */}
      <div className="relative flex-shrink-0">
        {profileImageUri ? (
          <Image
            src={profileImageUri}
            alt={`${userName} 프로필 이미지`}
            width={size === "sm" ? 40 : size === "md" ? 48 : 56}
            height={size === "sm" ? 40 : size === "md" ? 48 : 56}
            className={`${sizeClasses[size]} rounded-full object-cover`}
          />
        ) : (
          <div
            className={`${sizeClasses[size]} rounded-full bg-n-30 flex items-center justify-center`}
          >
            <User size={userIconSizes[size]} className="text-n-60" />
          </div>
        )}

        {/* 관리자 왕관 아이콘 */}
        {showBadges && isAdmin && (
          <div
            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
            title="관리자"
          >
            <Crown
              size={iconSizes[size]}
              className="text-yellow-500 fill-yellow-500"
            />
          </div>
        )}
      </div>

      {/* 사용자 정보 */}
      <div className="flex-1 min-w-0">
        {/* 이름과 운영진 배지 */}
        <div className="flex items-center gap-2 mb-1">
          <h3 className="body-sm text-n-900 truncate font-semibold">
            {userName}
          </h3>
          {showBadges && isManager && (
            <span className="inline-block px-2 py-0.5 bg-rg-50 text-rg-400 round-full label-xs flex-shrink-0">
              운영진
            </span>
          )}
        </div>

        {/* 크루명 */}
        {crewName && (
          <p className="body-sm text-n-500 truncate">{crewName}</p>
        )}
      </div>
    </div>
  );
}
