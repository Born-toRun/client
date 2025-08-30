"use client";
import Link from "next/link";
import HouseIcon from "@/icons/navigation/house-icon.svg";
import HouseFillIcon from "@/icons/navigation/house-fill-icon.svg";
import BoltIcon from "@/icons/navigation/bolt-icon.svg";
import BoltFillIcon from "@/icons/navigation/bolt-fill-icon.svg";
import FlagIcon from "@/icons/navigation/flag-icon.svg";
import FlagFillIcon from "@/icons/navigation/flag-fill-icon.svg";
import PersonIcon from "@/icons/navigation/person-icon.svg";
import PersonFillIcon from "@/icons/navigation/person-fill-icon.svg";
import { pageRoutes } from "@/constants/route";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed z-2 bottom-[0px] w-full max-w-[786px] mx-auto flex h-[58px] border-t border-n-30 bg-white">
      <Link
        href={pageRoutes.feeds.list}
        className="flex-1 flex flex-col gap-1 justify-center items-center cursor-pointer"
      >
        {isActive(pageRoutes.feeds.list) ? <HouseFillIcon /> : <HouseIcon />}
        <span className="body-xs text-n-900">홈</span>
      </Link>
      <Link
        href={pageRoutes.running.list}
        className="flex-1 flex flex-col gap-1 justify-center items-center cursor-pointer"
      >
        {isActive(pageRoutes.running.list) ? <BoltFillIcon /> : <BoltIcon />}
        <span className="body-xs text-n-900">러닝</span>
      </Link>
      <Link
        href={pageRoutes.crews.list}
        className="flex-1 flex flex-col gap-1 justify-center items-center cursor-pointer"
      >
        {isActive(pageRoutes.crews.list) ? <FlagFillIcon /> : <FlagIcon />}
        <span className="body-xs text-n-900">크루</span>
      </Link>
      <Link
        href={pageRoutes.myPage}
        className="flex-1 flex flex-col gap-1 justify-center items-center cursor-pointer"
      >
        {isActive(pageRoutes.myPage) ? <PersonFillIcon /> : <PersonIcon />}
        <span className="body-xs text-n-900">마이</span>
      </Link>
    </div>
  );
}
