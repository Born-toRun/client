"use client";
import Header from "@/components/header/Header";
import BackIcon from "@/icons/back-icon.svg";
import LikeIcon from "../(icons)/like-icon.svg";
// import ActiveLikeIcon from "(/icons)/active-like-icon.svg";
import { useRouter } from "next/navigation";
import MoreIcon from "../(icons)/more-icon.svg";
import ShareIcon from "../(icons)/share-icon.svg";

export default function FeedDetailHeader() {
  const router = useRouter();
  return (
    <Header
      left={
        <button
          className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
          onClick={() => router.back()}
        >
          <BackIcon />
        </button>
      }
      title=""
      right={
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <ShareIcon />
          </button>
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <LikeIcon />
          </button>
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <MoreIcon />
          </button>
        </div>
      }
    />
  );
}
