"use client";
import { createComment } from "@/apis/comment";
import { CreateCommentRequest } from "@/apis/comment/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface CommentBoxProps {
  feedId: number;
  parentCommentId?: number;
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function CommentBox({
  onSubmit,
  feedId,
  parentCommentId,
}: CommentBoxProps) {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync: submitComment } = useMutation({
    mutationFn: async ({
      feedId,
      data,
    }: {
      feedId: number;
      data: CreateCommentRequest;
    }) => createComment(feedId, data),
  });

  const submitCommentHandler = async () => {
    if (comment !== "") {
      await submitComment({
        feedId,
        data: { contents: comment, parentCommentId },
      });
      setComment("");
      // 댓글 목록을 다시 받아오기 위해 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", feedId] });
      onSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border border-n-30 px-4 py-2 z-50 w-full max-w-[786px] mx-auto">
      <div className="flex items-center gap-2">
        <div className="flex-1 ">
          <input
            className="w-full border border-n-40 rounded-[8px] px-4 py-[11.5px] body-md focus:border-rg-400 focus:outline-none"
            placeholder="댓글을 입력해주세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-[11.5px] bg-rg-400 rounded-[8px] disabled:bg-n-40 cursor-pointer"
          onClick={submitCommentHandler}
          disabled={comment === ""}
        >
          <p className="text-white title-md leading-[17px]">게시</p>
        </button>
      </div>
    </div>
  );
}
