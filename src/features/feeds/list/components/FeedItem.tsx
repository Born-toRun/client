"use client";
import FeedBody from "../../components/FeedBody";
import FeedHeader from "../../components/FeedHeader";
import FeedFooter from "./FeedFooter";

import { FeedContent } from "../types";

interface Props {
  feed?: FeedContent;
}

export default function FeedItem({ feed }: Props) {
  const userName = feed?.writer.userName;
  const crewName = feed?.writer.crewName;
  const registerAt = feed?.registeredAt;
  const profileUrl = feed?.writer.profileImageUri;
  const contents = feed?.contents;
  const imageUrls = feed?.imageUris;
  const recommendationQty = feed?.recommendationQty;
  const viewQty = feed?.viewQty;
  const commentQty = feed?.commentQty;
  const hasMyComment = feed?.viewer.hasMyComment;
  const hasMyRecommendation = feed?.viewer.hasMyRecommendation;

  return (
    <article className="p-[16px] flex flex-col gap-[16px]">
      <FeedHeader
        crewName={crewName}
        userName={userName}
        profileImageUri={profileUrl}
        registerAt={registerAt}
      />
      <FeedBody contents={contents} imageUrl={imageUrls} />
      <FeedFooter
        commentQty={commentQty}
        recommendationQty={recommendationQty}
        viewQty={viewQty}
        hasMyComment={hasMyComment}
        hasMyRecommendation={hasMyRecommendation}
      />
    </article>
  );
}
