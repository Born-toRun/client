"use client";

import { getCommentDetail, updateComment } from "@/apis/comment";
import Header from "@/components/header/Header";
import CloseIcon from "@/icons/close-icon.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommentEditPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const feedId = Number(params.feedId);
  const commentId = Number(params.commentId);

  const [contents, setContents] = useState("");

  const { data: comment } = useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => getCommentDetail(commentId),
    enabled: !!commentId,
  });

  const updateCommentMutation = useMutation({
    mutationFn: (data: { contents: string }) => updateComment(commentId, data),
    onSuccess: () => {
      // 댓글 목록과 상세 정보 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", feedId] });
      queryClient.invalidateQueries({ queryKey: ["comment", commentId] });
      router.back();
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    },
  });

  // 댓글 데이터가 로드되면 contents 설정
  useEffect(() => {
    if (comment) {
      setContents(comment.contents);
    }
  }, [comment]);

  const handleSave = async () => {
    if (!contents.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await updateCommentMutation.mutateAsync({ contents: contents.trim() });
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      // 에러는 mutation의 onError에서 처리됨
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Header
        left={
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={handleCancel}
          >
            <CloseIcon />
          </button>
        }
        title="댓글 수정"
        right={
          <button
            className={`px-4 py-[11.5px] rounded-[8px] cursor-pointer ${
              contents.trim() && !updateCommentMutation.isPending
                ? "bg-rg-400"
                : "bg-n-40"
            }`}
            disabled={!contents.trim() || updateCommentMutation.isPending}
            onClick={handleSave}
          >
            <p className="text-white title-md leading-[17px]">저장</p>
          </button>
        }
      />
      <main className="flex flex-col h-screen pt-14">
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          className="w-full flex-1 px-4 py-3 resize-none"
          autoFocus
        />
      </main>
    </>
  );
}
