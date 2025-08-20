// 파일 업로드 응답 타입
export interface FileUploadResponse {
  fileId: number;
  fileUri: string;
}

// 버킷 타입
export type BucketType = "PROFILE" | "FEED" | "CREW" | "ACTIVITY";

// 파일 업로드 파라미터 타입
export interface UploadFileParams {
  bucket: BucketType;
  file: File;
}

// 파일 삭제 파라미터 타입
export interface DeleteFileParams {
  bucket: BucketType;
  fileId: number;
}
