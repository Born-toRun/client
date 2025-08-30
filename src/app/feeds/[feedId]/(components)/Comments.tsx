import { getCommentList } from "@/apis/comment";
import { useQuery } from "@tanstack/react-query";

export default function Comments({ feedId }: { feedId: number }) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", feedId],
    queryFn: () => getCommentList(feedId),
    enabled: !!feedId,
  });

  const hasComments = comments && comments.details.length > 0;

  if (isLoading) return <div></div>;

  return (
    <>
      {hasComments ? (
        comments.details.map((comment) => (
          <div key={comment.id}>{comment.contents}</div>
        ))
      ) : (
        <div className="px-4 py-4 text-n-60 body-sm ">
          {"여러분의 생각을 남겨주세요 :)"}
        </div>
      )}
    </>
  );
}
