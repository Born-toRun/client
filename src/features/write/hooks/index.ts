import { useMutation } from "@tanstack/react-query";
import { deleteFile, uploadFile } from "../api";
import { DeleteFileParams, UploadFileParams } from "../types";

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
