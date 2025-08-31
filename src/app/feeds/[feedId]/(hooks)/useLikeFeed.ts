import {
  createRecommendation,
  deleteRecommendation,
} from "@/apis/recommendation";
import { RecommendationType } from "@/apis/recommendation/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseLikeFeedProps {
  feedId: number;
  currentLikeStatus: boolean;
}

export const useLikeFeed = ({
  feedId,
  currentLikeStatus,
}: UseLikeFeedProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteRecommendationRequest, isPending: isDeleting } =
    useMutation({
      mutationFn: ({
        recommendationType,
        contentId,
      }: {
        recommendationType: RecommendationType;
        contentId: number;
      }) => deleteRecommendation(recommendationType, contentId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["feed", feedId] });
      },
    });

  const { mutate: createRecommendationRequest, isPending: isCreating } =
    useMutation({
      mutationFn: ({
        recommendationType,
        contentId,
      }: {
        recommendationType: RecommendationType;
        contentId: number;
      }) => createRecommendation(recommendationType, contentId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["feed", feedId] });
      },
    });

  const toggleLike = () => {
    if (currentLikeStatus) {
      deleteRecommendationRequest({
        recommendationType: "FEED",
        contentId: feedId,
      });
    } else {
      createRecommendationRequest({
        recommendationType: "FEED",
        contentId: feedId,
      });
    }
  };

  return {
    toggleLike,
    isLiked: currentLikeStatus,
    isPending: isDeleting || isCreating,
  };
};
