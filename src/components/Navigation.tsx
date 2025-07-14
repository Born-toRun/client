import Link from "next/link";
import HouseIcon from "@/icons/navigation/house-icon.svg";
import BoltIcon from "@/icons/navigation/bolt-icon.svg";
import FlagIcon from "@/icons/navigation/flag-icon.svg";
import PersonIcon from "@/icons/navigation/person-icon.svg";
import { pageRoutes } from "@/constants/route";

export default function Navigation() {
  return (
    <div className="fixed bottom-[0px] w-full max-w-[786px] mx-auto flex h-[58px] border-t border-n-30">
      <Link
        href={pageRoutes.feeds.list}
        className="flex-1 flex flex-col justify-center items-center cursor-pointer"
      >
        <HouseIcon />
        <span>홈</span>
      </Link>
      <Link
        href={pageRoutes.running.list}
        className="flex-1 flex flex-col justify-center items-center cursor-pointer"
      >
        <BoltIcon />
        <span>러닝</span>
      </Link>
      <Link
        href={pageRoutes.crews.list}
        className="flex-1 flex flex-col justify-center items-center cursor-pointer"
      >
        <FlagIcon />
        <span>크루</span>
      </Link>
      <Link
        href={pageRoutes.myPage}
        className="flex-1 flex flex-col justify-center items-center cursor-pointer"
      >
        <PersonIcon />
        <span>마이</span>
      </Link>
    </div>
  );
}
