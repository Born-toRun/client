import { runApi } from "@/client/runClient";
import { BucketType, CreateFeedRequest, FileUploadResponse } from "../types";

// 파일 업로드 함수
export const uploadFile = async (
  bucket: BucketType,
  file: File
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await runApi.post<FileUploadResponse>(
    `/api/v1/object-storage/${bucket}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteFile = async (bucket: BucketType, fileId: number) => {
  const response = await runApi.delete(
    `/api/v1/object-storage/${bucket}/${fileId}`
  );
  return response.data;
};

// 피드 등록 함수
export const createFeed = async (data: CreateFeedRequest): Promise<void> => {
  await runApi.post("/api/v1/feeds", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
