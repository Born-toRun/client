"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import PlusIcon from "@/icons/plus-icon.svg";
import { pageRoutes } from "@/constants/route";

interface Props {
  isScrolled: boolean;
}

export default function CreateFeedButton({ isScrolled }: Props) {
  return (
    <Link href={pageRoutes.feeds.write}>
      <div className="bg-rg-400 h-[48px] round-full flex items-center gap-[4px] px-[14px]">
        <PlusIcon />
        <AnimatePresence initial={false}>
          {!isScrolled && (
            <motion.span
              key="add-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="label-md text-white overflow-hidden inline-block whitespace-nowrap"
            >
              글쓰기
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
