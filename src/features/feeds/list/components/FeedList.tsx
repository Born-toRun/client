"use client";
import Divider from "@/components/Divider";
import { pageRoutes } from "@/constants/route";
import Link from "next/link";
import { FeedListResponse } from "../types";
import FeedItem from "./FeedItem";

interface Props {
  list?: FeedListResponse["content"];
}

export default function FeedList({ list }: Props) {
  return (
    <ul>
      {list?.map((feed) => (
        <Link href={pageRoutes.feeds.detail(feed.id)} key={feed.id}>
          <li key={feed.id}>
            <FeedItem feed={feed} />
            <Divider size={1} />
          </li>
        </Link>
      ))}
    </ul>
  );
}
