"use client";

import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { PROFILE_PHOTO_ACCEPT, PROFILE_PHOTO_MAX_BYTES } from "../lib/profile-utils";

type UseAvatarPreviewResult = {
  previewUrl: string | null;
  selectedFile: File | null;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  openFilePicker: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  clearPreview: () => void;
  /**
   * Future upload integration point.
   * Call this with the selected file once the backend upload endpoint exists.
   */
  getUploadPayload: () => File | null;
};

/**
 * Client-side avatar selection + preview only.
 * Does not upload — keep upload logic separate when the API is ready.
 */
export const useAvatarPreview = (): UseAvatarPreviewResult => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const clearPreview = useCallback(() => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const accepted = PROFILE_PHOTO_ACCEPT.split(",").map((type) => type.trim());
    if (!accepted.includes(file.type)) {
      setError("Please choose a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > PROFILE_PHOTO_MAX_BYTES) {
      setError("Image must be 5MB or smaller.");
      return;
    }

    setError(null);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(typeof reader.result === "string" ? reader.result : null);
    };
    reader.onerror = () => {
      setError("Could not read that image. Please try another file.");
      setSelectedFile(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const getUploadPayload = useCallback(() => selectedFile, [selectedFile]);

  return {
    previewUrl,
    selectedFile,
    error,
    fileInputRef,
    openFilePicker,
    handleFileChange,
    clearPreview,
    getUploadPayload,
  };
};
