import { useMutation } from "@tanstack/react-query";
import { createFeed, deleteFile, uploadFile } from "../api";
import {
  CreateFeedRequest,
  DeleteFileParams,
  UploadFileParams,
} from "../types";

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: ({ bucket, file }: UploadFileParams) =>
      uploadFile(bucket, file),
  });
};

export const useDeleteFileMutation = () => {
  return useMutation({
    mutationFn: ({ bucket, fileId }: DeleteFileParams) =>
      deleteFile(bucket, fileId),
  });
};

export const useCreateFeedMutation = () => {
  return useMutation({
    mutationFn: (data: CreateFeedRequest) => createFeed(data),
  });
};
