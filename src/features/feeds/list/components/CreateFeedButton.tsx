"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import PlusIcon from "@/icons/plus-icon.svg";

interface Props {
  isScrolled: boolean;
}

export default function CreateFeedButton({ isScrolled }: Props) {
  return (
    <Link href={"#"} className="flex fixed right-[16px] bottom-[24px]">
      <div className="bg-primary-400 h-[48px] round-full flex items-center gap-[4px] px-[16px]">
        <AnimatePresence initial={false}>
          {!isScrolled && (
            <motion.div
              key="plus-icon"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex items-center"
            >
              <PlusIcon />
            </motion.div>
          )}
          <span className="label-md text-white">글쓰기</span>
        </AnimatePresence>
      </div>
    </Link>
  );
}
