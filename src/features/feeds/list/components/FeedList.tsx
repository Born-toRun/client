"use client";

import { FeedListResponse } from "../types";

interface Props {
  list?: FeedListResponse[];
}

export default function FeedList({ list }: Props) {
  console.log(list);
  return <div className=""></div>;
}
