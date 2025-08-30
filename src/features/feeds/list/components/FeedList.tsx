"use client";

import Divider from "@/components/Divider";
import FeedItem from "./FeedItem";

import { FeedListResponse } from "../types";
import Link from "next/link";

interface Props {
  list?: FeedListResponse["content"];
}

export default function FeedList({ list }: Props) {
  return (
    <ul>
      {list?.map((feed) => (
        <Link href={`/feeds/${feed.id}`} key={feed.id}>
          <li key={feed.id}>
            <FeedItem feed={feed} />
            <Divider size={1} />
          </li>
        </Link>
      ))}
    </ul>
  );
}
