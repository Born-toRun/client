"use client";

import Divider from "@/components/Divider";
import FeedItem from "./FeedItem";

import { FeedListResponse } from "../types";

interface Props {
  list?: FeedListResponse["content"];
}

export default function FeedList({ list }: Props) {
  return (
    <ul>
      {list?.map((feed) => (
        <li key={feed.id}>
          <FeedItem feed={feed} />
          <Divider size={1} />
        </li>
      ))}
    </ul>
  );
}
