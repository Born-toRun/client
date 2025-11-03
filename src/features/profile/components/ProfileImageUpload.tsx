"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import {
  useUploadFileMutation,
  useDeleteFileMutation,
} from "@/features/write/hooks";

interface ProfileImageUploadProps {
  value: string; // 이미지 URI
  onChange: (imageUri: string, fileId?: number) => void;
  error?: string;
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * 프로필 이미지 업로드 컴포넌트
 * 원형 프로필 이미지 업로드를 지원합니다.
 */
export default function ProfileImageUpload({
  value,
  onChange,
  error,
}: ProfileImageUploadProps) {
  const [uploadError, setUploadError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewUri, setPreviewUri] = useState<string>(value);
  const [currentFileId, setCurrentFileId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Query 훅 사용
  const uploadImageFile = useUploadFileMutation();
  const deleteImageFile = useDeleteFileMutation();

  // value 변경 시 미리보기 동기화
  useEffect(() => {
    setPreviewUri(value);
  }, [value]);

  /**
   * 파일 선택 핸들러
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // 파일 형식 검증
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("이미지 파일만 업로드 가능합니다. (JPG, PNG, WEBP)");
      return;
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    setUploadError("");
    setIsUploading(true);

    // 로컬 미리보기 표시
    const localPreviewUri = URL.createObjectURL(file);
    setPreviewUri(localPreviewUri);

    try {
      // 기존 이미지가 있으면 삭제
      if (currentFileId) {
        try {
          await deleteImageFile.mutateAsync({
            bucket: "PROFILE",
            fileId: currentFileId,
          });
        } catch (deleteError) {
          console.error("기존 이미지 삭제 실패:", deleteError);
        }
      }

      // 새 이미지 업로드
      const response = await uploadImageFile.mutateAsync({
        bucket: "PROFILE",
        file,
      });

      // 업로드 성공
      setPreviewUri(response.fileUri);
      setCurrentFileId(response.fileId);
      onChange(response.fileUri, response.fileId);
    } catch (uploadError) {
      console.error("이미지 업로드 실패:", uploadError);
      setUploadError("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      // 업로드 실패 시 미리보기 초기화
      setPreviewUri(value);
    } finally {
      setIsUploading(false);
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * 이미지 삭제 핸들러
   */
  const handleRemoveImage = async () => {
    if (!currentFileId) {
      // fileId가 없으면 단순히 미리보기만 제거
      setPreviewUri("");
      onChange("");
      return;
    }

    try {
      await deleteImageFile.mutateAsync({
        bucket: "PROFILE",
        fileId: currentFileId,
      });

      setPreviewUri("");
      setCurrentFileId(null);
      onChange("");
      setUploadError("");
    } catch (deleteError) {
      console.error("이미지 삭제 실패:", deleteError);
      setUploadError("이미지 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  /**
   * 파일 선택 버튼 클릭 핸들러
   */
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 프로필 이미지 */}
      <div className="relative w-[120px] h-[120px]">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-n-40 bg-n-10">
          {previewUri ? (
            <>
              {/* 업로드된 이미지 */}
              <Image
                src={previewUri}
                alt="프로필 이미지"
                fill
                className="object-cover rounded-full"
                sizes="120px"
              />
              {/* 업로드 중 오버레이 */}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <>
              {/* 기본 이미지 영역 */}
              <button
                type="button"
                onClick={handleImageClick}
                disabled={isUploading}
                className="w-full h-full flex items-center justify-center hover:bg-n-20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="프로필 이미지 추가"
              >
                <Camera size={32} className="text-n-200" />
              </button>
            </>
          )}
        </div>

        {/* 이미지 수정/삭제 버튼 */}
        {previewUri && !isUploading && (
          <div className="absolute bottom-0 right-0 flex gap-1">
            {/* 수정 버튼 */}
            <button
              type="button"
              onClick={handleImageClick}
              className="w-8 h-8 bg-white border border-n-40 rounded-full flex items-center justify-center text-n-700 hover:bg-n-10 transition-colors shadow-sm"
              aria-label="이미지 수정"
            >
              <Camera size={16} />
            </button>
            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="w-8 h-8 bg-white border border-n-40 rounded-full flex items-center justify-center text-system-r-400 hover:bg-system-r-50 transition-colors shadow-sm"
              aria-label="이미지 삭제"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
          aria-label="프로필 이미지 파일 선택"
        />
      </div>

      {/* 이미지 없을 때만 안내 메시지 */}
      {!previewUri && (
        <button
          type="button"
          onClick={handleImageClick}
          disabled={isUploading}
          className="text-rg-400 body-md hover:underline disabled:opacity-50"
        >
          프로필 이미지 추가
        </button>
      )}

      {/* 안내 메시지 */}
      <p className="text-n-200 text-sm text-center">
        JPG, PNG, WEBP 형식 / 10MB 이하
      </p>

      {/* 에러 메시지 */}
      {(uploadError || error) && (
        <p className="text-system-r-400 text-sm text-center">
          {uploadError || error}
        </p>
      )}
    </div>
  );
}
