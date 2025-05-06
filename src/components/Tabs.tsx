"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface Props<T extends string> {
  options: { key: T; label: string }[];
  selectedTabs: T;
  onSelectedTab: (key: T) => void;
}

export default function Tabs<T extends string>({
  options,
  selectedTabs,
  onSelectedTab,
}: Props<T>) {
  return (
    <ul className="flex items-center px-[8px] h-[48px] w-full">
      {options.map((item) => {
        const isSelected = item.key === selectedTabs;
        return (
          <li
            key={item.key}
            onClick={() => onSelectedTab(item.key)}
            className="px-[8px] h-full flex justify-center items-center relative"
          >
            <span
              className={clsx(
                isSelected ? "text-black" : "text-secondary-60",
                "title-xl"
              )}
            >
              {item.label}
            </span>
            {isSelected && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 round-full h-[4px] bg-primary-400 w-[16px] m-auto"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
