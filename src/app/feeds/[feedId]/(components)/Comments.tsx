import { getCommentList } from "@/apis/comment";
import { formatRelativeTime } from "@/features/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CommentIcon from "@/icons/comment-icon.svg";
import ActiveCommentIcon from "@/icons/active-comment-icon.svg";
import CommentMenuIcon from "@/icons/comment-menu-icon.svg";

export default function Comments({ feedId }: { feedId: number }) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", feedId],
    queryFn: () => getCommentList(feedId),
    enabled: !!feedId,
  });

  const hasComments = comments && comments.details.length > 0;

  if (isLoading) return <div></div>;

  return (
    <div className="bg-white pb-16">
      {hasComments ? (
        comments.details.map((comment) => (
          <div className="flex flex-col gap-2" key={comment.id}>
            <div className="flex items-center gap-[8px] px-4 pt-2">
              <div className="relative  overflow-hidden size-[40px] shrink-0 round-full border  border-[rgba(0,0,0,0.1)]">
                {comment.writer.profileImageUri ? (
                  <Image
                    src={comment.writer.profileImageUri}
                    fill
                    alt="profile-image"
                    className="round-full"
                  />
                ) : (
                  <div className="absolute w-full h-full" />
                )}
              </div>
              <div className="flex flex-col gap-[4px] py-[2px] w-full">
                <p className="body-sm text-black">{comment.writer.userName}</p>
                <div className="flex items-center body-sm text-n-60 gap-[4px]">
                  <p>{comment.writer.crewName}</p>
                  <span>·</span>
                  <p>{formatRelativeTime(comment.registeredAt)}</p>
                </div>
              </div>
              <button type="button">
                <CommentMenuIcon />
              </button>
            </div>
            <div className="px-5 flex gap-2 relative">
              <div className="w-8 flex justify-center relative">
                <div className="w-1 absolute top-0 bottom-0 bg-n-30 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="body-md text-black">{comment.contents}</p>
                <div className="flex items-center gap-1 h-8">
                  {comment.reCommentQty === 0 ? (
                    <>
                      <CommentIcon />
                      <span className="text-n-200 body-sm">댓글</span>
                    </>
                  ) : (
                    <>
                      <ActiveCommentIcon />
                      <span className="text-rg-400 body-sm">
                        {comment.reCommentQty}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-4 py-4 text-n-60 body-sm ">
          {"여러분의 생각을 남겨주세요 :)"}
        </div>
      )}
    </div>
  );
}
