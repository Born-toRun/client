import {
  User,
  Bell,
  Calendar,
  FileText,
  Trophy,
  Users,
  MessageCircle,
  UserX,
  type LucideIcon,
} from "lucide-react";
import { pageRoutes } from "@/constants/route";

/**
 * 마이페이지 메뉴 아이템 타입
 */
export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  isDangerous?: boolean; // 회원탈퇴 등 위험한 작업 표시
}

/**
 * 마이페이지 메뉴 섹션 타입
 */
export interface MenuSection {
  title: string;
  items: MenuItem[];
}

/**
 * 마이페이지 메뉴 섹션 데이터
 * 나의 정보, 나의 활동, 고객센터 섹션으로 구성
 */
export const MY_PAGE_SECTIONS: MenuSection[] = [
  {
    title: "나의 정보",
    items: [
      {
        id: "profile",
        label: "내 정보",
        icon: User,
        href: pageRoutes.myPage.profile,
      },
      {
        id: "notifications",
        label: "알림",
        icon: Bell,
        href: pageRoutes.myPage.notifications,
      },
    ],
  },
  {
    title: "나의 활동",
    items: [
      {
        id: "participation-history",
        label: "참여 기록",
        icon: Calendar,
        href: pageRoutes.myPage.participationHistory,
      },
      {
        id: "my-feeds",
        label: "글 목록",
        icon: FileText,
        href: pageRoutes.myPage.feeds,
      },
      {
        id: "ranking",
        label: "랭킹",
        icon: Trophy,
        href: pageRoutes.myPage.ranking,
      },
      {
        id: "my-crew",
        label: "크루",
        icon: Users,
        href: pageRoutes.myPage.crew,
      },
    ],
  },
  {
    title: "고객센터",
    items: [
      {
        id: "contact",
        label: "개발자 문의",
        icon: MessageCircle,
        href: pageRoutes.myPage.contact,
      },
      {
        id: "withdraw",
        label: "회원탈퇴",
        icon: UserX,
        isDangerous: true,
        // onClick은 컴포넌트에서 동적으로 할당
      },
    ],
  },
];
