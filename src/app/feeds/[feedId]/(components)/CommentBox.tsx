"use client";
import { createComment } from "@/apis/comment";
import { CreateCommentRequest } from "@/apis/comment/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface CommentBoxProps {
  feedId: number;
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function CommentBox({ onSubmit, feedId }: CommentBoxProps) {
  const [comment, setComment] = useState("");

  const { mutate: submitComment } = useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: number;
      data: CreateCommentRequest;
    }) => createComment(commentId, data),
  });

  const submitCommentHandler = () => {
    if (comment !== "") {
      submitComment({ commentId: feedId, data: { contents: comment } });
      onSubmit();
      setComment("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-n-30 px-4 py-2 z-50">
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
        >
          <p className="text-white title-md leading-[17px]">게시</p>
        </button>
      </div>
    </div>
  );
}
