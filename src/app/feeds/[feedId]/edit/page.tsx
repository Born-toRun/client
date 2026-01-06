"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getFeedDetail } from "@/features/feeds/list/api";
import { updateFeed } from "@/apis/feed";
import { pageRoutes } from "@/constants/route";
import FeedEditHeader from "./(components)/FeedEditHeader";
import FeedEditSkeleton from "./(components)/FeedEditSkeleton";
import FeedEditForm from "./(components)/FeedEditForm";
import { toast } from "sonner";

export default function FeedEditPage() {
  const params = useParams();
  const router = useRouter();
  const feedId = Number(params.feedId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contents, setContents] = useState("");

  const {
    data: feed,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feed", feedId],
    queryFn: () => getFeedDetail(feedId),
    enabled: !!feedId,
  });

  // 피드 데이터가 로드되면 contents 초기화
  useEffect(() => {
    if (feed) {
      setContents(feed.contents);
    }
  }, [feed]);

  const handleSubmit = async () => {
    if (!feed || !contents) return;

    setIsSubmitting(true);
    try {
      await updateFeed(feedId, {
        contents,
        category: feed.category,
        accessLevel: feed.accessLevel,
        imageIds: feed.images?.map((img) => img.imageId),
      });
      toast.success("피드가 수정되었습니다.");
      router.push(pageRoutes.feeds.detail(feedId));
    } catch (error) {
      console.error("피드 수정 중 오류가 발생했습니다:", error);
      toast.error("피드 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(pageRoutes.feeds.detail(feedId));
  };

  if (isLoading) {
    return <FeedEditSkeleton />;
  }

  if (error || !feed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500">피드를 불러올 수 없습니다.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <>
      <FeedEditHeader
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        canSubmit={!!contents}
      />
      <main className="flex flex-col h-screen pt-14 w-full">
        <FeedEditForm
          feed={feed}
          contents={contents}
          onContentsChange={setContents}
        />
      </main>
    </>
  );
}
