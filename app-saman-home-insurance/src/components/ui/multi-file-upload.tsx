"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Eye, FileUpIcon, Trash2Icon, Upload, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface UploadFile {
  id: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  file?: File;
  name: string;
  type?: string;
  size?: number;
  error?: string;
  thumbnail?: string;
}

export interface FileUploaderProps {
  multiple?: boolean;
  maxSize?: number;
  accept?: string;
  onChange?: (files: UploadFile[]) => void;
  value?: UploadFile[];
  className?: string;
  maxFiles?: number;
  uploadText?: string;
  uploadSubText?: string;
  id: string;
  isInvalid?: boolean;
  capture?: boolean | "user" | "environment" | undefined;
  prevGridColumns?: number;
  deferLocalPreview?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  multiple = false,
  maxSize = 10,
  accept = "image/*,video/*",
  onChange,
  value = [],
  className,
  maxFiles = 10,
  uploadText = "Click or drag files to upload",
  uploadSubText = "SVG, PNG, JPG یا GIF (حداکثر۵مگابایت)",
  id,
  isInvalid = false,
  capture,
  prevGridColumns = 3,
  deferLocalPreview = false,
}) => {
  const [files, setFiles] = useState<UploadFile[]>(value);
  const isControlled = typeof value !== "undefined";
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isMaxFilesReached = files.length >= maxFiles;

  
  function arraysEqual(a?: UploadFile[], b?: UploadFile[]) {
    if (a === b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    return a.every((item, idx) => item.id === b[idx].id);
  }

  useEffect(() => {
    if (isControlled && !arraysEqual(files, value)) {
      console.log("🔁 FileUploader - Received NEW value from parent:", value?.map(v => ({
        id: v.id,
        name: v.name,
        preview: v.preview,
        uploaded: v.uploaded
      })));
      setFiles(value || []);
    }
  }, [value, isControlled]);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize * 1024 * 1024) {
      toast.warning(`فایل انتخاب شده باید حداکثر ${maxSize}MB باشد`);
      return false;
    }

    const acceptedTypes = accept.split(",");
    const fileType = file.type || "";
    const isValidType = acceptedTypes.some((type) => {
      if (type.includes("*")) {
        const baseType = type.split("/")[0];
        return fileType.startsWith(baseType);
      }
      return type === fileType;
    });

    if (!isValidType) {
      const fileType = accept.includes("image")
        ? "تصویر"
        : accept.includes("video")
        ? "ویدیو"
        : "فایل";
      toast.warning(`فایل انتخاب شده باید ${fileType} باشد`);
      return false;
    }

    return true;
  };

  const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 1;
      });

      video.addEventListener("seeked", () => {
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8);
          resolve(thumbnailUrl);
        }
      });

      video.src = URL.createObjectURL(file);
      video.load();
    });
  };

  const createUploadFile = async (file: File): Promise<UploadFile> => {
    const isSizeValid = file.size <= maxSize * 1024 * 1024;
    let thumbnail = URL.createObjectURL(file);

    if (file.type.startsWith("video/")) {
      try {
        thumbnail = await generateVideoThumbnail(file);
      } catch (error) {
        console.warn("Failed to generate video thumbnail:", error);
      }
    }

    return {
      id: Math.random().toString(36).substring(7),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      file: file,
      name: file.name,
      type: file.type,
      size: file.size,
      error: !isSizeValid ? `فایل بزرگتر از ${maxSize}MB است` : undefined,
      thumbnail: file.type.startsWith("video/") ? thumbnail : undefined,
    };
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const removedFile = files[index];

    // Clean up object URLs
    if (removedFile.preview && removedFile.preview.startsWith("blob:")) {
      URL.revokeObjectURL(removedFile.preview);
    }
    if (removedFile.thumbnail && removedFile.thumbnail.startsWith("blob:")) {
      URL.revokeObjectURL(removedFile.thumbnail);
    }

    if (!isControlled) {
      setFiles(newFiles);
    }
    onChange?.(newFiles);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isMaxFilesReached) {
        toast.warning(`حداکثر ${maxFiles} فایل میتوانید آپلود کنید`);
        return;
      }

      const droppedFiles = Array.from(e.dataTransfer.files);
      const remainingSlots = maxFiles - files.length;
      const filesToProcess = droppedFiles.slice(0, remainingSlots);

      const validFiles = [];
      for (const file of filesToProcess) {
        if (validateFile(file)) {
          validFiles.push(file);
        }
      }

      if (validFiles.length) {
        const newUploadFiles = await Promise.all(
          validFiles.map(createUploadFile)
        );
        if (deferLocalPreview) {
          onChange?.(newUploadFiles);
        } else {
          const newFiles = [...files, ...newUploadFiles];
          if (!isControlled) {
            setFiles(newFiles);
          }
          onChange?.(newFiles);
        }
      }
    },
    [files, maxFiles, onChange, isMaxFilesReached, deferLocalPreview]
  );


  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMaxFilesReached) {
      toast.warning(`حداکثر ${maxFiles} فایل میتوانید آپلود کنید`);
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const remainingSlots = maxFiles - files.length;
    const filesToProcess = selectedFiles.slice(0, remainingSlots);

    const validFiles = [];
    for (const file of filesToProcess) {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length) {
      const newUploadFiles = await Promise.all(
        validFiles.map(createUploadFile)
      );
      
      console.log("🔄 handleFileInput - Created files with blob URLs:", newUploadFiles.map(f => ({
        name: f.name,
        preview: f.preview,
        hasFile: !!f.file
      })));
      
      if (deferLocalPreview) {
        console.log("⚠️ deferLocalPreview=true - NOT updating local state, only calling onChange");
        onChange?.(newUploadFiles);
      } else {
        const newFiles = [...files, ...newUploadFiles];
        if (!isControlled) {
          setFiles(newFiles);
        }
        onChange?.(newFiles);
      }
    }

    e.target.value = "";
  };

  const previewFile = (file: UploadFile) => {
    setPreviewUrl(file.preview);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors bg-gray-50 text-gray-400",
          isInvalid && "border-red-500 bg-red-50 text-red-700",
          isMaxFilesReached
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-gray-400"
        )}
        onClick={(e) => {
          if (!isMaxFilesReached) {
            document.getElementById(`file-input-${id}`)?.click();
          }
        }}
        aria-invalid={isInvalid}
      >
        <FileUpIcon className="mx-auto h-12 w-12" />
        <p className="mt-2 text-sm font-medium">
          {isMaxFilesReached
            ? `حداکثر ${maxFiles} فایل میتوانید آپلود کنید`
            : uploadText}
        </p>
        {!isMaxFilesReached && (
          <p className="mt-2 text-xs font-light">{uploadSubText}</p>
        )}
        <input
          id={`file-input-${id}`}
          type="file"
          className="hidden"
          multiple={true}
          accept={accept}
          onChange={handleFileInput}
          disabled={isMaxFilesReached}
          name={`file-input-${id}`}
        />
      </div>

      {files.length > 0 && (
        <div className={`grid grid-cols-2 gap-4`}>
          {files.map((file, index) => (
            <div
              key={file.id}
              className={cn(
                "relative group rounded-lg ring-1 ring-gray-200 ",
                file.error && "ring-red-500",
                file.type?.startsWith("video/")
                  ? "aspect-video"
                  : "aspect-square"
              )}
            >
              <div className="w-full h-full relative">
                {file.type?.startsWith("image/") ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="object-cover w-full h-full rounded-lg"
                    onError={(e) => {
                      console.error("❌ Image failed to load:", {
                        preview: file.preview,
                        name: file.name,
                        uploaded: file.uploaded,
                        id: file.id
                      });
                      // Show a placeholder when image fails to load
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg';
                        errorDiv.innerHTML = `
                          <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p class="text-xs text-gray-500 mt-2 px-2 text-center">${file.name}</p>
                          <p class="text-xs text-red-500 mt-1">Failed to load</p>
                        `;
                        parent.insertBefore(errorDiv, target);
                      }
                    }}
                    onLoad={() => {
                      console.log("✅ Image loaded successfully:", {
                        preview: file.preview,
                        name: file.name,
                        uploaded: file.uploaded
                      });
                    }}
                  />
                ) : file.type?.startsWith("video/") ? (
                  <video
                    src={file.preview}
                    className="object-cover w-full h-full rounded-lg"
                    muted
                    playsInline
                    preload="metadata"
                    poster={file.thumbnail || undefined}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                )}

                {file.error && (
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <p className="text-red-500 text-sm font-medium">
                      {file.error}
                    </p>
                  </div>
                )}

                {file.progress > 0 && file.progress < 100 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                    <div
                      className="h-full bg-primary transition-all duration-300 ease-in-out"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        previewFile(file);
                      }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="size-8 p-0 text-xs gap-1.5 rounded-3xl bg-BlueGray/40"
                      >
                        <Eye className="size-4 text-white" />
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="w-screen h-dvh max-w-none max-h-none p-0 bg-transparent border-none shadow-none"
                    showCloseButton
                  >
                    <DialogHeader className="sr-only">
                      <DialogTitle>نمایش فایل</DialogTitle>
                      <DialogDescription>
                        فایل انتخاب شده را در این قسمت مشاهده کنید
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative flex items-center justify-center">
                      {file.type?.startsWith("image/") ? (
                        <img
                          src={previewUrl || file.preview}
                          alt={file.name}
                          className="w-full max-w-3xl h-full select-none object-contain aspect-square"
                        />
                      ) : file.type?.startsWith("video/") ? (
                        <video
                          src={previewUrl || file.preview}
                          controls
                          controlsList="nofullscreen;"
                          disablePictureInPicture
                          disableRemotePlayback
                          muted
                          playsInline
                          preload="metadata"
                          className="w-screen md:w-full max-w-lg select-none object-contain aspect-video max-h-[85vh] h-fit outline-none"
                        />
                      ) : null}
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 bg-BlueGray rounded-3xl z-10"
                        >
                          <X className="h-4 w-4 text-gray-800" />
                        </Button>
                      </DialogTrigger>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-7 absolute -top-3 -right-3 rounded-4xl bg-white"
                  onClick={() => removeFile(index)}
                >
                  <Trash2Icon className="size-4 text-destructive" />
                </Button>

                {file.uploaded && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
